class HttpError extends Error {
  constructor(message, status, url) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

class PromiseHttpClient {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.defaultHeader = {
      "Content-Type": "application/json",
    };
  }

  async request(endpoint, options = {}) {
    const url = this.baseUrl + this.endpoint;
    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new HttpError(
          `HTTP ${response.status} ${response.statusText}`,
          response.status,
          url,
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        return await response.json();
      }

      return await response.text();
    } catch (error) {
      if (error instanceof HttpError) {
        throw error;
      }

      throw new HttpError("Network error", 0, url);
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "GET" });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: "DELETE" });
  }
}

export { PromiseHttpClient, HttpError };
export default PromiseHttpClient;
