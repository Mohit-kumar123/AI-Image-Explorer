# GYAANI - AI Image Explorer Architecture Diagram

This diagram shows the complete architecture of the GYAANI application, including all components, services, and their relationships.

```mermaid
architecture-beta
    group client_tier(cloud)[Client Tier]
    group application_tier(cloud)[Application Tier]
    group data_tier(database)[Data Tier]
    group external_services(internet)[External Services]
    group infrastructure(server)[Infrastructure]

    service user_browser(internet)[User Browser] in client_tier
    service react_app(server)[React App] in client_tier

    service express_server(server)[Express Server] in application_tier
    service passport_auth(server)[Passport Auth] in application_tier
    service session_mgmt(server)[Session Management] in application_tier

    service mongodb(database)[MongoDB Atlas] in data_tier
    service user_model(database)[User Model] in data_tier
    service post_model(database)[Post Model] in data_tier

    service google_oauth(internet)[Google OAuth] in external_services
    service stability_api(internet)[Stability AI] in external_services
    service cohere_api(internet)[Cohere API] in external_services
    service cloudinary(cloud)[Cloudinary CDN] in external_services

    service docker_backend(server)[Backend Container] in infrastructure
    service docker_frontend(server)[Frontend Container] in infrastructure
    service docker_compose(server)[Docker Compose] in infrastructure

    user_browser:R --> L:react_app
    react_app:B --> T:express_server
    express_server:L --> R:passport_auth
    express_server:R --> L:session_mgmt
    passport_auth:B --> T:google_oauth
    express_server:B --> T:mongodb
    mongodb:L --> R:user_model
    mongodb:R --> L:post_model
    express_server:R --> L:stability_api
    express_server:R --> L:cohere_api
    express_server:R --> L:cloudinary
    
    react_app{group}:B --> T:docker_frontend{group}
    express_server{group}:B --> T:docker_backend{group}
    docker_frontend:B --> T:docker_compose
    docker_backend:B --> T:docker_compose
```

## Architecture Components

### Client Tier
- **User Browser**: Web browser where users interact with the application
- **React App (Vite)**: Frontend React application built with Vite, styled with Tailwind CSS

### Application Tier
- **Express.js Server**: Main backend server handling API requests and business logic
- **Passport.js Auth**: Authentication middleware managing Google OAuth flow
- **Session Management**: Express-session handling user sessions and authentication state

### Data Tier
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **User Model**: Stores user profile information from Google OAuth
- **Post Model**: Stores AI-generated images and metadata

### External Services
- **Google OAuth 2.0**: Authentication provider for secure user login
- **Stability AI API**: AI service for generating images from text prompts
- **Cohere API**: AI service for generating text responses to queries
- **Cloudinary CDN**: Image hosting and delivery service

### Infrastructure
- **Backend Container**: Dockerized Express.js server
- **Frontend Container**: Dockerized React application  
- **Docker Compose**: Orchestrates multi-container deployment

## Data Flow

1. **Authentication Flow**:
   - User accesses React app in browser
   - Login redirects to Express server
   - Passport.js handles Google OAuth flow
   - User data stored in MongoDB
   - Session created for authenticated user

2. **Image Generation Flow**:
   - Authenticated user submits prompt via React app
   - Express server calls Stability AI API
   - Generated image uploaded to Cloudinary
   - Image metadata saved to MongoDB
   - Image displayed in React app

3. **Text Query Flow**:
   - User submits text query via React app
   - Express server calls Cohere API
   - AI response returned to React app

4. **Community Showcase Flow**:
   - React app fetches posts from Express server
   - Server retrieves post data from MongoDB
   - Images served from Cloudinary CDN
