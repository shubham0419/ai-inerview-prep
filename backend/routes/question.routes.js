const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { togglePinQuestion, addQuestionsToSession, updateQuestionNote } = require('../controllers/question.controller');

const router = express.Router();


router.post("/add",protect,addQuestionsToSession);
router.get("/:id/pin",protect,togglePinQuestion);
router.post("/:id/note",protect,updateQuestionNote);




module.exports=router