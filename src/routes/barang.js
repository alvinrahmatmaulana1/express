const router = require('express').Router();
const { barang } = require('../controllers')

router.get('/',barang.getDataBarang);
// router.get('/:id',barang.getDatabarang);
router.post('/add',barang.addDataBarang);
router.put('/edit/:kode_barang',barang.editDataBarang);
router.delete('/delete/:kode_barang',barang.deleteDataBarang)

module.exports = router