# GYAANI - AI Image Explorer

GYAANI is a full-stack MERN application that allows users to generate, share, and explore AI-generated images and text queries.  
Authentication is handled via Google OAuth, and all user data is securely stored in MongoDB.

---

## 🚀 Features

- **Google OAuth Authentication** (only logged-in users can use the app)
- **AI Image Generation** (via Stability API)
- **Text Query AI** (via Cohere API)
- **Community Showcase**: Browse, search, and share AI-generated images
- **Responsive UI** with React & Tailwind CSS
- **Dockerized** for easy deployment
- **Production-ready**: Deployable on Render, Railway, or any Docker-compatible host

---

## 🛠️ Tech Stack & Details

- **Frontend**:  
  - **React**: Modern UI library for building interactive interfaces.
  - **Vite**: Fast development server and build tool.
  - **Tailwind CSS**: Utility-first CSS framework for rapid, responsive design.

- **Backend**:  
  - **Node.js & Express.js**: RESTful API server.
  - **Passport.js**: Authentication middleware, using Google OAuth 2.0 for secure login.
  - **express-session**: Manages user sessions for authentication.

- **Database**:  
  - **MongoDB Atlas**: Cloud-hosted NoSQL database for storing users, posts, and session data.

- **AI APIs**:  
  - **Stability API**: Generates AI images from user prompts.
  - **Cohere API**: Generates AI-powered text responses to user queries.

- **Image Hosting**:  
  - **Cloudinary**: Stores and serves generated images efficiently.

- **Authentication**:  
  - **Google OAuth 2.0**: Secure login using Google accounts. User profile info is retrieved and stored in MongoDB.

- **Containerization & DevOps**:  
  - **Docker**: Packages backend and frontend for consistent deployment.
  - **Docker Compose**: Orchestrates multi-container setup for local/dev/prod.
  - **GitHub Actions**: Automates testing, building, and deployment (CI/CD).
  - **Render**: Cloud platform for deploying Dockerized services.

---

## 🔑 How Google OAuth 2.0 Works

1. User clicks "Login with Google" in the frontend.
2. Frontend redirects to `/auth/google` on the backend.
3. Passport.js handles the OAuth flow:
   - Redirects user to Google’s login page.
   - After login, Google redirects back to `/auth/google/callback` with a code.
   - Passport exchanges the code for user profile info.
4. User info is stored in MongoDB (if new) or retrieved (if returning).
5. Session is created using `express-session`, so the user stays logged in.
6. Frontend checks `/auth/current_user` to determine if the user is authenticated and displays the app accordingly.

---

## ⚙️ Local Setup

### 1. **Clone the Repository**
```sh
git clone https://github.com/yourusername/ai-image-explorer.git
cd ai-image-explorer

```

### 2. **Environment Variables**

#### **Backend (`server/.env`):**
```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_session_secret
PORT=5000
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STABILITY_API_KEY=your_stability_api_key
COHERE_API_KEY=your_cohere_api_key
```

#### **Frontend (`client/.env`):**
```
VITE_API_URL=http://localhost:5000
```

### 3. **Install Dependencies**

#### **Backend**
```sh
cd server
npm install
```

#### **Frontend**
```sh
cd ../client
npm install
```

### 4. **Run Locally**

#### **Backend**
```sh
cd server
npm run dev
```

#### **Frontend**
```sh
cd ../client
npm run dev
```

---

## 🐳 Docker Usage

### **Build and Run with Docker Compose**
```sh
docker-compose up --build
```
*(Make sure your `.env` files are set up as above)*

---

## 🚢 Deployment (Render Example)

1. **Push your code to GitHub.**
2. **Create two new Web Services on [Render](https://render.com):**
   - One for the backend (Docker, port 5000)
   - One for the frontend (Docker, port 80)
3. **Set environment variables in Render’s dashboard.**
4. **Update frontend API URLs to point to your deployed backend.**
---
## ⚙️ DevOps & CI/CD Pipeline
- Docker: Both backend and frontend have Dockerfiles for containerization.
- Docker Compose: Used for local development to spin up all services with one command.

- GitHub Actions: (Recommended) Set up to:
   - Run tests on every push.
   - Build Docker images.
   - Optionally push images to Docker Hub or deploy to Render.
- Render: Deploys both backend and frontend containers. Environment variables are set in the Render dashboard for security.

## Typical CI/CD Workflow:

- Developer pushes code to GitHub.
GitHub Actions build and test the code.
- On success, Docker images are built and (optionally) pushed to a registry.
- Render pulls the latest images and deploys the services.

## 🔐 Authentication

- Users must log in with Google to access any feature.
- User info is stored in MongoDB.
- Sessions are managed securely with express-session.

---

## 📦 Folder Structure

```
ai-image-explorer/
├── client/      # React frontend
├── server/      # Express backend
│   ├── routes/
│   ├── mongodb/
│   ├── passport.js
│   └── ...
├── README.md
└── ...
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 🙏 Acknowledgements

- [Stability AI](https://stability.ai/)
- [Cohere](https://cohere.com/)
- [Cloudinary](https://cloudinary.com/)
- [Render](https://render.com/)