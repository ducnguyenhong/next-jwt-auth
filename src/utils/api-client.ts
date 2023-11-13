interface ApiRequestConfig {
  url: string;
  baseURL?: string;
  params?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: any;
}

export const APIClient = {
  request: (config: ApiRequestConfig) => {
    const { url, params, method = 'GET', body, headers = {}, baseURL = process.env.NEXT_PUBLIC_DOMAIN } = config;

    let requestHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    let requestUrl = baseURL ? `${baseURL}/${url}` : url;

    if (params) {
      requestUrl = requestUrl + new URLSearchParams(params);
    }

    return fetch(requestUrl, { body, method, headers: requestHeaders })
      .then((response) => {
        const { status } = response;
        if (status < 200 || status >= 400) {
          throw new Error('Bad response from server frontend: ' + status);
        }
        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },

  upload: () => {}
};
