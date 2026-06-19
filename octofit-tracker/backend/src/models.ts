import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      firstName: String,
      lastName: String,
      profilePicture: String,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const User = mongoose.model('User', UserSchema)

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Team = mongoose.model('Team', TeamSchema)

const ActivitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: Number,
    distance: Number,
    calories: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Activity = mongoose.model('Activity', ActivitySchema)

const WorkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    exercises: [String],
    difficulty: String,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Workout = mongoose.model('Workout', WorkoutSchema)

const LeaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    rank: Number,
    period: { type: String, default: 'monthly' },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export const Leaderboard = mongoose.model('Leaderboard', LeaderboardSchema)
