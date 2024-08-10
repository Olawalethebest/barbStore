const bcrypt = require("bcryptjs");
const saltRounds = 10;

/**
 * hashPassword- hashes the password
 * @param {*} password
 * @returns {Promise} hash and salt
 */
const hashPassword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        resolve({ hash, salt });
      });
    });
  });
};

/**
 * comparePassword - compares the password with the hashPassword
 * @param {String} password
 * @param {String} hashPassword
 * @return {Boolean} true or false
 */
const comparePassword = async (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    let result = bcrypt.compare(password, hashPassword);
    if (result) {
      resolve(result);
    } else {
      reject(err);
    }
  });
};

module.exports = { hashPassword, comparePassword };
