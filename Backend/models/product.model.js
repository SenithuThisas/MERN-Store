import mangoose from "mongoose";
const productSchema = mangoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

}, {
    timestamps:true
});

const Product = mangoose.model('Product', productSchema);
export default Product;
//products

