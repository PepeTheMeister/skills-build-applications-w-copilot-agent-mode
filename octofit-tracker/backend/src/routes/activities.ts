import { Router } from 'express'
import { Activity } from '../models.js'

const router = Router()

// Get all activities
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query
    const filter = userId ? { user: userId } : {}
    const activities = await Activity.find(filter)
      .populate('user', 'username email')
      .sort({ date: -1 })
    res.json(activities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

// Get activity by ID
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      'user',
      'username email'
    )
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.json(activity)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

// Create activity
router.post('/', async (req, res) => {
  try {
    const { user, type, duration, distance, calories, date } = req.body
    const activity = new Activity({
      user,
      type,
      duration,
      distance,
      calories,
      date: date || new Date(),
    })
    await activity.save()
    await activity.populate('user', 'username email')
    res.status(201).json(activity)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create activity' })
  }
})

// Update activity
router.put('/:id', async (req, res) => {
  try {
    const { type, duration, distance, calories, date } = req.body
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { type, duration, distance, calories, date },
      { new: true }
    ).populate('user', 'username email')
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.json(activity)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update activity' })
  }
})

// Delete activity
router.delete('/:id', async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }
    res.json({ message: 'Activity deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete activity' })
  }
})

export default router
