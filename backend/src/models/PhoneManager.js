const AbstractManager = require("./AbstractManager");

class PhoneManager extends AbstractManager {
  constructor() {
    super({ table: "phone" });
  }

  insert(phone, image) {
    return this.database
      .query(
        `insert into ${this.table} (brand, model, ram, memory, category, screen_size, price, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          phone.brand,
          phone.model,
          phone.ram,
          phone.memory,
          phone.category,
          phone.screen_size,
          phone.price,
          image,
        ]
      )
      .then(([rows]) => {
        return { status: 201, message: { id: rows.insertId, ...phone } };
      })
      .catch((err) => {
        console.error(err);
        return { status: 500, message: "Error" };
      });
  }
}

module.exports = PhoneManager;
