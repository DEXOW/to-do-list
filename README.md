# TO DO List - MERN

![To Do](https://github.com/DEXOW/gloflow/assets/51286591/ad38e44e-588d-4a9e-9742-23f2119453a6)

## Overview

This project implements a simple to-do application built with the MERN stack:

- MongoDB - NoSQL database for storing todo items
- Express.js - Node.js framework for building the backend API
- React.js - JavaScript library for building the user interface
- Node.js - JavaScript runtime environment for running the server

This application allows users to:

- Create new to-do items
- View existing to-do items
- Mark to-do items as completed/incomplete
- Delete to-do items
- Clear all completed to-do items

## Hosted Application
- You can access the hosted application via : https://to-do-list-dexow.vercel.app/

Note : As the backend is hosted on render it would take a few minutes to boot up. Kindly wait a few minutes if no response from backend.

## Installation

### Clone the repository:
```shell
git clone https://github.com/DEXOW/to-do-list.git
```

### Install dependencies:
- Installing backend dependencies 
```shell
cd to-do-list
npm install
```

- Install frontend dependencies
```shell
cd frontend
npm install
```

### Configure environment variables: 
- Configuring frontend env variables
```shell
cp .env.example .env
```

- Configuring backend env variables
```shell
cd ..
cp .env.example .env
```
- Configure the DB URI, name and JWT Secret in the .env
```shell
DB_URI='' # URI for the mongoDB
DB_NAME='' # Name of the database

JWT_SECRET='' # Secret for the JWT [Any random string] (Example: 'mysecret')
```

### Build the frontend
```shell
cd frontend
npm run build
```

### Start the server
```shell
cd ..
npm start
```

- Visit `http://localhost:3001` in your web browser to access the application.
