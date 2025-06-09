# Interview-AI

A full-stack AI-powered technical interview preparation platform.  
Built with **Next.js (frontend)** and **Node.js/Express/MongoDB (backend)**, with AI question/answer generation via Google Gemini and image upload support via Cloudinary.

---

## Features

- **User Authentication** (register, login, JWT-protected routes)
- **Session Management** (create, view, delete interview sessions)
- **AI-Powered Interview Questions** (Google Gemini API)
- **Concept Explanations** (AI-generated)
- **Profile Picture Upload** (Cloudinary integration)
- **Responsive Dashboard UI** (Next.js, Tailwind CSS)
- **Redux Toolkit** for state management

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Atlas or local)
- Cloudinary account (for image uploads)
- Google Gemini API key

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interview-AI.git
cd interview-AI
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

- **Frontend:** Deploy on [Vercel](https://vercel.com/) or any Next.js-compatible platform.
- **Backend:** Deploy on [Render](https://render.com/), [Railway](https://railway.app/), [Heroku](https://heroku.com/), or any Node.js host.
- Set all environment variables in your deployment dashboard.

---

## Project Structure

```
/backend
  /controllers
  /models
  /routes
  /utils
  index.js
  .env

/frontend
  /src
    /components
    /lib
    /types
    /app
  .env
  next.config.ts
```

---

## API Endpoints (Backend)

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login user
- `GET /api/auth/profile` — Get user profile (protected)
- `POST /api/auth/upload-image` — Upload profile image (Cloudinary)
- `POST /api/ai/generate-questions` — Generate interview questions (protected)
- `POST /api/ai/generate-explanation` — Generate concept explanation (protected)
- `GET /api/sessions` — Get all sessions (protected)
- `POST /api/sessions` — Create session (protected)
- `DELETE /api/sessions/:id` — Delete session (protected)

---

## Environment Variables

**Backend:**

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`
- `CLOUD_NAME`
- `CLOUD_API`
- `CLOUD_API_SECRET`

**Frontend:**

- (Add any required public API URLs or keys)

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Google Gemini API](https://ai.google.dev/)

---

## License

MIT

---

## Credits

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Google Gemini](https://ai.google.dev/)
