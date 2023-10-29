import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
  brand: { type: String, unique: true, required: true, dropDups: true },
});

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);

export default Brand;
