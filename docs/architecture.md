# System Architecture

## Overview

```mermaid
graph TB
    A[Frontend - React/Vite] -->|HTTP Requests| B[Backend - Node.js/Express]
    B -->|Database Operations| C[MongoDB]
    D[Admin Users] --> A
    E[Website Visitors] --> A
    B --> F[Email Service]
    
    subgraph Client Side
        A
    end
    
    subgraph Server Side
        B
        C
        F
    end
    
    subgraph Users
        D
        E
    end
```

## Component Details

### Frontend (Client Side)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks and Context API
- **Routing**: React Router
- **API Client**: Custom fetch wrapper

### Backend (Server Side)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Validation**: Built-in validation
- **CORS**: Configured for frontend domain

### Data Flow

1. **User Interaction**:
   - User interacts with React components
   - Components trigger API calls to backend

2. **API Communication**:
   - Frontend sends HTTP requests to backend endpoints
   - Backend processes requests and queries database
   - Backend returns JSON responses

3. **Data Processing**:
   - Backend validates input data
   - Backend performs database operations
   - Backend sends responses back to frontend

4. **UI Updates**:
   - Frontend receives responses
   - React components update state
   - UI re-renders with new data

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/services` - Get all services
- `GET /api/careers` - Get all career listings

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/contacts` - Get all contacts
- `GET /api/admin/services` - Get all services

## Security

- **CORS**: Restricts which domains can access the API
- **JWT**: Secures admin endpoints
- **Validation**: Input validation on both frontend and backend
- **Environment Variables**: Sensitive configuration stored separately

## Deployment Architecture

```mermaid
graph LR
    A[Users] --> B[Frontend Hosting]
    B --> C[Backend Server]
    C --> D[Database]
    C --> E[Third-party Services]
    
    subgraph Cloud Provider
        B
        C
        D
        E
    end
```