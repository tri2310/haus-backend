import Kupon from "../models/KuponModel.js";


export const getKupon = async(req, res)=> {
  try {
    const response = await Kupon.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
}


export const getKuponById = async(req, res)=> {
  try {
    const response = await Kupon.findOne({
      where: {
        id: req.params.id
      }
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const saveKupon = async(req, res)=> {
 
const value = 'HAUS-' +  Math.random();
const name = req.body.name;
const id_produk= req.body.id_produk;
const code = value;
const diskon = req.body.diskon;
const expired = req.body.expired;

try {
  await Kupon.create({
     name:name, code:code, diskon:diskon, id_produk:id_produk, expired: expired, 
  });
  res.status(201).json({msg: "Kupon Created Successfully"});
} catch (error) {
  console.log(error.message);
}

}

export const updateKupon = async(req, res)=> {
  const kupon = await Kupon.findOne({
    where: {
      id: req.params.id
    }
  });
  if(!kupon) return res.status(404).json({msg: "No Data Found"});

  const name = req.body.name;
  const diskon = req.body.diskon;
  const id_produk = req.body.id_produk;
  const expired = req.body.expired;

  try {
    await Kupon.update({
      name:name,
      diskon: diskon,
      id_produk: id_produk,
      expired: expired
    })
  } catch (error) {
    console.log(error.message);
  }
}


export const deleteKupon = async(req, res)=> {
  const kupon =  await Kupon.findOne({
    where:{
      id: req.params.id
    }
  });
  if(!kupon) return res.status(404).json({
    msg: "No data found!"
  });
  try {
    await Kupon.destroy({
      where: {
        id: req.params.id
      }
    }); 
    res.status(200).json({
      msg: "Kupon Deleted Successfully"
    });
  } catch (error) {
    console.log(error.message);
  }
}
