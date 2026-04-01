# FPL API

> A Node.js + TypeScript REST API backend with PostgreSQL, fully containerized with Docker.

---

## Prerequisites

- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd fpl-api
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and adjust any values to match your local setup.

---

## Running the Application

### Development (with hot reload)

```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Production

```bash
docker-compose up --build
```

### Stop all containers

```bash
docker-compose down
```

---

## Logs

```bash
# Application logs
docker-compose logs -f app

# Database logs
docker-compose logs -f postgres
```

---

## API Access

| Environment | URL                      |
|-------------|--------------------------|
| Local       | http://localhost:3016     |

---

## Project Stack

| Layer    | Technology              |
|----------|-------------------------|
| Runtime  | Node.js                 |
| Language | TypeScript              |
| Database | PostgreSQL               |
| Infra    | Docker + Docker Compose  |