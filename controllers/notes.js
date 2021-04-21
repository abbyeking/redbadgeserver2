const router = require('express').Router()
const { Podcast, Notes, User } = require('../models/index')

// CREATE NOTES

router.post('/:pid', async (req, res) => {
try {
    console.log(req)
  const result = await Notes.create({
    userId: req.user.id,
    podcastId: req.params.pid,
    note: req.body.note
  })
      res.status(200).json({ message: 'Note created successfully.', result })
    } catch (err) {
      res.status(500).json({ message: 'Note was not created.', error: err })
    }
})

// GET ALL NOTES BY SHOW

router.get('/podcast/:pid', async (req, res) => {
  const { pid } = req.params
  try {
      const podcast = await Podcast.findOne({ 
          where: { id: pid },
          include: Notes
      })
      if (podcast === null) {
          res.status(404).json({ message: 'Podcast not found.' })
      } else if (podcast.notes === null) {
          res.status(404).json({ message: "Podcast has no notes. Try creating one." })
      } else {
          res.status(200).json(podcast)
      }
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving notes.', error: err })
  }
})

// GET NOTES BY USER

router.get('/user/:uid', async (req, res) => {
  const { uid } = req.params
  try {
      const user = await User.findOne({ 
          where: { id: uid },
          include: Notes
      })
      if (user === null) {
          res.status(404).json({ message: 'User not found.' })
      } else if (user.notes.length === 0) {
          res.status(404).json({ message: "User has no notes. Try creating one." })
      } else {
          res.status(200).json(user)
      }
  } catch (err) {
      res.status(500).json({ message: 'Error retrieving notes.', error: err })
  }
})

// UPDATE

router.put('/:id', async (req, res) => {
  const { notes } = req.body.note
  const { id } = req.params
//   const update = { note: notes }

  try {
    const result = await Notes.update(req.body, { where: { id: id } })
    if (result[0].length === 0) {
        res.status(404).json({ message: "No notes found.", result: result })
    } else {
        res.status(200).json({ message: "Note has been updated.", result })
    }
  } catch (err) {
      res.status(500).json({ error: err })
  }
})

// DELETE

router.delete('/:id', async (req,res) => {
  const { id } = req.params
  try {
      const result = await Notes.destroy({ where: { id: id } })
      if (result === 1) {
          res.status(200).json({ message: "Note has been removed", result: result })
      } else {
          res.status(404).json({ message: "No note found." })
      }
  } catch (err) {
      res.status(500).json({ err: err })
  }
})

module.exports = router