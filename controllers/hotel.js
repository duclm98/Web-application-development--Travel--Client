const hotel = require('../models/hotel');
const place = require('../models/place');

exports.info = async (req, res, next) => {
    const id = req.params['id'];
    const HOTEL = await hotel.detail(id);
    const PLACE = await place.detail(HOTEL.idDiaDanh);
    res.render('hotel/info', {HOTEL,PLACE,user:req.user}); 
};