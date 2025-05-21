# 🌍 Passport Pages - Full Stack Travel Blogging Platform

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.x-green)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-blue)](https://nextjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-lightgrey)](https://www.sqlite.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)](https://tailwindcss.com/)

A modern, full-stack travel blogging platform built for the 6COSC022W Coursework 2 assignment. Share your travel experiences, discover new destinations, and connect with fellow travelers through an intuitive and feature-rich interface.

## ✨ Key Features

### 🚀 Core Functionality

- **Blog Management**: Create, edit, and delete travel blog posts
- **User Authentication**: Secure registration and login system
- **Social Features**: Like posts, follow users, and comment on blogs
- **Country Integration**: Automatic country data enrichment for posts
- **Search & Filter**: Find posts by title, content, or country
- **Responsive Design**: Beautiful UI that works on all devices

### 🛠 Technical Features

- **Modern Stack**: Next.js 14, Express, TypeScript, and SQLite
- **Real-time Updates**: React Query for efficient data fetching
- **Type Safety**: Full TypeScript implementation
- **Styling**: TailwindCSS for modern, responsive design
- **Code Quality**: ESLint, Prettier, and Husky for code consistency
- **API Versioning**: Structured API with version control

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup Guide](#setup-guide)
  - [Quick Start (Docker)](#quick-start-using-docker)
  - [Manual Setup](#manual-setup)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Common Issues](#common-issues)
- [Contributing](#contributing)
- [License](#license)

## 🔧 Prerequisites

- Node.js v20 or higher
- npm v9 or higher
- Git
- (Optional) Docker and Docker Compose
- (Optional) VS Code with recommended extensions

## 📁 Project Structure

```
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # Reusable components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
│
└── server/                # Express backend
    ├── controllers/       # Route controllers
    ├── models/           # Database models
    ├── routes/           # API routes
    ├── services/         # Business logic
    └── utils/            # Helper functions
```

## 🚀 Setup Guide

### Quick Start (Using Docker)

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd 6COSC022W-w1810569-20191250
   ```

2. Start the application:

   ```bash
   docker:build
   docker:up
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api-docs

### Manual Setup

#### Backend Setup

1. Navigate to server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. Navigate to client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## ⚙️ Environment Configuration

### Backend (.env)

```env
PORT=8000
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📚 API Documentation

The API is versioned and documented using Swagger. Access the documentation at:

- Development: http://localhost:8000/api-docs
- Production: https://api.traveltales.com/api-docs

### API Versions

- v1: Current stable version
- v2: Upcoming features (in development)

## 💾 Database

The application uses SQLite for data storage:

- **Main Database**: `server/database/database.db`
- **Test Database**: `server/database/test_database.db`

### Key Tables

- Users
- BlogPosts
- Comments
- Likes
- Follows

## 🛠 Development

### Available Scripts

#### Backend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
npm run lint         # Run linter
```

#### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
```

### Code Style

- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## 🧪 Testing

```bash
# Run backend tests
cd server
npm run test

# Run frontend tests
cd client
npm run test
```

## 🚀 Deployment

### Backend Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run start
   ```

### Frontend Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm run start
   ```

## 🔍 Common Issues & Solutions

### Backend Issues

1. **Port Already in Use**

   - Solution: Change port in .env file
   - Command: `lsof -i :8000`

2. **Database Connection Error**
   - Solution: Check database path and permissions
   - Command: `chmod 644 database/database.db`

### Frontend Issues

1. **Build Errors**

   - Solution: Clear Next.js cache
   - Command: `rm -rf .next`

2. **API Connection Issues**
   - Solution: Check CORS configuration
   - Check environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary software owned by Saumya Kumarasinghe. Unauthorized use, copying, modification, or distribution of this software is strictly prohibited.

---

Made with ❤️ by Saumya Kumarasinghe
