const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const connection = mysql.createConnection(config);
connection.connect();

const app = express()

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

const getDataBarang = async (req,res) => {
    try{
        const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM barang' , function(error,rows){
            if(rows){
                resolve(rows);
            } else{
                reject([]);
            }
        });
    });

    if (req.session.loggedin){
        res.send({
            success: true,
            message: 'Berhasil ambil data',
            data : data
        });
    } else {
        res.send({
            success: false,
            message: 'Silahkan Login Terlebih dahulu',
    })
}
}
    catch (error) {
       //console.log(error);
        res.send({
            success: false,
            message: error.stack,
        });
    }
};
const addDataBarang = async (req,res) => {
    let total = req.body.harga * req.body.jumlah
    if(total >= 100000){
         potongann = 10000
    }
    else{
         potongann = 0
    }
    let total_harga = total - potongann
    let data ={
        nama_barang : req.body.nama,
        harga : req.body.harga,
         jumlah : req.body.jumlah,
         potongan : potongann,
         total_harga : total_harga
         
    }
    try{
        const result = await new Promise((resolve,reject) => {
        connection.query('INSERT INTO barang SET ?;',[data] , function(error,rows){
            if(rows){
                resolve(true)
            } else{
                reject(false)
            }
        })
    })
    if (result){
        res.send({
            success: true,
            message: 'Berhasil tambah data',
        })
    }
}
  catch (error) {
        res.send({
            success: false,
            message: error.stack,
        });
    }
}

const editDataBarang = async (req,res) => {
    let kode_barang = req.params.kode_barang
    let total = req.body.harga * req.body.jumlah
    if(total >= 100000){
         potongann = 10000
    }
    else{
         potongann = 0
    }
    let total_harga = total - potongann
    let data ={
         nama_barang : req.body.nama,
         harga : req.body.harga,
         jumlah : req.body.jumlah,
         potongan : potongann,
         total_harga : total_harga
    }
    
    try{
        const result = await new Promise((resolve,reject) => {
        connection.query('UPDATE barang SET ? WHERE kode_barang = ?;',[data,kode_barang] , function(error,rows){
            if(rows){
                resolve(true)
            } else{
                reject(false)
            }
        })
    })
    if (result){
        res.send({
            success: true,
            message: 'Berhasil edit data',
        })
    
    } }
    catch(error) {
        res.send({
            success: false,
            message: error.stack,
        });
    }
}

const deleteDataBarang = async (req,res) => {
    let kode_barang = req.params.kode_barang

    try{
        const result = await new Promise((resolve,reject) => {
        connection.query('DELETE FROM barang WHERE kode_barang = ?',[kode_barang] , function(error,rows){
            if(rows){
                resolve(true)
            } else{
                reject(false)
            }
        })
    })
    if (result){
        res.send({
            success: true,
            message: 'Berhasil hapus data',
        })
    }
}
     catch(error) {
        res.send({
            success: false,
            message: error.stack,
        });
    }
}

// const getDatabarang = async (req,res) => {
//     const data = await new Promise((resolve,reject) => {
//         let kode_barang = req.params.id
//         connection.query('SELECT * FROM artikel WHERE kode_barang = ?' ,[kode_barang], function(error,rows){
//             if(rows){
//                 resolve(rows)
//             } else{
//                 reject([])
//             }
//         })
//     })
//     if (data){
//         res.send({
//             success: true,
//             message: 'Berhasil ambil data',
//             data : data
//         })
//     } else {
//         res.send({
//             success: false,
//             message: 'Gagal Ambil Data',
//         });
//     }
// };

module.exports ={
 getDataBarang,
 addDataBarang,
 editDataBarang,
 deleteDataBarang,
//  getDatabarang
}