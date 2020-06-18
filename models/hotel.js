const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const HOTELS = 'hotels';

const detail = async (id) => {
    const results = await dbs.production.collection(HOTELS).find({_id: ObjectId(id)})
      .toArray();
    return results[0];
  };
exports.detail = detail;

module.exports.list = async () => {
    return await dbs.production.collection(HOTELS).find().toArray();
};

module.exports.listByIdDiaDanh = async (idDiaDanh) => {
  return await dbs.production.collection(HOTELS).find({idDiaDanh}).toArray();
};