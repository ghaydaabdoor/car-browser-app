# Vehicle Browser

A full-stack web application that allows users to search for vehicle makes, types, and models using the NHTSA (National Highway Traffic Safety Administration) public API.

Built with **.NET 9 Web API** (backend) and **Angular 19** (frontend), fully dockerized and hosted on AWS.

---

## Live Demo

http://13.60.45.9

---

## Tech Stack

- **Backend:** .NET 9 Web API, C#
- **Frontend:** Angular 19, TypeScript, SCSS
- **Containerization:** Docker, Docker Compose
- **Cloud Hosting:** AWS EC2 (Ubuntu 24.04)
- **External API:** NHTSA Vehicle API

---

## Features

- Browse all vehicle makes (12,000+)
- View available vehicle types for any make
- Search models by make and manufacturing year
- Backend memory caching for improved performance
- Fully dockerized for easy local setup

---

## Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/ghaydaabdoor/car-browser-app.git
cd car-browser-app
```

**2. Start the application**
```bash
docker compose up --build
```

This will build and start both the backend and frontend containers.

**3. Open the app**

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080/api/vehicle |
| Swagger UI | http://localhost:8080/swagger |

**4. Stop the application**
```bash
docker compose down
```

---

## Project Structure
```
car-browser-app/
├── src/
│   ├── backend/
│   │   └── CarBrowser.API/       .NET 9 Web API
│   └── frontend/                 Angular 19 app
├── docker-compose.yml
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/vehicle/makes | Get all vehicle makes |
| GET | /api/vehicle/{makeId}/types | Get vehicle types for a make |
| GET | /api/vehicle/{makeId}/models/{year} | Get models for a make and year |