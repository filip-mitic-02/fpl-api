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

### Install dependencies

```bash
npm i
```

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

## Database Migrations

```bash
# Create a new migration
npm run migration:create -- src/migrations/CreateTableName

# Run all pending migrations
npm run migration:run

# Revert the last migration
npm run migration:revert

# View migration status
npm run migration:show

# Reset database (WARNING: deletes all data)
npm run db:reset
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

| Environment | URL                   |
| ----------- | --------------------- |
| Local       | http://localhost:3016 |

---

## Project Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Runtime  | Node.js                 |
| Language | TypeScript              |
| Database | PostgreSQL              |
| Infra    | Docker + Docker Compose |
