const User = require('./User')
const Podcast = require('./Podcast')
const Notes = require('./Notes')

User.hasMany(Podcast) 
Podcast.belongsTo(User) 

User.hasMany(Notes)
Notes.belongsTo(User)

Podcast.hasOne(Notes)
Notes.belongsTo(Podcast)

module.exports = {
    User,
    Podcast,
    Notes
}