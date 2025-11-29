import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7268",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // if backend sends json error
    if (error.response && error.response.data) {
      const apiError = error.response.data;

      return Promise.reject({
        status: error.response.status,
        message: apiError.message || "Something went wrong.",
        detail: apiError.detail,
        traceId: apiError.traceId,
      });
    }

    // Network or unknown
    return Promise.reject({
      status: 0,
      message: "Network or server error.",
      detail: error.message,
    });
  }
);

export default axiosClient;
