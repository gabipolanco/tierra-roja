const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  profession: {
    type: String,
    default: ""
  },
  bio: {
    type: String,
  default: ""
},
  coverImage: {
    type: String,
    default: ""
  },
  socialMedia: {
    instagram: {
      type: String,
      default: "instagram.com"
    },
    facebook: {
      type: String,
    default: "facebook.com"
  },
    twitter: {
      type: String,
      default: "twitter.com"
    },
    other: {
      type: String,
    default: ""
  }
  },
  works: [{
    type: Schema.Types.ObjectId,
    ref: 'Work'
  }]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
  const Artist = mongoose.model('Artist', artistSchema);
  module.exports = Artist;