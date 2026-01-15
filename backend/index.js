require("dotenv").config()
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { protect } = require("./middlewares/auth.middleware");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

const authRoutes = require("./routes/auth.routes");
const { generateInterviewQuestion, generateConceptExplaination } = require("./controllers/ai.controller");
const sessionRoutes = require("./routes/session.routes");
const questionRoutes = require("./routes/question.routes");
// routes

app.get("/",(req,res)=>{
  res.send("Server is running")
})

app.use("/api/auth", authRoutes) ;
app.use('/api/sessions', sessionRoutes);
app.use('/api/questions',questionRoutes);
app.use("/api/ai/generate-questions",protect, generateInterviewQuestion);
app.use("/api/ai/generate-explanation", protect,generateConceptExplaination);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server running on port " + process.env.PORT);
  connectDB()
});