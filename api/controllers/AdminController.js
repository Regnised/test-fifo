const Goods = require('../models/GoodsModel');
const Transaction = require('../models/TransactionsModel');
const ServiceError = require('../../config/error.config');

module.exports = {
    clearDatabase: clearDatabase
};

function clearDatabase(req, res) {
    Goods.find().remove().exec();
    Transaction.find().remove().exec();
    res._end({success: true})
}
