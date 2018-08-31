const Transaction = require('../models/TransactionsModel');
const ServiceError = require('../../config/error.config');

module.exports = {
    getTransactions: getTransactions
};

function getTransactions(req, res) {
    Transaction.find()
        .exec((err, transactions) => {
            if (err) return res._end(new ServiceError(err.message, ServiceError.STATUS.INTERNAL_SERVER_ERROR, ServiceError.CODE.ERROR_SERVER))
            res._end({transactions: transactions});
        })
}