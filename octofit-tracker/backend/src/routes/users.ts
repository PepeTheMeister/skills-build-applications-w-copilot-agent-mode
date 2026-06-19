import { Router } from 'express'
import { User } from '../models.js'

const router = Router()

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Create user
router.post('/', async (req, res) => {
  try {
    const { username, email, password, profile } = req.body
    const user = new User({ username, email, password, profile })
    await user.save()
    const userResponse = user.toObject()
    delete userResponse.password
    res.status(201).json(userResponse)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' })
  }
})

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { profile } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { profile },
      { new: true }
    ).select('-password')
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update user' })
  }
})

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ message: 'User deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
