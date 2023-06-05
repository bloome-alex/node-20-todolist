import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
    author: {
      type: String,
      required: true,
      index: false
    },
    title: {
        type: String,
        required: true,
        index: false
    },
    checked: {
        type: Boolean,
        required: true,
        index: false,
        default: false
    }
}, {
    timestamps: true
});
  
const Task = mongoose.model('Task', taskSchema);
  
export default Task;