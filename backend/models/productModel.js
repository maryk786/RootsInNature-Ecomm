const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    type:{
      type:String
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    quantity: {
      type: Number,
      // required: true,
    },
    images: 
      {
        public_id: String,
        url: String,
        type:String
      },
      imageList:[{type:String}],


    season: [
      {
        type: String,
        enum: ["summer", "winter", "spring", "winter", "autumn", "evergreen"],
        required: true,
      },
    ],
    featuredProducts: {
      type: Boolean,
      default: false,
    },
    blooming_time: String,

    soil_requirement: String,
    watering_schedule: String,
    light_requirement: String,
    scientific_name:String,
    common_name:String,
    uses: String,
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
