/**
 * /init-populate-octofit_db
 *
 * Seed Script - Initialize and Populate octofit_db
 *
 * Command: npm run seed --prefix octofit-tracker/backend
 * 
 * This script:
 * 1. Connects to MongoDB (octofit_db)
 * 2. Clears all existing collections
 * 3. Seeds test data including:
 *    - 5 users (alex_runner, jordan_cyclist, casey_swimmer, morgan_climber, sam_athlete)
 *    - 3 teams (Marathon Masters, Cycling Club, Cross-Training Warriors)
 *    - 7 activities (running, cycling, swimming, climbing, strength training)
 *    - 5 workouts (5K run, intervals, hill climb, swimming endurance, strength training)
 *    - 7 leaderboard entries (monthly and annual rankings)
 * 4. Disconnects from MongoDB
 *
 * Usage: Run this script once to populate the database with test data.
 * Note: This will DELETE all existing data in the collections.
 */

import { connectDB, disconnectDB } from '../config/database.js'
import {
  User,
  Team,
  Activity,
  Workout,
  Leaderboard,
} from '../models.js'

async function seedDatabase() {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Workout.deleteMany({})
    await Leaderboard.deleteMany({})
    console.log('✓ Cleared existing collections')

    // Create users
    const users = await User.insertMany([
      {
        username: 'alex_runner',
        email: 'alex@octofit.com',
        password: 'hashedpassword123',
        profile: {
          firstName: 'Alex',
          lastName: 'Runner',
          profilePicture: 'https://api.github.com/users/octocat/avatar_url',
        },
      },
      {
        username: 'jordan_cyclist',
        email: 'jordan@octofit.com',
        password: 'hashedpassword456',
        profile: {
          firstName: 'Jordan',
          lastName: 'Cyclist',
          profilePicture: 'https://api.github.com/users/octocat/avatar_url',
        },
      },
      {
        username: 'casey_swimmer',
        email: 'casey@octofit.com',
        password: 'hashedpassword789',
        profile: {
          firstName: 'Casey',
          lastName: 'Swimmer',
          profilePicture: 'https://api.github.com/users/octocat/avatar_url',
        },
      },
      {
        username: 'morgan_climber',
        email: 'morgan@octofit.com',
        password: 'hashedpassword000',
        profile: {
          firstName: 'Morgan',
          lastName: 'Climber',
          profilePicture: 'https://api.github.com/users/octocat/avatar_url',
        },
      },
      {
        username: 'sam_athlete',
        email: 'sam@octofit.com',
        password: 'hashedpassword111',
        profile: {
          firstName: 'Sam',
          lastName: 'Athlete',
          profilePicture: 'https://api.github.com/users/octocat/avatar_url',
        },
      },
    ])
    console.log(`✓ Created ${users.length} users`)

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Marathon Masters',
        description: 'Long-distance running enthusiasts',
        leader: users[0]._id,
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Cycling Club',
        description: 'Road and mountain bike cyclists',
        leader: users[1]._id,
        members: [users[1]._id, users[2]._id, users[3]._id],
      },
      {
        name: 'Cross-Training Warriors',
        description: 'Multi-sport fitness group',
        leader: users[4]._id,
        members: [users[0]._id, users[2]._id, users[4]._id],
      },
    ])
    console.log(`✓ Created ${teams.length} teams`)

    // Create activities
    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'running',
        duration: 45,
        distance: 8.5,
        calories: 650,
        date: new Date('2026-06-19'),
      },
      {
        user: users[0]._id,
        type: 'running',
        duration: 60,
        distance: 12,
        calories: 900,
        date: new Date('2026-06-17'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 90,
        distance: 35,
        calories: 1200,
        date: new Date('2026-06-19'),
      },
      {
        user: users[1]._id,
        type: 'cycling',
        duration: 120,
        distance: 50,
        calories: 1800,
        date: new Date('2026-06-15'),
      },
      {
        user: users[2]._id,
        type: 'swimming',
        duration: 60,
        distance: 2.5,
        calories: 700,
        date: new Date('2026-06-19'),
      },
      {
        user: users[3]._id,
        type: 'climbing',
        duration: 120,
        distance: null,
        calories: 850,
        date: new Date('2026-06-18'),
      },
      {
        user: users[4]._id,
        type: 'strength_training',
        duration: 75,
        distance: null,
        calories: 600,
        date: new Date('2026-06-19'),
      },
    ])
    console.log(`✓ Created ${activities.length} activities`)

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        user: users[0]._id,
        title: 'Morning 5K',
        description: 'Easy paced morning run',
        exercises: ['warm-up jog', '5K run', 'cool-down walk'],
        difficulty: 'easy',
      },
      {
        user: users[0]._id,
        title: 'Speed Intervals',
        description: 'High-intensity interval training',
        exercises: ['warm-up', '800m sprints x5', 'recovery jog'],
        difficulty: 'hard',
      },
      {
        user: users[1]._id,
        title: 'Mountain Climb',
        description: 'Challenging hill route',
        exercises: ['warm-up', 'hill climbing', 'descent'],
        difficulty: 'hard',
      },
      {
        user: users[2]._id,
        title: 'Swimming Endurance',
        description: 'Long-distance freestyle',
        exercises: ['warm-up', 'freestyle laps', 'cool-down'],
        difficulty: 'medium',
      },
      {
        user: users[4]._id,
        title: 'Full Body Strength',
        description: 'Comprehensive strength training',
        exercises: [
          'squats',
          'bench press',
          'deadlifts',
          'pull-ups',
          'core work',
        ],
        difficulty: 'hard',
      },
    ])
    console.log(`✓ Created ${workouts.length} workouts`)

    // Create leaderboard entries
    const leaderboard = await Leaderboard.insertMany([
      {
        user: users[0]._id,
        score: 2550,
        rank: 1,
        period: 'monthly',
      },
      {
        user: users[1]._id,
        score: 3000,
        rank: 1,
        period: 'monthly',
      },
      {
        user: users[2]._id,
        score: 700,
        rank: 5,
        period: 'monthly',
      },
      {
        user: users[3]._id,
        score: 850,
        rank: 3,
        period: 'monthly',
      },
      {
        user: users[4]._id,
        score: 600,
        rank: 6,
        period: 'monthly',
      },
      {
        user: users[0]._id,
        score: 5200,
        rank: 2,
        period: 'annual',
      },
      {
        user: users[1]._id,
        score: 6300,
        rank: 1,
        period: 'annual',
      },
    ])
    console.log(`✓ Created ${leaderboard.length} leaderboard entries`)

    console.log('✓ Database seeding completed successfully!')
    await disconnectDB()
    process.exit(0)
  } catch (err) {
    console.error('✗ Seeding error:', err)
    process.exit(1)
  }
}

seedDatabase()
