const place = require('../models/place');
const hotel = require('../models/hotel');
const restaurant = require('../models/restaurant');

exports.home = async (req, res, next) => {
    const places = await place.list();
    const hotels = await hotel.list();
    const restaurants = await restaurant.list();
    res.render('index', {places,hotels,restaurants,user:req.user}); 
};

exports.search = async (req, res, next) => {
    const key =req.body.key;
    console.log(key);
    const places = await place.search(key);
    const hotels = await hotel.list();
    const restaurants = await restaurant.list();
    res.render('index', {places,hotels,restaurants,user:req.user}); 
};