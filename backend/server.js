const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiter for contact form (max 5 requests per 15 minutes)
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many contact form submissions, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

// Check if we should use test mode or real email
const USE_TEST_MODE = !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.RECEIVER_EMAIL || process.env.TEST_MODE === 'true';

if (USE_TEST_MODE) {
    console.log('✓ Running in TEST MODE (no email credentials needed)');
} else {
    // Real email mode - configure Nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('Email service configuration error:', error);
        } else {
            console.log('✓ Email service configured successfully');
        }
    });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Contact form endpoint
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Message length validation
        if (message.length > 5000) {
            return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
        }

        // TEST MODE: Save to file instead of sending email
        if (USE_TEST_MODE) {
            const submissionsDir = path.join(__dirname, 'submissions');
            if (!fs.existsSync(submissionsDir)) {
                fs.mkdirSync(submissionsDir);
            }

            const timestamp = new Date().toISOString();
            const filename = `submission_${Date.now()}.json`;
            const filepath = path.join(submissionsDir, filename);

            const submission = {
                timestamp,
                name,
                email,
                subject,
                message,
                ip: req.ip,
            };

            fs.writeFileSync(filepath, JSON.stringify(submission, null, 2));

            console.log(`✓ Contact form submission saved: ${filename}`);
            console.log(`  From: ${name} <${email}>`);
            console.log(`  Subject: ${subject}`);

            return res.json({
                success: true,
                message: '[TEST MODE] Message received! In production, emails would be sent here.',
                testMode: true,
            });
        }

        // REAL MODE: Send actual emails via Gmail
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Email content to receiver
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                    <h2 style="color: #2c3e50;">New Message from Portfolio Contact Form</h2>
                    <hr style="border: none; border-top: 1px solid #ecf0f1;">
                    
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                    
                    <h3 style="color: #2c3e50; margin-top: 20px;">Message:</h3>
                    <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; white-space: pre-wrap;">
                        ${escapeHtml(message)}
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #ecf0f1; margin-top: 30px;">
                    <p style="font-size: 12px; color: #7f8c8d;">
                        <em>This email was sent from your portfolio contact form.</em>
                    </p>
                </div>
            `,
            replyTo: email,
        };

        // Confirmation email to sender
        const confirmationMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Message Received - Yanshu Shingala',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
                    <h2 style="color: #2c3e50;">Thank You for Reaching Out!</h2>
                    <p>Dear ${escapeHtml(name)},</p>
                    
                    <p>I have received your message and appreciate you taking the time to contact me. I will review your message and get back to you as soon as possible.</p>
                    
                    <h3 style="color: #2c3e50; margin-top: 20px;">Your Message Details:</h3>
                    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
                    <p><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
                    
                    <hr style="border: none; border-top: 1px solid #ecf0f1; margin-top: 30px;">
                    <p style="color: #7f8c8d;">
                        Best regards,<br>
                        <strong>Yanshu Shingala</strong><br>
                        Data Science & AI Enthusiast
                    </p>
                </div>
            `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMailOptions),
        ]);

        res.json({
            success: true,
            message: 'Your message has been sent successfully! I\'ll get back to you soon.',
        });
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).json({
            error: 'Failed to send message. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong on the server',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Helper function to escape HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Contact form endpoint: http://localhost:${PORT}/api/contact`);
});
