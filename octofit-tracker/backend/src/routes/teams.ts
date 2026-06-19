import { Router } from 'express'
import { Team } from '../models.js'

const router = Router()

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('leader', 'username email')
      .populate('members', 'username email')
    res.json(teams)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('leader', 'username email')
      .populate('members', 'username email')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

// Create team
router.post('/', async (req, res) => {
  try {
    const { name, description, leader } = req.body
    const team = new Team({ name, description, leader, members: [leader] })
    await team.save()
    await team.populate('leader', 'username email')
    await team.populate('members', 'username email')
    res.status(201).json(team)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create team' })
  }
})

// Add member to team
router.post('/:id/members', async (req, res) => {
  try {
    const { userId } = req.body
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate('members', 'username email')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (err) {
    res.status(400).json({ error: 'Failed to add member' })
  }
})

// Remove member from team
router.delete('/:id/members/:userId', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { $pull: { members: req.params.userId } },
      { new: true }
    ).populate('members', 'username email')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (err) {
    res.status(400).json({ error: 'Failed to remove member' })
  }
})

// Update team
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    ).populate('leader', 'username email')
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json(team)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update team' })
  }
})

// Delete team
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id)
    if (!team) {
      return res.status(404).json({ error: 'Team not found' })
    }
    res.json({ message: 'Team deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team' })
  }
})

export default router
