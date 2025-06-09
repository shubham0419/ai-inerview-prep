const Question = require("../models/question.model");
const Session = require("../models/session.model");



exports.addQuestionsToSession = async (req,res) => {
  try {
    const {sessionId,questions} = req.body;
    if(!sessionId || !questions) {
      return res.status(400).json({message: 'Invalid input data'});
    }
    const session = await Session.findById(sessionId);
    if(!session) {
      return res.status(404).json({message: 'Session not found'});
    }

    const createQuestions = await Question.insertMany(
      questions.map((q)=>({
        session:sessionId,
        question:q.question,
        answer:q.answer
      }))
    )

    session.questions.push(...createQuestions.map(q=>q._id));
    await session.save();
    return res.status(201).json({message: 'Questions added to session successfully',questions:createQuestions,success:true});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.togglePinQuestion = async (req,res) => {
  try {
    const {id} = req.params;
    const question = await Question.findById(id);
    if(!question) {
      return res.status(404).json({message: 'Question not found'});
    }
    question.isPinned = !question.isPinned;
    await question.save();
    return res.status(200).json({message: 'Question pinned status updated successfully',success:true,question});
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

exports.updateQuestionNote = async (req,res) => {
  try {
    const {note} = req.body;
    const {questionId} = req.params;
    const question = await Question.findById(questionId);
    if(!question) {
      return res.status(404).json({message: 'Question not found'});
    }
    question.note = note;
    await question.save();
    return res.status(200).json({message: 'Question note updated successfully',success:true,question})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}