const Menu = require('../../models/menu');

function homeController() {
    // factory function
    return {
        async index(req, res) { // index : function () {} - we can use this also
            // database fetched data
            const pizzas = await Menu.find();
            // console.log(pizzas);
            return res.render('home', { pizzas: pizzas }); // home - path

            // Menu.find().then(function(pizzas) {
            //     // console.log(pizzas[2].name);
            //     return res.render('home', { pizzas: pizzas });
            // })
            
        }
    }; // here return object
}

module.exports = homeController;