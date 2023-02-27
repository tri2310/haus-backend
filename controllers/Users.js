import Users from "../models/UserModel.js";
import argon2 from "argon2";


export const getUsers = async(req, res) => {
  try {
    const response = await  Users.findAll({
      attributes: ['uuid', 'name', 'email']
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}


export const getUsersById = async(req, res) => {
   try {
    const response = await  Users.findOne({
      attributes: ['uuid', 'name', 'email'],
      where: {
        uuid: req.params.id
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}


export const createUser = async(req, res) => {
  const {name, email, password, confPassword, role} = req.body;
  if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm password tidak cocok!"});
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    });
    res.status(201).json({msg: "Register berhasil"});
  } catch (error) {
    res.status(400).json({msg: error.message});
  }
}


export const updateUser = async(req, res) => {
  //user adalah variabelnya
    const user = await  Users.findOne({
      where: {
        uuid: req.params.id
      }
    });
    //jika user tidak ada di dalam database
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    //jika usernya ditemukan
    const {name, email, password, confPassword, role} = req.body;
    //validasi untuk mengirimkan passwordnya
    //membuat variabel
    let hashPassword;
    //validasi password (jika passwordnya = kosong atau null)
    if(password == "" || password == null){
      //ambil passwordnya from database
      hashPassword = user.password
    } else{
      //jika user mengirimkan passwordnya maka di update dan akan di hash lagi
      hashPassword = await argon2.hash(password);
    }
    //validasi jika password yang dikirimkan tidak sama maka akan mereturn status 400
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm password tidak cocok!"});
     try {
      //jika validasinya berhasil maka akan update ke database
    await Users.update({
      name: name,
      email: email,
      password: hashPassword,
      role: role
    }, {
      //update berdasarkan id
      where: {
        id: user.id
      }
    });
    //jika berhasil
    res.status(200).json({msg: "User berhasil diupdate"});
  } catch (error) {
    //jika error
    res.status(400).json({msg: error.message});
  }
}


export const deleteUser = async(req, res) => {
   //user adalah variabelnya
    const user = await  Users.findOne({
      where: {
        uuid: req.params.id
      }
    });
    
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
   
     try {
      
    await Users.destroy({
      
      //hapus berdasarkan id
      where: {
        id: user.id
      }
    });
    //jika berhasil
    res.status(200).json({msg: "User berhasil dihapus"});
  } catch (error) {
    //jika error
    res.status(400).json({msg: error.message});
  }
}