// no-sql uses collections instead of tables which relates the docs.
// this file name can be named as Product.js or product.model.js

import mongoose from "mongoose";


//products

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
 },
  {
        timestamps: true //createdAt, updatedAt
});

const Product = mongoose.model('Product',productSchema);
// mongoose changes the 'Product' into products automatically when it compiles.

export default Product;