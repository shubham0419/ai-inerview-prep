const {GoogleGenAI} = require("@google/genai");
const { questionAnswerPromt, conceptExplainPromt } = require("../utils/prompts");


const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});


const generateInterviewQuestion = async (req,res)=>{
  try {
    const {role,experience,topicsToFocus,numberOfQuestions} = req.body;
    const prompt = questionAnswerPromt(role,experience,topicsToFocus,numberOfQuestions);
    const response = await ai.models.generateContent({
      model:'gemini-2.0-flash-lite',
      contents:prompt
    })
    let rawText = response.text;

    const cleanText = rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();
    const data = JSON.parse(cleanText);
    res.json({data});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error generating interview question"});
  }
}

const generateConceptExplaination = async (req,res)=>{
  try {
    const {question} = req.body;
    if(!question){
      return res.status(400).json({message:"Please provide a question"});
    }
    const prompt = conceptExplainPromt(question);
    const response = await ai.models.generateContent({
      model:'gemini-2.0-flash-lite',
      contents:prompt
    })
    let rawText = response.text;

    const cleanText = rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim();
    const data = JSON.parse(cleanText);
    res.json({data});
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Error generating concept explanation"});
  }
}

module.exports = {generateInterviewQuestion,generateConceptExplaination}