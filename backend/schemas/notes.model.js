const { default: mongoose } = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: "general",
    },
    image: {
      type: String,
      default: "https://images.pexels.com/photos/636237/pexels-photo-636237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
