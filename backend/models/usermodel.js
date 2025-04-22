import mongoose from "mongoose";

const Userschema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    },
  name: {
      type: String,
      required: true,
      trim:true
  }
});
const Usersmodel = mongoose.model("user", Userschema);
export default Usersmodel;