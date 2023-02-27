import Product from "../models/ProdukModel.js";
import path from "path";
import fs from "fs";
 
export const getProducts = async(req, res)=>{
    try {
        const response = await Product.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const getProductById = async(req, res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
 
export const saveProduct = (req, res)=>{
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});

    const name = req.body.name;
    const kategori_id = req.body.kategori_id;
    const harga_small = req.body.harga_small;
    const harga_medium = req.body.harga_medium;
    const harga_large = req.body.harga_large;
    const file = req.files.image;
    const filess = req.files.image2;
    const position = req.body.position;
    
   
    const ext = path.extname(file.name);
    const exts = path.extname(filess.name);
    const fileName = file.md5 + ext;
    const fileNames = filess.md5 + exts;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileNames}`;
   
 
   
    
    filess.mv(`./public/images/${fileNames}`, async(err)=>{
             
         })
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({position: position,
                 name: name,
                  harga_small: harga_small,
                 harga_medium:harga_medium,
                 harga_large: harga_large,
                  image: fileName,image2: fileNames,
                   url: url,
                    url2: url2});
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
 
}
 
export const updateProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
     
    let fileNames = "";
    let fileName = "";


    if(req.filess === null){
        fileNames = product.image2;
    }else{
        const filess = req.filess.image2;
        const ext = path.extname(filess.name);
        fileNames = filess.md5 + ext;
    }


    if(req.files === null){
        fileName = product.image;
    }else{
        const file = req.files.image;
       
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        
 
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);

        filess.mv(`./public/images/${fileNames}`,(err)=>{
             
         })
 
        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg: err.message});
        });
    }
    const name = req.body.name;
    const position = req.body.position;
    const harga_small = req.body.harga_small;
    const harga_medium = req.body.harga_medium;
    const harga_large= req.body.harga_large;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${fileNames}`;
     
    try {
        await Product.update({position: position,name: name,harga_small: harga_small,harga_medium:harga_medium,harga_large:harga_large, kategori_id:kategori_id, image: fileName,image2: fileNames, url: url, url2:url2},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product Updated Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const deleteProduct = async(req, res)=>{
    const product = await Product.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
 
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "Product Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}