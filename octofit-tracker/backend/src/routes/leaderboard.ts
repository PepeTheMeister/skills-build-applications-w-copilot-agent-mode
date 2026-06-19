import { Router } from 'express'
import { Leaderboard } from '../models.js'

const router = Router()

// Get leaderboard
router.get('/', async (req, res) => {
  try {
    const { period = 'monthly' } = req.query
    const leaderboard = await Leaderboard.find({ period })
      .populate('user', 'username email profile')
      .sort({ score: -1, rank: 1 })
    res.json(leaderboard)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

// Get user's leaderboard entry
router.get('/user/:userId', async (req, res) => {
  try {
    const entry = await Leaderboard.findOne({ user: req.params.userId })
      .populate('user', 'username email profile')
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' })
    }
    res.json(entry)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' })
  }
})

// Create or update leaderboard entry
router.post('/', async (req, res) => {
  try {
    const { user, score, rank, period = 'monthly' } = req.body
    let entry = await Leaderboard.findOne({ user, period })
    if (entry) {
      entry.score = score
      entry.rank = rank
      entry.updatedAt = new Date()
      await entry.save()
    } else {
      entry = new Leaderboard({ user, score, rank, period })
      await entry.save()
    }
    await entry.populate('user', 'username email profile')
    res.status(201).json(entry)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' })
  }
})

// Update leaderboard entry
router.put('/:id', async (req, res) => {
  try {
    const { score, rank } = req.body
    const entry = await Leaderboard.findByIdAndUpdate(
      req.params.id,
      { score, rank, updatedAt: new Date() },
      { new: true }
    ).populate('user', 'username email profile')
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' })
    }
    res.json(entry)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' })
  }
})

// Delete leaderboard entry
router.delete('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndDelete(req.params.id)
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' })
    }
    res.json({ message: 'Leaderboard entry deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete leaderboard entry' })
  }
})

export default router
