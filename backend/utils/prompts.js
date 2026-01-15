const questionAnswerPromt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `
  You are an AI trained to generate technical interview questions and answers.

  Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Write ${numberOfQuestions} interview questions.
  - For each question, generate a detailed but beginner-friendly answer.
  - If the answer needs a code example, add it in a separate "code" field.
  - Keep formatting very clean.
  - Return a pure JSON object like:
  {
    "questions": [
      {
        "question": "Question here?",
        "answer": "Answer here (without code).",
        "code": "Optional code example here"
      },
      ...
    ]
  }
  Important: Do NOT add any extra text. Only return valid JSON.`;

const conceptExplainPromt = (question) => `
  You are an AI Leaned to generate explanations for a given interview question.

  Task:
  - Explain the following interview question and its concept in depth as if you're teaching a beginner developer.
  - Question: "${question}"
  - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
  - If the explanation includes a code example, put it in a separate "code" field.
  - IMPORTANT: Since you are outputting JSON, ensure all double quotes inside the strings are escaped (e.g., \") and newlines are properly escaped (e.g., \n or \\n).
  - Keep the formatting very clean and clear.
  - Return the result as a valid JSON object in the following format:
  {
    "title": "Short title here?",
    "explanation": "Explanation without the code example.",
    "code": "Optional code example here (or null if none)"
  }
  Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.`;

const generalAtsPrompt = (resumeText) => `
  You are an expert ATS (Applicant Tracking System) scanner and Resume Coach.

  Task:
  - Analyze the following resume text.
  - Provide a score out of 100 based on formatting, content quality, and impact.
  - Identify missing skills or sections.
  - Provide actionable suggestions to improve the resume.
  - Return the result as a valid JSON object in the following format:
  {
    "score": 85,
    "missingSkills": ["Item 1", "Item 2"],
    "suggestions": ["Tip 1", "Tip 2"],
    "summary": "A brief summary of the resume's strength."
  }
  
  Resume Text:
  "${resumeText}"

  Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.`;

const jobSpecificAtsPrompt = (resumeText, jobDescription) => `
  You are an expert ATS (Applicant Tracking System) scanner.

  Task:
  - Analyze the resume against the provided Job Description (JD).
  - Provide a match percentage score out of 100.
  - Identify keywords/skills from the JD that are missing in the resume.
  - Provide suggestions on how to tailor the resume for this specific job.
  - Return the result as a valid JSON object in the following format:
  {
    "score": 75,
    "matchPercentage": 75,
    "missingKeywords": ["Keyword 1", "Keyword 2"],
    "suggestions": ["Tip 1", "Tip 2"]
  }

  Job Description:
  "${jobDescription}"

  Resume Text:
  "${resumeText}"

  Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.`;

module.exports = {
  questionAnswerPromt,
  conceptExplainPromt,
  generalAtsPrompt,
  jobSpecificAtsPrompt,
};
