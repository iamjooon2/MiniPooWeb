module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', { //user table을 생성한다
    email : {},
    name : {type: DataTypes.STRTING(20)},
    password: {},
    allowNull : false,
    unique : true,
  }, {
      charset: 'utf-8',
      collate : 'utf8_general_ci' //한글 저장
  });
  user.associate = (db) => {};
  return user;
};