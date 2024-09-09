import axios from 'axios';
export const BASE_URL = 'https://vegasmapping.letsgetwebdesign.com/api';

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
        ...(isForm
            ? { 'Content-Type': 'multipart/form-data' }
            : {
                'Content-Type': 'application/json',
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
        console.log('error: ', error);
        throw error;
    }
};

export default apiCall;
