const Goods = require('../models/GoodsModel');
const Transaction = require('../models/TransactionsModel');
const ServiceError = require('../../config/error.config');

module.exports = {
    buyGoods: buyGoods,
    sellGoods: sellGoods,
    getGoods: getGoods
};

function buyGoods(req, res) {
    const goods = new Goods(req.body);
    goods.save((err, goods) => {
        if (err) return res._end(new ServiceError(err.message, ServiceError.STATUS.INTERNAL_SERVER_ERROR, ServiceError.CODE.ERROR_SAVE_TO_DB))
        saveTransaction(goods.cost, goods.quantity, goods._id, 'buy');
        res._end(goods);
    })
}

function sellGoods(req, res) {
    const cost = req.body.cost;
    let sold = false,
        quantity = req.body.quantity,
        delta = req.body.quantity;

    Goods.find()
        .$where('this.quantity > this.sold')
        .sort('createdAt')
        .stream()
        .on('data', function (doc) {
            if (sold) return;
            quantity = (delta !== quantity) ? delta : quantity;
            delta = (doc.quantity - doc.sold) - delta;
            if (delta >= 0) {
                //sold all pens on this request
                doc.sold = doc.sold + quantity;
                sold = true;
                updateGoods(doc._id, doc);
                saveTransaction(cost, quantity, doc);
            } else {
                if (quantity <= Math.abs(delta)) return;

                //sell tail of requested pens
                delta = quantity - Math.abs(delta);
                doc.sold = doc.quantity;
                updateGoods(doc._id, doc);
                saveTransaction(cost, delta, doc);
            }
        })
        .on('error', function (err) {
            res._end(new ServiceError(err.message, ServiceError.STATUS.INTERNAL_SERVER_ERROR, ServiceError.CODE.ERROR_SERVER))
        })
        .on('end', function () {
            res._end({success: true});
        });

}

function getGoods(req, res) {
    Goods.find()
        .exec((err, goods) => {
            if (err) return res._end(new ServiceError(err.message, ServiceError.STATUS.INTERNAL_SERVER_ERROR, ServiceError.CODE.ERROR_SAVE_TO_DB))

            res._end({'goods': goods})
        })
}

function updateGoods(id, goods) {
    Goods.findOneAndUpdate({'_id': id}, goods, {new: true})
        .exec((err, data) => {
            if (err) return res._end(new ServiceError(err.message, ServiceError.STATUS.INTERNAL_SERVER_ERROR, ServiceError.CODE.ERROR_SAVE_TO_DB))
        })
}

function saveTransaction(cost, quantity, doc, type) {
    let transaction = {
        'cost': cost,
        'quantity': quantity,
        'doc': doc._id,
        'transactionType': type || 'sell'
    };
    transaction = new Transaction(transaction);
    transaction.save();
}