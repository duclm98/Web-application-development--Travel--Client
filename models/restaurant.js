const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');
const RESTAURANTS = 'restaurants';

const detail = async (id) => {
    const results = await dbs.production.collection(RESTAURANTS).find({_id: ObjectId(id)})
      .toArray();
    return results[0];
  };
exports.detail = detail;

module.exports.list = async () => {
    return await dbs.production.collection(RESTAURANTS).find().toArray();
};

module.exports.listByIdDiaDanh = async (idDiaDanh) => {
  return await dbs.production.collection(RESTAURANTS).find({idDiaDanh}).toArray();
};