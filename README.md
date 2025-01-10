# Clean Architecture Nestjs Formula1

## Description

A Formula 1 API following Clean Architecture principles, built with Nestjs and Prisma.  
The Result pattern is implemented in usecases to handle errors explicitly rather than relying on implicit throws.

## Project setup

```bash
docker build -t f1db .
docker run -d --name f1database -p 5432:5432 f1db
npm ci
```

## Compile and run the project

```bash
npm start

```

## Run tests

```bash
npm test
```

## Project Structure

```
src/
├── core/                 # Business rules
│ ├── driver/             # Driver domain
│ │ ├── entity/
│ │ ├── repository/
│ │ └── usecase/
│ ├── circuit/            # Circuit domain
│ │ ├── entity/
│ │ ├── repository/
│ │ └── usecase/
│ └── etc.../             # Other domains following same pattern
├── infra/                # Frameworks
│ ├── app/                # Application (Nestjs)
│ ├── datasources/        # Datasources (inmemory, prisma, etc.)
│ └── repository/         # Repository implementations
```
