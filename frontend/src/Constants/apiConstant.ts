

export default class API_CONSTANTS  {
  static API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"
  static register =  this.API_BASE_URL+"/api/auth/register";
  static login = this.API_BASE_URL+"/api/auth/login";
  static uploadImage = this.API_BASE_URL+"/uploads";
  static getProfile = this.API_BASE_URL+"/api/auth/profile";
}
