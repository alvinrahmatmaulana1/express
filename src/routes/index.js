const router = require('express').Router();
const routebarang = require('./barang');

router.use('/barang',routebarang);


module.exports = router