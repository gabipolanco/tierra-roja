const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classModelSchema = new Schema({
  name: String,
  description: String,
  contentLink: String,
  slideShowLink: String,
  video: {
      type: Schema.Types.ObjectId,
      ref: 'Streaming'
  },
  hour: Date
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  })

const ClassModel = mongoose.model('ClassModel', classModelSchema);
module.exports = ClassModel;