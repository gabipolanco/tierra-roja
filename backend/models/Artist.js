const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
  const Artist = mongoose.model('Artist', artistSchema);
  module.exports = Artist;