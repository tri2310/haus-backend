import Users from '../models/UserModel.js';

export const verifyUser = async(req, res, next) => {
   if(!req.session.userId){ 
    return res.status(401).json({msg: "Mohon login ke akun anda!"});
  }
  //jika terdapat session di database
   const user = await  Users.findOne({
      where: {
        //cari usernya berdasarkan uuid di dalam userId
        uuid: req.session.userId,
      }
    });
    //jika usernya tidak ditemukan
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    //jika terdapat user maka mereturn dan parsing ke dalam json
    req.userId = user.id;
    req.role = user.role;
    next();
}

export const adminOnly = async(req, res, next) => {
   
   const user = await  Users.findOne({
      where: {
        //cari usernya berdasarkan uuid di dalam userId
        uuid: req.session.userId,
      }
    });
    
    if(!user) return res.status(404).json({msg: "User tidak ditemukan!"});
    if(user.role !== "admin") return res.status(403).json({msg: "Akses terlarang!"});
    next();
}