import {Sequelize} from "sequelize";

const db = new Sequelize('haus', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

export default db;