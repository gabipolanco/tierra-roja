const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const streamingSchema = new Schema({
  title: String,
  description: String,
  hour: String,
  streamKey: String,
  streamId: String,
  playbackId: String,
  type: {
    type: String,
    enum: ["private", "public"],
    default: "private"
  },
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
  
  const Streaming = mongoose.model('Streaming', streamingSchema);
  module.exports = Streaming;