# Portfolio Contact Form - Backend Server

A Node.js/Express backend server for handling contact form submissions with Gmail email integration. Sends confirmation emails to both the portfolio owner and the contact form submitter.

## Features

- ✅ **Email Integration**: Uses Nodemailer with Gmail SMTP
- ✅ **Rate Limiting**: Prevents spam (max 5 requests per 15 minutes)
- ✅ **Validation**: Server-side validation for all form fields
- ✅ **HTML Emails**: Beautifully formatted HTML email templates
- ✅ **Confirmation Emails**: Automatic confirmation sent to the sender
- ✅ **Security**: Escapes HTML to prevent injection attacks
- ✅ **CORS Enabled**: Accepts requests from your frontend
- ✅ **Error Handling**: Comprehensive error messages

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gmail account with 2FA enabled
- Gmail App Password (not your regular Gmail password)

## Installation

### Step 1: Install Backend Dependencies

```bash
cd Portfolio/backend
npm install
```

### Step 2: Get Gmail App Password

1. Go to **Google Account** → **Security** → **App Passwords**
   - URL: https://myaccount.google.com/apppasswords

2. Select "Mail" and "Windows Computer" (or your device)

3. Google will generate a **16-character password** - copy it

### Step 3: Configure Environment Variables

1. **Copy `.env.example`** to `.env`
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env`** with your Gmail details:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   RECEIVER_EMAIL=your-email@gmail.com
   PORT=3000
   NODE_ENV=production
   ```

   Replace:
   - `your-email@gmail.com` with your actual Gmail address
   - `your-16-char-app-password` with the password from Step 2
   - Keep `NODE_ENV=production` for security

### Step 4: Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

You should see:
```
✓ Email service configured successfully
✓ Server running on port 3000
✓ Contact form endpoint: http://localhost:3000/api/contact
```

## API Documentation

### POST `/api/contact`

Send a contact form submission and receive confirmation emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'm interested in your work..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully! I'll get back to you soon."
}
```

**Error Response (400/500):**
```json
{
  "error": "Error description here"
}
```

**Rate Limit Response (429):**
```
Too many contact form submissions, please try again later
```

### GET `/api/health`

Check if the server is running.

**Response:**
```json
{
  "status": "Server is running"
}
```

## Frontend Integration

The frontend (`script.js`) automatically sends form submissions to:
```javascript
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/contact';
```

The form will:
1. Validate all fields
2. Send data to backend
3. Show success/error notifications
4. Reset on successful submission

## Email Templates

### Email to Admin (Portfolio Owner)
- Shows all form details
- Formatted with sender information
- Reply-To is set to the sender's email

### Email to Sender (Confirmation)
- Professional confirmation message
- Shows submission details
- Builds trust with the inquirer

## Security Features

1. **Rate Limiting**: Prevents spam and DoS attacks
2. **HTML Escaping**: Protects against injection attacks
3. **Environment Variables**: Sensitive data not in code
4. **CORS**: Only accepts requests from configured origins
5. **Input Validation**: All fields validated server-side
6. **Character Limits**: Message limited to 5000 characters

## Troubleshooting

### "Email service configuration error"
- Check your `.env` file
- Verify Gmail app password is correct
- Ensure you've enabled 2FA on your Gmail account
- Try a new app password

### "CORS error" in browser console
- Make sure backend is running on port 3000
- Check frontend is trying to reach `http://localhost:3000`
- In production, update CORS origins

### "Too many requests" error
- Rate limiter is active (5 requests per 15 minutes)
- Wait 15 minutes before trying again
- For development, adjust rate limit in `server.js`

### "Invalid email format" error
- Verify the email address format
- Use standard format: `user@domain.com`

## Deployment

### Deploy to Render/Heroku

1. Push code to GitHub
2. Connect repository to Render/Heroku
3. Set environment variables in dashboard:
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `RECEIVER_EMAIL`
   - `NODE_ENV=production`

4. Deploy and your email service is live!

### Environment-Specific Configuration

**Development:**
```env
NODE_ENV=development
```

**Production:**
```env
NODE_ENV=production
```

## File Structure

```
backend/
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
├── .env              # Configuration (GITIGNORED)
├── .env.example      # Template for .env
└── README.md         # This file
```

⚠️ **Important**: Add `.env` to `.gitignore` to avoid exposing sensitive data!

## Dependencies

- **express** - Web framework
- **cors** - Cross-origin request handling
- **nodemailer** - Email sending
- **dotenv** - Environment variable management
- **express-rate-limit** - Rate limiting middleware
- **nodemon** (dev) - Auto-reload during development

## Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Change `PORT` in `.env` or kill process using port |
| Emails not sending | Check app password, enable IMAP in Gmail settings |
| CORS errors | Ensure backend is accessible, check origin in CORS |
| Rate limit triggered | Wait 15 mins or check rate limit config |

## Next Steps

1. ✅ Backend is ready
2. Set up environment variables
3. Test with Postman or curl
4. Run the server locally
5. Test the frontend form
6. Deploy to production

## Support

For issues:
1. Check the Troubleshooting section
2. Verify all credentials are correct
3. Check Gmail security settings
4. Review server logs for errors

---

**Built with Express.js, Nodemailer, and Gmail**
