const router = require('express').Router()
const { User, Podcast } = require('../models/index')

/***************
   * CREATE *
****************/
router.post('/create', async (req, res) => {
    try {
      const result = await Podcast.create({
        owner: req.user.id,
        name: req.body.name,
        images: req.body.images,
        description: req.body.description,
        genre: req.body.genre,
        userId: req.user.id
      })
      res.status(200).json({ message: 'Podcast created successfully.', result })
    } catch (err) {
        res.status(500).json({ message: 'Podcast was not created.', error: err })
    }
})

/**********************
  * GET ALL BY USER *
***********************/
router.get('/user/:uid', async (req, res) => {
    const { uid } = req.params
    try {
        const user = await User.findOne({ 
            where: { id: uid },
            include: Podcast
        })
        if (user === null) {
            res.status(404).json({ message: 'User not found.' })
        } else if (user.podcasts.length === 0) {
            res.status(404).json({ message: "User has no podcasts." })
        } else {
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving podcasts.', error: err })
    }
})

/***************
   * UPDATE *
****************/
router.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const update = {
        genre: req.body.genre
      }
      const result = await Podcast.update(update, { where: { id: id } })
      if (result[0] === 0) {
          res.status(404).json({ message: "No podcast found.", result: result })
      } else {
          res.status(200).json({ message: "Your genre has been updated.", update: update })
      }
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/***************
   * DELETE *
****************/
router.delete('/:id', async (req,res) => {
    const { id } = req.params
    try {
        const result = await Podcast.destroy({ where: { id: id } })
        if (result === 1) {
            res.status(200).json({ message: "Podcast has been removed", result: result })
        } else {
            res.status(404).json({ message: "No podcast found." })
        }
    } catch (err) {
        res.status(500).json({ err: err })
    }
})

module.exports = router