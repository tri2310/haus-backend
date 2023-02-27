import Users from '../models/UserModel.js';
import argon2 from 'argon2';
import jwt from "jsonwebtoken";


export const Login = async(req, res) => {
  //user adalah variabelnya
    const user = await  Users.findOne({
      
      where: {
        email: req.body.email
      }
    });
    //jika usernya tidak ditemukan
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});

    //jika usernya berhasil ditemukan harus di verifikasi
    const match = await argon2.verify(user.password, req.body.password);

    //jika password yang dikirimkan oleh user tidak cocok
    if(!match) return  res.status(400).json({msg: "Wrong password!"});

    //jika password cocok, maka akan set sessionnya
    //userId ini adalah nama variabel sessionnya
    req.session.userId = user.uuid;
    
    //variabelnya
    const userId = user.id;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    const accessToken = jwt.sign({userId, name, email, uuid, role}, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '60s'
    });
    const refreshToken = jwt.sign({userId, name, email, uuid, role}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '300s'
    });

    await Users.update({refresh_token: refreshToken}, {
      where: {
        id: userId
      }
    });

     //response cooki to client
    res.cookie('refreshtoken', refreshToken, {
      httpOnly: true,
      //waktu expired cookie dalam hitungan ms
      maxAge: 24 * 60 * 60 * 1000,
      //jika menggunakan SSL harus aktifkan ini
      // secure: true
    });
    //parsing kedalam respon 200 jika berhasil
    res.status(200).json({accessToken});

}

//ini function untuk get user yang login, dan berguna juga untuk di frontendnya
export const hasLogin = async (req, res) => {
  //cek jika tidak terdapat session user idnya
  if(!req.session.userId){ 
    return res.status(401).json({msg: "Mohon login ke akun anda!"});
  }
  //jika terdapat session di database
   const user = await  Users.findOne({
    attributes: ['uuid', 'name', 'email', 'role'],
      where: {
        //cari usernya berdasarkan uuid di dalam userId
        uuid: req.session.userId,
      }
    });
    //jika usernya tidak ditemukan
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    //jika terdapat user maka mereturn dan parsing ke dalam json
    res.status(200).json(user);
}

export const Logout = async(req, res) => {
  req.session.destroy((err) => {
    //jika gagal logout
    if(err) return res.status(400).json({msg: "Gagal logout"});
    //jika berhasil logout
    res.status(200).json({msg: "Anda berhasil logout"});
  });
  const refreshToken = req.session.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({ 
      where: {
        refresh_token: refreshToken
      }
    });
    if(!user[0]) return res.sendStatus(204);

    const userId = user[0].id;
    await Users.update({ refreshToken: null }, {
      where: {
        id: userId
      }
    });
    res.clearCookie('refreshToken');
    return  res.sendStatus(200);
}











//master session
// import Users from '../models/UserModel.js';
// import argon2 from 'argon2';



// export const Login = async(req, res) => {
//   //user adalah variabelnya
//     const user = await  Users.findOne({
//       where: {
//         email: req.body.email
//       }
//     });
//     //jika usernya tidak ditemukan
//     if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});

//     //jika usernya berhasil ditemukan harus di verifikasi
//     const match = await argon2.verify(user.password, req.body.password);

//     //jika password yang dikirimkan oleh user tidak cocok
//     if(!match) return  res.status(400).json({msg: "Wrong password!"});

//     //jika password cocok, maka akan set sessionnya
//     //userId ini adalah nama variabel sessionnya
//     req.session.userId = user.uuid;
    
//     //variabelnya
//     const uuid = user.uuid;
//     const name = user.name;
//     const email = user.email;
//     const role = user.role;
//     //parsing kedalam respon 200 jika berhasil
//     res.status(200).json({uuid, name, email, role});

// }

// //ini function untuk get user yang login, dan berguna juga untuk di frontendnya
// export const hasLogin = async (req, res) => {
//   //cek jika tidak terdapat session user idnya
//   if(!req.session.userId){ 
//     return res.status(401).json({msg: "Mohon login ke akun anda!"});
//   }
//   //jika terdapat session di database
//    const user = await  Users.findOne({
//     attributes: ['uuid', 'name', 'email', 'role'],
//       where: {
//         //cari usernya berdasarkan uuid di dalam userId
//         uuid: req.session.userId,
//       }
//     });
//     //jika usernya tidak ditemukan
//     if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
//     //jika terdapat user maka mereturn dan parsing ke dalam json
//     res.status(200).json(user);
// }

// export const Logout = (req, res) => {
//   req.session.destroy((err) => {
//     //jika gagal logout
//     if(err) return res.status(400).json({msg: "Gagal logout"});
//     //jika berhasil logout
//     res.status(200).json({msg: "Anda berhasil logout"});
//   })
// }
