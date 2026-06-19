# OctoFit Tracker Backend

Node.js + Express + TypeScript backend API

## Install dependencies

```bash
npm install --prefix octofit-tracker/backend
```

## Run development server

```bash
npm run dev --prefix octofit-tracker/backend
```

## Seed database

```bash
npm run seed --prefix octofit-tracker/backend
```

This will:
- Connect to MongoDB (octofit_db)
- Clear existing collections
- Create 5 sample users
- Create 3 teams with members
- Create 7 sample activities
- Create 5 sample workouts
- Create 7 leaderboard entries

## Environment variables

Create a `.env` file in `octofit-tracker/backend/` with:

```
MONGODB_URI=mongodb://localhost:27017/octofit_db
CODESPACE_NAME=
```

## API Documentation

See `API.md` for endpoint documentation.

