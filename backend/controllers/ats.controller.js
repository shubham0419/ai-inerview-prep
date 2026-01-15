const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
const { jsonrepair } = require("jsonrepair");
const { generalAtsPrompt, jobSpecificAtsPrompt } = require("../utils/prompts");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getGeneralAtsScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume (PDF)" });
    }

    const dataBuffer = req.file.buffer;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const prompt = generalAtsPrompt(resumeText);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    let rawText = completion.choices[0]?.message?.content || "";

    // Clean code blocks if present (though prompts ask for JSON)
    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Parse safely
    const data = JSON.parse(jsonrepair(cleanText));

    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};

const getJobSpecificAtsScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume (PDF)" });
    }
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res
        .status(400)
        .json({ message: "Please provide a job description" });
    }

    const dataBuffer = req.file.buffer;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    const prompt = jobSpecificAtsPrompt(resumeText, jobDescription);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    let rawText = completion.choices[0]?.message?.content || "";

    // Clean code blocks if present
    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Parse safely
    const data = JSON.parse(jsonrepair(cleanText));

    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error analyzing resume" });
  }
};

module.exports = { getGeneralAtsScore, getJobSpecificAtsScore };
