
# Bookstore BE REST API

Simple REST API build with TypeScript, Express.JS, and Prisma ORM


## Tech Stack

**Server:** Node, Express, TypeScript, Prisma ORM


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` => self explanatory

`DATABASE_URL` => SQL based database url

`DIRECT_URL` => Direct database url for running migration

`SALT_ROUND` => default 10

`JWT_SECRET` => Your secret for signing jwt


## Installation

Install my-project with npm

```bash
  npm install 
  npx prisma migrate dev // For running migration and setup db table and schema
  npm run seed // For running seeder to insert initial data to your db
  npm run dev // Run in dev mode
```
    
## API Documentation

[Postman REST API Docs](https://documenter.getpostman.com/view/10944704/2sA35JzzyA)
