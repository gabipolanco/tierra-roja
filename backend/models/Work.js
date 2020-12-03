const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const workSchema = new Schema({
  workType: {
    type: String,
    enum: ["art", "craft"],
    default: "art"
  },
  title: String,
  media: {
    type: String,
    default: "https://www.southtabor.com/newsite/wp-content/themes/consultix/images/no-image-found-360x250.png"
  },
  artistId: {
      type: Schema.Types.ObjectId,
      ref: "Artist"
  },
  description: String,
  price: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Work = mongoose.model('Work', workSchema);
module.exports = Work;