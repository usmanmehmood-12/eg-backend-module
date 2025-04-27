# Full Stack Test Task -- Back-end

## Description
This is the backend for a **User signup & signin app** built with **NestJS**. The backend provides RESTful APIs to signup users, login, and display welcome message from backend along with logout functionality.

## Backend Setup

To run the backend application, follow the steps below:

1. **Install Dependencies**:
   Install all necessary dependencies using npm:

```bash
  npm install
```

2. **Run Docker**:
   Initialize and run docker to run MongoDB:

```bash
  docker-compose up -d   
```

3. **Run the backend app**:

```bash
  npm run start:dev
```

## ***Features:***

* **App Backend**
1)  Create a backend signup and signin application with signup, signin and welcome message API endpoints. Developed using ***Node.js***, ***TypeScript*** , ***MongoDB database*** and ***Docker***.
2)  The MongoDB database is hosted inside a Docker container for an isolated, portable, and consistent environment.
3)  Ensure that the backend REST APIs communicates effectively with the chosen frontend technology (React.js).
4)  Structured architecture (_guards, modules, controllers, services, entity_)
5)  Security considerations (input validation)

* **User Authentication**
1) Secure backend user signup and login functionality with ***JWT***.
2) Add ***JWT*** authentication/authorization for access to REST API Endpoints (CRUD).

* **Nice to haves implemented:**
• Used TypeScript
• Implemented Nest.js logging on the back end
• Followed security best practices

* **Backend API Endpoints:**
1) Sign up user: http://localhost:3001/auth/signup
2) Log in User: http://localhost:3001/auth/login
6) GET User Welcome Message: http://localhost:3000/

## Technologies Used

- **NestJS**: A powerful framework for building server-side applications with Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js, used for interacting with MongoDB.
- **MongoDB**: NoSQL database to store user and task information.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **Passport.js (passport-local)**: Strategy for authenticating users with a username (or email) and password.
- **Passport.js (passport-jwt)**: Strategy for authenticating users with JWT (JSON Web Tokens).
- **Bcrypt.js**: To hash passwords securely.
- **Prettier**: For clean code & code formatting.
- **Docker**: Used to run postgres DB in a containerized environment.

  ### ***Env:***
```bash
# MongoDB URI
MONGO_URI= mongodb://localhost:27017/nest-auth

# JWT SECRET
JWT_SECRET=

```
