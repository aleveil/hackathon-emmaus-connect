const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const AbstractManager = require("./AbstractManager");
const { passwordVerification } = require("../services/PasswordHelper");

const privateKeyPath = path.join(__dirname, "../../jwtRS256.key");
const privateKey = fs.readFileSync(privateKeyPath);

class AuthManager extends AbstractManager {
  constructor() {
    super({ table: "auth" });
  }

  login({ username, password }) {
    return this.database
      .query(`SELECT * FROM user WHERE username = ?`, [username])
      .then(async ([rows]) => {
        if (rows.length === 0) {
          return { status: 401, message: "Username ou mot de passe invalide" };
        }
        if (!(await passwordVerification(password, rows[0].password))) {
          return { status: 401, message: "Username ou mot de passe invalide" };
        }
        const user = rows[0];
        delete user.password;
        const token = jwt.sign({ user }, privateKey, {
          algorithm: "RS256",
        });
        return { status: 200, message: { token } };
      });
  }
}
module.exports = AuthManager;
