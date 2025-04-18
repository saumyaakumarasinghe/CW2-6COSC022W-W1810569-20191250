# 🌍 TravelTales - Full Stack Application Setup Guide

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18.x-green)](https://expressjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.x-blue)](https://nextjs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-lightgrey)](https://www.sqlite.org/)

A full stack travel blogging platform built for the 6COSC022W Coursework 2 assignment. The project includes a RESTful backend API using Node.js + Express, and a dynamic frontend built with Next.js. It supports blog post creation, user management, country data integration, and social features.

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start (Using Docker)](#quick-start-using-docker)
- [Manual Setup (Without Docker)](#manual-setup-without-docker)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Files](#environment-files)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Available Scripts](#available-scripts)
- [Common Issues & Solutions](#common-issues--solutions)
- [For Your Viva](#for-your-viva)
- [License](#license)

---

## 🧭 Overview

TravelTales allows users to write blog posts about their travel experiences, enriched with live country data (e.g., flag, currency, capital). The platform features secure user registration, login, and interaction systems like likes and follows. Unregistered users can still view public blogs.

---

## ✨ Features

- ✅ RESTful API with Express
- ✅ Frontend with Next.js (React)
- ✅ Prettier & Commitlint with Husky hooks
- ✅ User registration and authentication (JWT coming soon)
- ✅ SQLite database
- ✅ Color-coded dev logs using `concurrently`
- ⏳ Swagger API docs *(in progress)*
- ⏳ Docker support *(in progress)*

---

## 🔧 Prerequisites

- Node.js v20+
- npm v9+
- Git
- (Optional) Docker and Docker Compose

---

## 📁 Project Structure

```
├── client/          # Next.js frontend
└── server/          # Node.js backend API
```


---

## Quick Start (Using Docker)

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd 6COSC022W-w1810569-20191250
   ```

2. Start the application using Docker:

   ```bash
   docker:build
   docker:up
   ```

3. Access the application:
   - Backend API: http://localhost:8000
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:8000/api-docs (in development mode)

## API Documentation

- When running in development mode, access Swagger documentation at: http://localhost:8000/api-docs
- API endpoints are versioned (v1, v2)

## Database

- SQLite database is used
- Location: `server/database/database.db`
- Test database: `server/database/test_database.db`

## License

This project is proprietary software owned by Saumya Kumarasinghe. Unauthorized use, copying, modification, or distribution of this software is strictly prohibited.