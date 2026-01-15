const { jsonrepair } = require("jsonrepair");
const Groq = require("groq-sdk");
const {
  questionAnswerPromt,
  conceptExplainPromt,
} = require("../utils/prompts");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    const prompt = questionAnswerPromt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

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

    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Parse JSON safely using jsonrepair
    const jsonResponse = JSON.parse(jsonrepair(cleanText));
    let data;

    // Handle extraction and recombination of code
    if (jsonResponse.questions) {
      data = jsonResponse.questions.map((q) => ({
        question: q.question,
        answer: q.code
          ? `${q.answer}\n\nCode Example:\n\`\`\`\n${q.code}\n\`\`\``
          : q.answer,
      }));
    } else {
      // Fallback if structure is unexpected
      data = jsonResponse;
    }

    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating interview question" });
  }
};

const generateConceptExplaination = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Please provide a question" });
    }
    const prompt = conceptExplainPromt(question);

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

    const cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    // Parse JSON safely using jsonrepair
    const jsonResponse = JSON.parse(jsonrepair(cleanText));

    // Combine explanation and code
    const data = {
      title: jsonResponse.title,
      explanation: jsonResponse.code
        ? `${jsonResponse.explanation}\n\nCode Example:\n\`\`\`\n${jsonResponse.code}\n\`\`\``
        : jsonResponse.explanation,
    };

    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating concept explanation" });
  }
};

module.exports = { generateInterviewQuestion, generateConceptExplaination };
