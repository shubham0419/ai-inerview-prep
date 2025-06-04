

export default class API_CONSTANTS  {
  static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"
  // Auth
  static register =  this.API_BASE_URL+"/api/auth/register";
  static login = this.API_BASE_URL+"/api/auth/login";
  static uploadImage = this.API_BASE_URL+"/api/auth/upload-image";
  static getProfile = this.API_BASE_URL+"/api/auth/profile";

  // AI
  static generateQuestions = this.API_BASE_URL + "/api/ai/generate-questions"
  static generateExplaination = this.API_BASE_URL + "/api/ai/generate-explaination"

  // Session
  static createSession = this.API_BASE_URL + "/api/sessions/create"
  static getAllSessions = this.API_BASE_URL + "/api/sessions/my-sessions"
  static getOneSession = this.API_BASE_URL + "/api/sessions/<ID>"
  static deleteSession = this.API_BASE_URL + "/api/sessions/<ID>" 

  // Question
  static addToSession = this.API_BASE_URL + "/api/questions/add"
  static pinQuestion = this.API_BASE_URL + "/api/questions/<ID>/pin"
  static updateNote = this.API_BASE_URL + "/api/questions/<ID>/note"

}
