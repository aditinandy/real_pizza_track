const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');

function initRoutes(app) {
    app.get('/', homeController().index); // which object is create for home page
    // here homeController().index => req, res

    // (req, res) => { // page read
    //     res.render('home');
    // });

    app.get('/cart', cartController().index);

    // (req, res) => {
    //     res.render('customers/cart');
    // });
    
    app.get('/login', authController().login); // function call then it returns object, 
    // then which obejct will display or work here ?? index 1 or 2 - using .dot notaion we can define

    // (req, res) => {
    //     res.render('auth/login');
    // });
    
    app.get('/register', authController().register);
    app.post('/register', authController().postregister);

    // (req, res) => {
    //     res.render('auth/register');
    // });
    app.post('/update-cart', cartController().update);
}

module.exports = initRoutes;