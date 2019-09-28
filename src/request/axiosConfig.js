import axios from 'axios';
import configs from 'configs';
import NProgress from 'nprogress';
import localForage from 'utils/localForageConfig';
import logOut from 'utils/logout';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  // withCredentials:true
  // validateStatus: function (status) {
  //   return status > 666;
  // },

});

const {
  prefix,
  iamPrefix,
} = configs.API[webpack.API_ENV || 'development'];

function isHttpUrl(input) {
  return /^https?:\/\//.test(input);
}

function isIamUrl(input) {
  return /^(sso|iam|iam-.*|company-authority)\//.test(input);
}

async function request(config) {
  NProgress.start();
  // config.headers[authToken] = await localForage.getItem(authToken);


  const input = config.url;
  if (isHttpUrl(input)) config.url = input;

  else if (isIamUrl(input)) config.url = `${iamPrefix}${input}`;

  else config.url = `${prefix}${input}`;
  return config;
}

function useOrigin(res) {
  return res.config.useOrigin;
}

function requestError(rejection) {
  return useOrigin(rejection)
    ? Promise.reject(rejection)
    : Promise.reject(rejection.data);
}

function isPlainRequest(input) {
  return /\.(html?|xml|txt)$/.test(input);
}

function showResponseError(msg, duration) {
  // notification.error({
  //   message: '操作失败',
  //   description: msg,
  // });
}

function response(responseObj) {
  NProgress.done();
  if (responseObj.data.code && responseObj.data.code !== 0) {
    showResponseError(`统一权限系统:${responseObj.data.message}`);
    if (responseObj.data.code === '10042') {
      logOut();
    }
    return false;
  }
  return isPlainRequest(responseObj.config.url) || useOrigin(responseObj)
    ? responseObj
    : responseObj.data;
}

function getResponseError(input, unfeedback) {
  return {
    '-1': '服务器异常，请联系网站管理员',
    401: '您的会话已过期，请重新登录',
    403: '您的权限受到限制，请咨询管理员获取权限',
    404: '错误的参数或请求地址，请检查',
    500: '服务器内部错误',
  }[input] || unfeedback;
}

function responseError(error) {
  NProgress.done();
  let rejection;
  if (error.response) {
    const {
      data,
    } = error.response;
    rejection = Promise.reject(data);
    const unfeedback = data.message || data.error;
    const errorMessage = getResponseError(data.status, unfeedback);
    showResponseError(errorMessage);

    if (error.response.status === '401') {
      logOut();
    }
  } else {
    showResponseError('无法获取到服务器信息,请联系管理员');
    rejection = Promise.reject(error);
  }
  return rejection;
}


axiosInstance.defaults.timeout = 60 * 1000;
axiosInstance.interceptors.request.use(request, requestError);
axiosInstance.interceptors.response.use(response, responseError);

export default axiosInstance;
