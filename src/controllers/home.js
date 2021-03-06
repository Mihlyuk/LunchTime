var OrderModel = require('../models/order').model;

module.exports = function(req, res, next) {
    OrderModel.find({})
        .populate("orders.dish")
        .populate("subscribers.orders.dish")
        .exec(function (err, orders) {
            if (err) {
                return next(err);
            }

            function isSubscriber(subscribers){
                return subscribers.some(function(subscriber){
                    return subscriber.person.id == req.user.id;
                });
            }
            if (req.user) {
                orders = orders.sort( function (a, b){
                    if (a.owner.id == req.user.id) {
                        return -1;
                    }
                    if (b.owner.id == req.user.id) {
                        return 1;
                    }
                     if (isSubscriber(a.subscribers)) {
                        return -1;
                     }
                     if (isSubscriber(b.subscribers)) {
                        return 1;
                    }
                    return 0;
                });
            }
            res.render('index', {orders: orders});
        });
};
