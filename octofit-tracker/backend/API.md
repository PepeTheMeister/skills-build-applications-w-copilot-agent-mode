# OctoFit Tracker API Documentation

Base URL: `http://localhost:8000` (or Codespaces URL)

## Endpoints

### Health Check
- **GET** `/api/health` - Check API health status

### Users (`/api/users`)
- **GET** `/` - Get all users
- **GET** `/:id` - Get user by ID
- **POST** `/` - Create new user
  - Body: `{ username, email, password, profile: { firstName, lastName, profilePicture } }`
- **PUT** `/:id` - Update user profile
  - Body: `{ profile: { firstName, lastName, profilePicture } }`
- **DELETE** `/:id` - Delete user

### Teams (`/api/teams`)
- **GET** `/` - Get all teams
- **GET** `/:id` - Get team by ID
- **POST** `/` - Create new team
  - Body: `{ name, description, leader: userId }`
- **POST** `/:id/members` - Add member to team
  - Body: `{ userId }`
- **DELETE** `/:id/members/:userId` - Remove member from team
- **PUT** `/:id` - Update team
  - Body: `{ name, description }`
- **DELETE** `/:id` - Delete team

### Activities (`/api/activities`)
- **GET** `/` - Get all activities (optional query: `?userId=id`)
- **GET** `/:id` - Get activity by ID
- **POST** `/` - Create new activity
  - Body: `{ user: userId, type, duration, distance, calories, date }`
- **PUT** `/:id` - Update activity
  - Body: `{ type, duration, distance, calories, date }`
- **DELETE** `/:id` - Delete activity

### Workouts (`/api/workouts`)
- **GET** `/` - Get all workouts (optional query: `?userId=id`)
- **GET** `/:id` - Get workout by ID
- **POST** `/` - Create new workout
  - Body: `{ user: userId, title, description, exercises: [], difficulty }`
- **PUT** `/:id` - Update workout
  - Body: `{ title, description, exercises: [], difficulty }`
- **DELETE** `/:id` - Delete workout

### Leaderboard (`/api/leaderboard`)
- **GET** `/` - Get leaderboard (optional query: `?period=monthly`)
- **GET** `/user/:userId` - Get user's leaderboard entry
- **POST** `/` - Create/update leaderboard entry
  - Body: `{ user: userId, score, rank, period }`
- **PUT** `/:id` - Update leaderboard entry
  - Body: `{ score, rank }`
- **DELETE** `/:id` - Delete leaderboard entry
