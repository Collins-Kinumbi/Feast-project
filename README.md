# Feast API

Feast API is the backend server for the Feast recipe‑sharing application. It provides RESTful endpoints for user authentication, recipe management, image uploads, and more, using Node.js, Express, and MongoDB.

---

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)

   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
   - [Available Scripts](#available-scripts)

4. [Usage](#usage)
5. [Deployment](#deployment)
6. [Folder Structure](#folder-structure)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## Features

- User registration and login (JWT authentication)
- CRUD operations for recipes
- Image uploads via Cloudinary
- Input sanitization and rate limiting for security
- Email notifications for password resets

---

## Technologies

- **Node.js** v20.x
- **Express** v4
- **MongoDB** / Mongoose
- **Cloudinary** for media storage
- **JWT** for authentication
- **Helmet**, **hpp**, **express-mongo-sanitize** for security
- **Nodemailer** for email services
- **dotenv** for environment configuration

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20.x
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- Cloudinary account (for image uploads)
- Mailtrap (or SMTP) credentials for development emails

### Installation

1. **Clone the repo**

```bash
git https://github.com/Collins-Kinumbi/Feast-project
cd Feast-project
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment**

- Copy `.env.development` to a new file at project root named `.env.development`.
- Populate each variable (see next section).

---

### Environment Variables

| Variable                | Description                                  | Required |
| ----------------------- | -------------------------------------------- | -------- |
| `PORT`                  | Port on which the server runs (e.g., 8000)   | Yes      |
| `NODE_ENV`              | Environment (development, production)        | Yes      |
| `CONNECTION_STRING`     | MongoDB connection URI                       | Yes      |
| `SECRET_STRING`         | JWT signing secret                           | Yes      |
| `LOGIN_EXPIRES`         | JWT expiration time in ms (e.g., 2592000000) | Yes      |
| `EMAIL_HOST`            | SMTP host (Mailtrap or SMTP service)         | Yes      |
| `EMAIL_PORT`            | SMTP port                                    | Yes      |
| `EMAIL_USERNAME`        | SMTP username                                | Yes      |
| `EMAIL_PASSWORD`        | SMTP password                                | Yes      |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name                        | Yes      |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                           | Yes      |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret                        | Yes      |

---

### Available Scripts

In the project directory, you can run:

| Command        | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `npm run dev`  | Start server in development mode with auto‑reload (nodemon) |
| `npm run prod` | Start server in production mode                             |
| `npm start`    | Run the default `start` script (`node server.js`)           |

---

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your API client (Postman, curl) and interact with endpoints:

   - `POST /api/auth/register`
   - `POST /api/auth/login`
   - `GET /api/recipes`
   - `POST /api/recipes`
   - ...

Refer to the [API documentation](./Server/docs/README.md) for full endpoint details.

---

## Deployment

1. Build and deploy front‑end and back‑end separately (e.g., Netlify for front‑end, Render/Heroku for back‑end).
2. Ensure your production environment variables are set (e.g., on Render’s dashboard).
3. Use `npm run prod` or Docker for containerized deployment.

---

## Folder Structure

```
feast-api/
├─ .env.development          # Development env variables
├─ server.js                 # Entry point
├─ package.json
├─ routes/                   # Express route handlers
├─ controllers/              # Request logic
├─ models/                   # Mongoose schemas
├─ middleware/               # Auth, error handling, security
├─ utils/                    # Helpers (email, Cloudinary)
├─ docs/                     # API docs
└─ tests/                    # (Optional) Test suites
```

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

Please follow the existing code style and include tests where applicable.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

**Author**: Collins Kinumbi

- GitHub: [Collins-Kinumbi](https://github.com/Collins-Kinumbi)
- Email: [kinumbicollins@gmail.com](mailto:kinumbicollins254@gmail.com)
