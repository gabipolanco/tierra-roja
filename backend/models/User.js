const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  confirmed: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["admin", "artist", "guest"],
    default: "guest"
  },
  image: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
  },
  artWork: [{
    type: Schema.Types.ObjectId,
    ref: "Work"
  }],
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "Artist"
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;