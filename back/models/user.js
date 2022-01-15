module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    name : {type: DataTypes.STRTING(20)},
    allowNull : false,
    unique : true,
  })
};