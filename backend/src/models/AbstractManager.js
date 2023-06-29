class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database
      .query(`select * from  ${this.table} where id = ?`, [id])
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
      .query(`select * from  ${this.table}`)
      .then(([rows]) => {
        return { status: 200, message: rows };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }

  delete(id) {
    return this.database
      .query(`delete from ${this.table} where id = ?`, [id])
      .then(([rows]) => {
        return rows.affectedRows === 0
          ? { status: 404, message: {} }
          : { status: 204, message: {} };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }

  update(data, id) {
    let sqlQuery = `UPDATE ${this.table} SET `;

    const keys = Object.keys(data);
    keys.forEach((key) => {
      sqlQuery += `${key} = ?, `;
    });

    sqlQuery = sqlQuery.slice(0, sqlQuery.length - 2);

    sqlQuery += ` WHERE id = ?`;

    const bodyResponse = { id, ...data };

    return this.database
      .query(sqlQuery, [...Object.values(data), id])
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

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
