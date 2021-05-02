const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
}, {timeStamp: true});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }