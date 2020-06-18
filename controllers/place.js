const place = require('../models/place');
const comment = require('../models/comment');
const hotel = require('../models/hotel');
const restaurant = require('../models/restaurant');

exports.info = async (req, res, next) => {
    const id = req.params['id'];
    const PLACE = await place.detail(id);
    const COMMENTS = await comment.list(id);
    const HOTELS = await hotel.listByIdDiaDanh(id);
    const RESTAURANTS = await restaurant.listByIdDiaDanh(id);
    res.render('place/info', {PLACE,COMMENTS,HOTELS,RESTAURANTS,user:req.user}); 
};

exports.comment = async (req, res, next) => {
    const id = req.params['id'];
    const PLACE = await place.detail(id);
    var TEN_USER = "";
    var EMAIL = "";
    if(req.user){
        TEN_USER=req.user.ten;
        EMAIL=req.user.email;
    }
    else{
        TEN_USER=req.body.tenUser;
    }
    const cmt = {
        tenUser:TEN_USER,
        email:EMAIL,
        nhanXet:req.body.nhanXet,
        idDiaDanh:id,
        tenDiaDanh:PLACE.ten,
        pheDuyet:0
    }  
    await comment.add(cmt);
    const path = "../info/"+id;
    res.redirect(path);
};