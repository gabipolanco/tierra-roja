const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "artist", "guest"],
    default: "guest"
  },
  image: {
    type: String,
    default: ""
  },
  artWork: [{
    type: Schema.Types.ObjectId,
    ref: "Artwork"
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;