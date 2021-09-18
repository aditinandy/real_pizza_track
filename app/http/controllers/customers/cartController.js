function cartController() {
    // factory function
    return {
        index(req, res) { // index : function () {} - we can use this also
            return res.render('customers/cart');
        },

        update(req, res) { // index : function () {} - we can use this also
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }
            if (!req.session.cart) { // check if cart saession is present or not, if not then create cart session
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0  
                }
            }
            let cart = req.session.cart; // if the cart is present

            // console.log(req.body);
            // if item doed'nt exist
            if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            } // chk if item already present in the cart or not, if yes then increase the qty
            else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

            return res.json({ totalQty: req.session.cart.totalQty });
        }
    }; // here return object
}

module.exports = cartController;