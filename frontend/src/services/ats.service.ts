import axiosObject from "./axios.service";

const atsService = {
  getGeneralScore: async (formData: FormData) => {
    const response = await axiosObject.post("/api/ats/general", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getJobSpecificScore: async (formData: FormData) => {
    const response = await axiosObject.post("/api/ats/job-specific", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default atsService;
