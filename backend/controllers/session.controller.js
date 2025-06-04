const Session = require("../models/session.model");
const Question = require("../models/question.model");


exports.createSession = async(req,res) =>{
  try {
    const {role,experience,topicToFocus,description,questions} = req.body;
    const userId = req.user._id;


    const session = await Session.create({
      user:userId,
      role,
      experience,
      topicToFocus,
      description,
    })
    const questionsDocs = await Promise.all(
      questions.map(async (q)=>{
        const question = await Question.create({
        session:session._id,
        question:q.question,
        answer:q.answer
      })
      return question._id;
      })
    );
    session.questions = questionsDocs;
    await session.save();
    res.status(201).json({success:true,session});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"})
  }
}

exports.getMySessions = async(req,res) =>{
  try {
    const sessions = await Session.find({user:req.user._id}).sort({createdAt:-1}).populate("questions");
    res.status(200).json({success:true,sessions});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"})
  }
}

exports.getSessionById = async(req,res) =>{
  try {
    const session = await Session.findById(req.params.id).populate({path:"questions",options:{sort:{isPinned:-1,createdAt:-1}}}).exec();
    if(!session){
      return res.status(404).json({success:false,message:"Session not found"})
    }
    res.status(200).json({success:true,session});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"})
  }
}

exports.deleteSession = async(req,res) =>{
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if(!session){
      return res.status(404).json({success:false,message:"Session not found"})
    }
    if(session.user.toString() !== req.user._id){
      return res.status(403).json({success:false,message:"You are not authorized to delete this session"})
    }
    await Question.deleteMany({session:req.params.id});
    await Session.deleteOne({_id:session._id});
    res.status(200).json({success:true,message:"Session deleted successfully"});
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false,message:"Server Error"})
  }
}