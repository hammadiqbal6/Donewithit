# DoneWithIt

A React Native (Expo) marketplace for buying and selling second-hand items, backed by a Node/Express API. Built as a portfolio-ready version of the classic DoneWithIt course project.

![DoneWithIt](./app/assets/icon.png)

## Features

- **Auth** — register, login, JWT session restore (SecureStore on native, AsyncStorage on web)
- **Listings feed** — browse items with pull-to-refresh, loading / empty / error states
- **Listing details** — photos, price, seller info, and contact-seller messaging
- **Post a listing** — title, price, category, description, images, optional location
- **Account** — my listings, inbox messages, logout
- **Offline notice** — banner when the device loses connectivity

## Tech stack

| Layer               | Stack                                                               |
| ------------------- | ------------------------------------------------------------------- |
| Mobile / web client | React Native, Expo SDK 48, React Navigation, Formik + Yup, Apisauce |
| API                 | Node.js, Express, Joi, JWT, Multer, Sharp                           |
| Data                | In-memory stores (demo seed users & listings)                       |

## Screenshots

_Add screenshots from the Expo web walkthrough here after local run._

## Getting started

### Prerequisites

- Node.js 18+
- npm

### 1. Backend API

```bash
cd backend
cp .env.example .env
npm install
npm start
```

API listens on [http://localhost:9000](http://localhost:9000).

Health check: `GET /health`  
Listings: `GET /api/listings`

### 2. Expo app

From the repo root:

```bash
npm install
npm run web          # Expo web (recommended for quick demo)
# or: npm start      # Expo Dev Tools / device
```

The client reads `extra.apiUrl` from `app.json` (default `http://localhost:9000/api`).

### Demo login

| Email             | Password |
| ----------------- | -------- |
| `mosh@domain.com` | `12345`  |
| `john@domain.com` | `12345`  |

## Environment variables

### Backend (`backend/.env`)

| Variable          | Description                        | Default                         |
| ----------------- | ---------------------------------- | ------------------------------- |
| `PORT`            | API port                           | `9000`                          |
| `JWT_PRIVATE_KEY` | Secret used to sign auth tokens    | see `.env.example`              |
| `ASSETS_BASE_URL` | Public base URL for listing images | `http://localhost:9000/assets/` |

Root `.env.example` and `backend/.env.example` document the same knobs. Never commit real secrets.

## Project structure

```
.
├── App.js                 # Auth gate + navigation root
├── app/                   # Expo client (screens, API, components)
├── backend/               # Express API extracted from the course zip
│   ├── routes/            # auth, users, listings, messages, …
│   ├── store/             # In-memory seed data
│   └── public/assets/     # Listing images
└── .github/workflows/ci.yml
```

## Scripts

| Command                     | Description      |
| --------------------------- | ---------------- |
| `npm start` / `npm run web` | Start Expo       |
| `npm run lint`              | ESLint           |
| `npm run format`            | Prettier write   |
| `cd backend && npm start`   | Start API        |
| `cd backend && npm run dev` | API with nodemon |

## CI

GitHub Actions runs frontend lint/format checks and a backend smoke test (`/health` + `/api/listings`) on every push and pull request to `main`.

## License

Educational / portfolio use. Original course material by Mosh Hamedani.
