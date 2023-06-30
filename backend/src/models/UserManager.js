const AbstractManager = require("./AbstractManager");
const { passwordHasher } = require("../services/PasswordHelper");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.database
      .query(
        `select username, name, isAdmin from  ${this.table} where id = ?`,
        [id]
      )
      .then(([rows]) => {
        return rows.length === 0
          ? { status: 404, message: {} }
          : { status: 200, message: rows[0] };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }

  findAll() {
    return this.database
      .query(`select id, username, name, isAdmin from  ${this.table}`)
      .then(([rows]) => {
        return { status: 200, message: rows };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }

  async insert(user) {
    return this.database
      .query(
        `INSERT INTO ${this.table} (username, name, isAdmin, password) VALUES (?, ?, ?, ?)`,
        [
          user.username,
          user.name,
          user.isAdmin,
          await passwordHasher(user.password),
        ]
      )
      .then((rows) => {
        return {
          status: 201,
          message: {
            id: rows.insertId,
            username: user.username,
            name: user.name,
            isAdmin: user.isAdmin,
          },
        };
      })
      .catch((err) => {
        console.error(err);
        return {
          status: 500,
          message: err.errno === 1062 ? "Cet username existe déja" : "Error",
        };
      });
  }

  async update(body, id) {
    let sqlQuery = `UPDATE ${this.table} SET `;

    // v Because of ESLint
    const data = body;
    if (data.password) {
      data.password = await passwordHasher(data.password);
    }

    const keys = Object.keys(data);

    keys.forEach((key) => {
      sqlQuery += `${key} = ?, `;
    });

    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);
    let sqlData = [];

    sqlData = [...Object.values(data), id];

    sqlQuery += ` WHERE id = ?`;

    const bodyResponse = { id, ...data };
    delete bodyResponse.password;

    return this.database
      .query(sqlQuery, sqlData)
      .then(async ([rows]) => {
        return rows.affectedRows === 0
          ? { status: 404, message: {} }
          : { status: 201, message: bodyResponse };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }
}

module.exports = UserManager;
