interface ApiRequestConfig {
  url: string;
  baseURL?: string;
  params?: Record<string, any>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  headers?: any;
}

export const APIServer = {
  request: (config: ApiRequestConfig) => {
    const {
      url,
      baseURL = process.env.NEXT_API_DOMAIN_BACKEND,
      params,
      method = 'GET',
      body,
      headers = {
        'Content-Type': 'application/json'
      }
    } = config;

    let requestUrl = baseURL ? `${baseURL}/${url}` : url;

    if (params) {
      requestUrl = requestUrl + new URLSearchParams(params);
    }

    return fetch(requestUrl, { body, method, headers })
      .then((response) => {
        const { status } = response;
        if (status < 200 || status >= 400) {
          throw new Error('Bad response from server backend: ' + status);
        }

        return response;
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
};
