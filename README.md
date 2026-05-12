<<<<<<< HEAD
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cc0de9cf-2fed-450f-b0bc-dd90f01e4b89

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======
# Portfolio

Personal portfolio website for Yanshu Shingala with a custom frontend and an Express backend for the contact form.

## Project Structure

- `index.html` and `index (2).html` - portfolio frontend entry points
- `styles.css` - shared stylesheet for the site
- `script.js` - frontend interactions for the older variant
- `backend/server.js` - contact form API
- `backend/submissions/` - test-mode form submissions saved locally

## Run the Frontend

Open `index.html` or `index (2).html` in a browser, or serve the folder with a static server.

## Run the Backend

```powershell
cd backend
npm install
npm start
```

The server runs on `http://localhost:5000` in test mode and exposes:

- `GET /api/health`
- `POST /api/contact`

## Notes

- The frontend loads `styles.css`.
- The contact form is wired to the backend endpoint in test mode.
- Generated submission JSON files in `backend/submissions/` are local artifacts.
>>>>>>> 09b1ece468a07beeb4dd61833f7b24cc567402f2
