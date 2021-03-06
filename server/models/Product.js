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
    description: String,
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
    sort: {
        type: Number,
        default: 1
    },
    area: {
        type: Number,
        default: 1
    },
    detailedArea: String,
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

productSchema.index({
    title: 'text',
    description: 'text'
}, {
    weights: {
        title: 5,
        description: 1
    }
})

module.exports = { Product }