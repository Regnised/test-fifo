const mongoose = require('mongoose');
const goodsSchema = new mongoose.Schema({
        cost: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
            max: 9999999
        },
        sold: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Good', goodsSchema);
