import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL

export const LOGOUT_USER: string = `${baseURL}`;
export const REFRESH_TOKEN: string = `${baseURL}`;

export const authApi = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    timeoutErrorMessage: 'Server timeout'
})


// Request interceptor
axios.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
      if (config.url !== REFRESH_TOKEN) {
        //todo : change this localstorage
        const localStorageValue = localStorage.getItem("userInfo");
        if (localStorageValue) {
          let userInfo = JSON.parse(localStorageValue || "");
          const { access } = userInfo;
          config.headers = {
            Authorization: `Bearer ${access}`, // todo: add timezone here
          };
        }
      }
  
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  // Response interceptor
axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Modify response data if needed
      return Promise.resolve(response);
    },
    async (error: AxiosError) => {
      const originalConfig = error.config as AxiosRequestConfig;
      if (
        error.response?.status === 401 ||
        (error.response?.status === 401 && error.config?.url !== LOGOUT_USER)
      ) {
        let newToken = await refreshToken();
        let userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
        userInfo.access = newToken;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        originalConfig.headers = {
          ...originalConfig.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return axios(originalConfig);
      } else {
        let errorText = await getAllErrors(error);
        if (errorText.includes("refresh: Invalid token or token expired")) {
          localStorage.removeItem("userInfo");
          window.location.reload();
        } else {
          // displayError(errorText);
        }
        return Promise.reject(errorText);
      }
    }
  );

  //need to modify according to errors

  async function getAllErrors(errors: AxiosError) {
    const message: any = errors.response?.data;
    let errorMessage = "";
    try {
      if (typeof message === "string") {
        errorMessage = message;
      } else if (typeof message === "object") {
        if (Array.isArray(message)) {
          message.forEach((x, index) => {
            let keys = Object.keys(x);
            keys.forEach((element) => {
              errorMessage += ` ${element}: ${message[index][element]}`;
            });
          });
        } else {
          let keys = Object.keys(message);
          keys.forEach((element) => {
            errorMessage += ` ${element}: ${message[element]}`;
          });
        }
      }
    } catch (error) {
      errorMessage = "Something went wrong, Please try again later."; // TODO just to know if we missed any of error handling here
    }
  
    return errorMessage;
  }
  
  // Define a function to refresh the token
  async function refreshToken() {
    try {
      let userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
      const { refresh } = userInfo;
      const response = await axios.post(REFRESH_TOKEN, {
        refresh: refresh,
      });
      const newAccessToken = response.data.access;
      return newAccessToken;
    } catch (error) {
      // TODO Redirect user to login page
    }
  }