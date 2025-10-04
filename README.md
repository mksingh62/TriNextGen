# TriNextGen - Full Stack Application

This is a full-stack web application with a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── backend/              # Node.js/Express backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── ...
├── src/                  # React frontend
│   ├── components/       # React components
│   ├── pages/            # Page components
│   ├── lib/              # Utility functions
│   └── ...
├── public/               # Static assets
└── ...
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. From the root directory, install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following:
   ```
   VITE_API_BASE=http://localhost:5000
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Connection

The frontend connects to the backend through the API utility functions located in `src/lib/api.ts`. The base URL is configured through the `VITE_API_BASE` environment variable.

### Available API Endpoints

- **Contact**: `POST /api/contact` - Submit contact form
- **Services**: `GET /api/services` - Get all services
- **Careers**: `GET /api/careers` - Get all career listings
- **Admin**: 
  - `POST /api/admin/login` - Admin authentication
  - `GET /api/admin/contacts` - Get all contacts (authenticated)
  - `GET /api/admin/services` - Get all services (authenticated)

## Development

### Frontend Development

The frontend is built with React, TypeScript, and Tailwind CSS. Key features include:

- Responsive design
- Dark/light theme support
- Form validation with Zod
- API integration with error handling
- Toast notifications

### Backend Development

The backend is built with Node.js, Express, and MongoDB. Key features include:

- RESTful API design
- MongoDB integration with Mongoose
- JWT-based authentication
- CORS configuration
- Error handling

## Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Deploy the `backend` directory
3. Ensure MongoDB is accessible

### Frontend Deployment

1. Build the frontend:
   ```
   npm run build
   ```
2. Deploy the `dist` directory to your hosting platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License.