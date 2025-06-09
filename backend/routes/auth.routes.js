const express = require("express");
const {registerUser,loginUser,getUserProfile,} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cloudinary = require("../utils/cloudImage")


router.post("/register", registerUser); // Register User
router.post("/login", loginUser);// Login User
router.get("/profile", protect, getUserProfile); // Get User Profile

router.post("/upload-image", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  try {
    // Upload buffer to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", error });
        }
        res.status(200).json({ imageUrl: result.secure_url });
      }
    );
    result.end(req.file.buffer);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed", error: err.message});
  }
});

module.exports = router;