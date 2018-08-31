const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
        cost: Number,
        quantity: Number,
        transactionType: {
            type: String,
            default: 'sell'
        },
        doc: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Good'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transaction', transactionSchema);
