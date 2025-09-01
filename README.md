# Superhero Management Application

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or higher)
- Docker
- Docker Compose
- npm (Node Package Manager)

## Project Setup

### 1. Clone the repository

bash git clone <repository-url> cd <project-directory>

### 2. Environment Setup

1. Create `.env` file in the root directory based on `.env.example`:
   PORT=6000 MONGO_URI=mongodb://user:user@db:27017/superhero-db
2. The `.env.db` file is already configured with MongoDB credentials: 
MONGO_INITDB_DATABASE=superhero-db
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=user

### 3. Install dependencies

`cd backend/`   ->   `npm i`
`cd frontend/`  ->   `npm i`

### 4. Running with Docker

1. Build and start the containers with command:
   `docker compose up --build`
   This will start:

- Backend API server (available at http://localhost:5555)
- MongoDB database (available at localhost:1234)
- Frontend application (available at http://localhost:80)

### 4. After Docker has started and while it is running, build the frontend application

`cd frontend/`
`npm run build`

## Application Structure

- `/backend` - Node.js/Express API server
- `/frontend` - React application
- `/client` - Built frontend files
- `/upload` - Directory for uploaded files
- `/mongo_db` - MongoDB data directory

## Features

- Create, read, update, and delete superheroes
- Image upload support
- Pagination
- Form validation
- Responsive design

## API Endpoints

- `GET /api/superheroes` - Get all superheroes (with pagination)
- `GET /api/superheroes/:id` - Get superhero by ID
- `POST /api/superheroes` - Create new superhero
- `PUT /api/superheroes/:id` - Update superhero
- `DELETE /api/superheroes/:id` - Delete superhero
- `POST /api/superheroes/:id/images` - Upload superhero images (max 5)
- `DELETE /api/superheroes/:id/images` - Delete superhero images

## Technologies Used

- Frontend:
    - React 19.1.1
    - TypeScript 4.9.5
    - React Router DOM 7.8.2
    - Axios 1.11.0
    - React Hook Form 7.62.0

- Backend:
    - Node.js
    - Express 5.1.0
    - MongoDB/Mongoose 8.18.0
    - Multer (for file uploads)
    - Joi (for validation)

- Development:
    - Docker
    - ESLint
    - Prettier
    - TypeScript