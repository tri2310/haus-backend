import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';
import ProdukRoute from './routes/ProdukRoute.js';
import KuponRoute from './routes/KuponRoute.js';


dotenv.config();

 
const app = express();


//variabel untuk session store ke database
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
});


//untuk sync ke database pembuatan table otomatis ke database, bisa di hilangkan setelah tidak digunakan
// (async() => {
//   await db.sync();
// })();


//middleware

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: store,
  saveUninitialized: true,
  cookie: {
    secure: 'auto'
  }
}));

 




app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5500'
}));


app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(AuthRoute);
app.use(ProdukRoute);
app.use(KuponRoute); 
app.listen(process.env.APP_PORT, () => {
  console.log('Server is running port 5000...');
});