const restaurant = require('../models/restaurant');
const place = require('../models/place');

exports.info = async (req, res, next) => {
    const id = req.params['id'];
    const RESTAURANT = await restaurant.detail(id);
    const PLACE = await place.detail(RESTAURANT.idDiaDanh);
    res.render('restaurant/info', {PLACE,RESTAURANT,user:req.user}); 
};