const passport = require('passport');
const local = require('./local');
const db = require('../config/db');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id); //(서버에러, 성공)
    });
 
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserByName(id);
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    local();
}

const findUserByID = (id) => {
	const findUserQuery = "SELECT * FROM USER WHERE ID = ?";
	const result = db.connection.query(findUserQuery, [id]);
	return result[0];
};