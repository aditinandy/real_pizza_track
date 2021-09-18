const User = require('../../models/user');
const bcrypt = require('bcrypt');

function authController() {
    // factory function
    return {
        login(req, res) { // index : function () {} - we can use this also
            res.render('auth/login');
        },

        register(req, res) { // index : function () {} - we can use this also
            res.render('auth/register');
        },

        async postregister(req, res) { // index : function () {} - we can use this also
            const { name, email, password } = req.body;
            // console.log(req.body);
            // res.render('auth/register');
            // Validate req
            if(!name || !email || !password) {
                // msg send to flash() in server.js file
                req.flash('error', 'All fields are req'); // it rcv key value pair
                req.flash('name', name);
                req.flash('email', email);
                req.flash('password', password);
                return res.redirect('/register');
            }
            // check if email exist
            User.exists({ email: email }, (err, result) => {
                if(result) {
                    req.flash('error', 'Email Allready Exist'); // it rcv key value pair
                    req.flash('name', name);
                    req.flash('email', email);
                    req.flash('password', password);
                    return res.redirect('/register');
                }
            })
            // hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // create a user
            const user = new User ({
                name: name,
                email: email,
                password: hashedPassword
            })
            user.save().then((user) => {
                // login
                return res.redirect('/');
            }).catch(err => {
                req.flash('error', 'Something went wrong'); // it rcv key value pair
                return res.redirect('/register');
            })
        }
    }; // here return object
}

module.exports = authController;