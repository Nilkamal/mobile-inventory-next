import mongoose, { Schema } from "mongoose";

const mobileSchema = new Schema({
  mobile: String,
  storage: String,
  quantity: Number,
  ram: String,
  brand: String,
});

const Mobile = mongoose.models.Mobile || mongoose.model("Mobile", mobileSchema);

export default Mobile;
