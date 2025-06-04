const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { getMySessions, createSession, getSessionById, deleteSession } = require("../controllers/session.controller");
const router = express.Router();

router.post("/create",protect,createSession);
router.get("/my-sessions",protect,getMySessions);
router.get("/:id",protect,getSessionById);
router.delete("/:id",protect,deleteSession);

module.exports = router;