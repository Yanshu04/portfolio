# Portfolio Website - Email Integration Setup Guide

## Overview

Your portfolio website now has a fully functional contact form with automatic email sending. When someone fills out the contact form on your portfolio, they'll receive a confirmation email and you'll get notified instantly.

## Quick Start (3 Steps)

### 1️⃣ Backend Setup

```bash
cd Portfolio/backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your Gmail details (see instructions below)
# Then start the server
npm run dev
```

### 2️⃣ Gmail Setup

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and **Windows PC**
3. Copy the 16-character password Google generates
4. Paste it in `backend/.env` as `EMAIL_PASSWORD`
5. Also update `EMAIL_USER` and `RECEIVER_EMAIL` with your Gmail address

### 3️⃣ Test It Out

1. Open `Portfolio/index.html` in your browser
2. Go to the "Get In Touch" section
3. Fill out the form and click "Send Message"
4. Check your email - you should receive:
   - ✅ Confirmation email (to your email in the form)
   - ✅ Notification email (to your Gmail account)

## File Structure

```
Portfolio/
├── index.html              # Main portfolio page
├── script.js              # Frontend form handling
├── styles.css             # Styling
├── backend/               # Backend server
│   ├── server.js          # Express API
│   ├── package.json       # Dependencies
│   ├── .env              # Your secrets (CONFIGURE THIS!)
│   ├── .env.example      # Template
│   ├── .gitignore        # Don't commit .env
│   └── README.md         # Full documentation
└── ...other files
```

## Environment Variables

Create `backend/.env` with these values:

```env
# Your Gmail address
EMAIL_USER=your-email@gmail.com

# 16-character app password from Google
EMAIL_PASSWORD=abcd efgh ijkl mnop

# Where to send contact form notifications
RECEIVER_EMAIL=your-email@gmail.com

# Server port
PORT=3000

# Environment
NODE_ENV=production
```

⚠️ **IMPORTANT**: Add `.env` to `.gitignore` (already done). NEVER commit sensitive data!

## How It Works

### Frontend Flow
1. User fills out the contact form
2. Validates all fields (name, email, subject, message)
3. Sends data to backend API
4. Shows success/error notification

### Backend Flow
1. Receives form submission via API
2. Validates all data (length, format, content)
3. Checks rate limit (max 5 per 15 minutes)
4. Sends 2 emails:
   - **To Contact**: Confirmation email
   - **To You**: Full form details with HTML formatting
5. Returns success message

## API Endpoints

### POST /api/contact
Sends a contact form submission.

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Hello, I am interested..."
  }'
```

### GET /api/health
Check if server is running.

```bash
curl http://localhost:3000/api/health
```

## Features

✅ **Automatic Emails**
- Confirmation to submitter
- Notification to you
- HTML formatted
- Professional design

✅ **Security**
- Server-side validation
- Rate limiting (spam protection)
- SQL injection prevention
- HTML escape protection

✅ **User Experience**
- Real-time feedback
- Error notifications
- Loading state
- Form reset after success

✅ **Reliability**
- Email retry logic
- Error handling
- Connection pooling
- Production-ready

## Troubleshooting

### Issue: "Email service configuration error"
**Solution**: 
- Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env`
- Make sure you generated an App Password (not your regular Gmail password)
- Enable 2FA on your Gmail account if not already done
- Generate a new App Password and try again

### Issue: CORS error in browser console
**Solution**: 
- Make sure backend is running: `npm run dev` in `backend/` folder
- Verify it's running on `http://localhost:3000`
- Check the error message - it should show the endpoint URL

### Issue: "Too many contact form submissions" error
**Solution**: 
- Rate limiter allows 5 requests per 15 minutes
- Wait 15 minutes before trying again
- This is for spam protection

### Issue: Form submits but no email received
**Solution**: 
1. Check the browser console for errors
2. Verify backend is running with email configured
3. Check your spam folder
4. Review backend logs for error messages

## Development vs Production

**For Development:**
```env
NODE_ENV=development
```

**For Production:**
- Deploy backend to Render, Heroku, or similar
- Update `REACT_APP_API_URL` environment variable
- Make sure CORS origins are set correctly

## Deployment Options

### Option 1: Render (Recommended)
1. Push code to GitHub
2. Create new Web Service on Render
3. Use `npm start` as start command
4. Add environment variables in dashboard

### Option 2: Heroku
1. `heroku create your-app-name`
2. `heroku config:set EMAIL_USER=...`
3. `git push heroku main`

### Option 3: Your Own Server
1. Use PM2 to keep server running
2. Set up reverse proxy (Nginx)
3. Configure environment variables

## Security Checklist

- ✅ `.env` is in `.gitignore`
- ✅ Using Gmail App Password (not regular password)
- ✅ 2FA enabled on Gmail account
- ✅ Rate limiting enabled
- ✅ Input validation on frontend and backend
- ✅ HTML escaping enabled
- ✅ CORS properly configured

## Next Steps

1. **Complete the setup** following the Quick Start section
2. **Test locally** with your own email
3. **Deploy backend** to production (Render, Heroku, etc.)
4. **Update frontend API URL** if deploying to production
5. **Test in production** before sharing portfolio

## Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Express.js Guide](https://expressjs.com/)
- [Rate Limiting Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

## Support

For issues:
1. Check the Troubleshooting section above
2. Review backend logs: `npm run dev` shows detailed output
3. Test API directly with curl or Postman
4. Check Gmail security settings

---

**Your portfolio is now fully functional with email integration! 🚀**

Questions? Check the backend/README.md for detailed documentation.
