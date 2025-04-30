export class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(path) {
    return this.makeRequest("GET", path);
  }

  async post(path, body) {
    return this.makeRequest("POST", path, body);
  }

  async put(path, body) {
    return this.makeRequest("PUT", path, body);
  }

  async delete(path) {
    return this.makeRequest("DELETE", path);
  }

  async patch(path, body) {
    return this.makeRequest("PATCH", path, body);
  }

  async makeRequest(method, path, body = null, headers = {}) {
    const url = `${this.baseUrl}${path}`;
    const finalHeaders = {
      Accept: "application/json",
      ...(body && { "Content-Type": "application/json" }),
      ...headers,
    };

    const opts = {
      method,
      headers: finalHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };

    const response = await fetch(url, opts);
    let json;

    try {
      json = await response.json();
    } catch {
      // Handle non-JSON responses gracefully
      json = null;
    }

    if (!response.ok) {
      throw new Error(
        `API request failed:
        Method: ${method}
        URL: ${url}
        Status: ${response.status} ${response.statusText}
        Response: ${json || (await response.text())}
        Request Body: ${body ? JSON.stringify(body, null, 2) : "N/A"}`,
      );
    }

    return { response, body: json };
  }
}
