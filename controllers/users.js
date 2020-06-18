const user = require('../models/users');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

exports.signUp = async (req, res, next) => {
    res.render('users/signUp');
};

exports.signUpPost = async (req, res, next) => {
    const account = await user.get(req.body.email);
    if (account)
        return res.render('users/signUp', {message: 'Tài khoản đã tồn tại!'});
    const hashPassword = bcrypt.hashSync(req.body.password, SALT_ROUNDS); 
    const data = {
        ten:req.body.ten,
        email:req.body.email,
        password:hashPassword
    }
    await user.add(data);
    res.redirect('/users/login');
};

exports.loginGet = async (req, res, next) => { 
    res.render('users/login'); 
};

exports.logout = (req,res) => {
    req.logout();
    res.redirect('/');
};