import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
 
const Product = db.define('product',{
   
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    image2: DataTypes.STRING,
    harga_small: DataTypes.STRING,
    harga_medium: DataTypes.STRING,
    harga_large: DataTypes.STRING,
    url: DataTypes.STRING,
    url2: DataTypes.STRING,
    position: DataTypes.STRING,
    ext: DataTypes.STRING
},{
    freezeTableName: true
});
 
export default Product;
 
