const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'devlopment';
const config = require('../config/config')[env];
const db = {};

//sequelize가 mysql이랑 nodejs을 연결시킴
//성공시 sequelize 객체에 담김
const sequelize = new Sequelize(config.database, config.username, config.password, config);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;