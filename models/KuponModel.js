import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Product from './ProdukModel.js';

const {DataTypes} = Sequelize;


const Kupon = db.define('kupon', {
  name:{
    type: DataTypes.STRING,
    
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  id_produk:{
    type: DataTypes.INTEGER,
  
  },
  code:{
    type: DataTypes.STRING,
    
   
  },
  
   expired:{
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
   diskon:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      
    }
  },
 
  
}, {
  freezeTableName: true
});


Product.hasMany(Kupon);
Kupon.belongsTo(Product, {foreignKey: 'id_produk'});

export default Kupon;
