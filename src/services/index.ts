import axios from "axios"

export  const BASE_URL = 'https://vegasmapping.letsgetwebdesign.com/api/'
// const getCsrfToken = (): string => {
//     const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
//     if (!token) {
//       throw new Error("CSRF token not found");
//     }
//     return token;
//   };
//   console.log("getCsrfToken", )

const tokenXSRF = document.cookie
  .split('; ')
  .find((row) => row.startsWith('XSRF-TOKEN='))
  ?.split('=')[1];

interface props {
  path: string;
  isForm?: boolean;
  method?: string;
  url?: any;
  body?: any;
  token?: any;
  params?: any;
}

const apiCall = async ({
  path,
  method = 'GET',
  isForm,
  url = null,
  body = null,
  token = null,
  params = null,
}: props) => {
  let urlString = BASE_URL + path;
  let headers: any = {
    // 'X-CSRF-Token': getCsrfToken(),
    ...(isForm
      ? {'Content-Type': 'multipart/form-data',   'X-XSRF-TOKEN': tokenXSRF,
        'X-Requested-With': 'XMLHttpRequest',}
      : {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': tokenXSRF,
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
        }),
  };
  let options: any = {
    method,
  };
  if (token) headers['authorization'] = 'Bearer ' + token;
  options.headers = headers;
  if (body) options.data = body;
  console.log('path   : ', path);
  if (params) options.params = params;
  if (url) urlString = url;
  options.url = urlString;

  try {
    const response = await axios(options);

    if (response.data?.status_code === 401) {
        console.log('status code 401 error');
      // Handle 401 status code here
      // store.dispatch(logOut());
    }
    // console.log("Api res ==========>",  response.data)
    return response.data;
  } catch (error) {

    throw error;
  }
};

export default apiCall;
