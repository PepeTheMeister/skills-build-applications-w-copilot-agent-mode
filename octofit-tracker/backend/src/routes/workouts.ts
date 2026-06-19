import { Router } from 'express'
import { Workout } from '../models.js'

const router = Router()

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    const filter = userId ? { user: userId } : {}
    const workouts = await Workout.find(filter)
      .populate('user', 'username email')
      .sort({ createdAt: -1 })
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

// Get workout by ID
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'user',
      'username email'
    )
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workout' })
  }
})

// Create workout
router.post('/', async (req, res) => {
  try {
    const { user, title, description, exercises, difficulty } = req.body
    const workout = new Workout({
      user,
      title,
      description,
      exercises,
      difficulty,
    })
    await workout.save()
    await workout.populate('user', 'username email')
    res.status(201).json(workout)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create workout' })
  }
})

// Update workout
router.put('/:id', async (req, res) => {
  try {
    const { title, description, exercises, difficulty } = req.body
    const workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, description, exercises, difficulty },
      { new: true }
    ).populate('user', 'username email')
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.json(workout)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update workout' })
  }
})

// Delete workout
router.delete('/:id', async (req, res) => {
  try {
    const workout = await Workout.findByIdAndDelete(req.params.id)
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' })
    }
    res.json({ message: 'Workout deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete workout' })
  }
})

export default router
