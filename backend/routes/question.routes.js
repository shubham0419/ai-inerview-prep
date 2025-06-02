const express = require('express');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();


router.post("/add",protect,);
router.post("/:id/pin",protect,);
router.post("/:id/note",protect,);




module.exports=router