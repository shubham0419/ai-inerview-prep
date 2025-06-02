import API_CONSTANTS from "@/Constants/apiConstant";
import axios from "./axios.service";


export default class AuthService {
  static login = (payload: authInputType) => {
    return new Promise<authRes>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.login,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as authRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static register = (payload: authInputType) => {
    return new Promise<authRes>(async (resolve, reject) => {
      try {
        const res = await axios.post(API_CONSTANTS.register,payload);
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as authRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  };

  static uploadImage = (image:File)=>{
    return new Promise<imageUploadRes>(async (resolve, reject) => {
      const formData = new FormData();
      formData.append('image', image);
      try {
        const res = await axios.post(API_CONSTANTS.uploadImage,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as imageUploadRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  }

  static getCurrentUser = ()=>{
    return new Promise<authRes>(async (resolve, reject) => {
      try {
        const res = await axios.get(API_CONSTANTS.getProfile)
        if (res?.data?.status == "failed") throw res.data.message;
        return resolve(JSON.parse(JSON.stringify(res.data)) as authRes);
      } catch (error: any) {
        return reject(error);
      }
    });
  }

}