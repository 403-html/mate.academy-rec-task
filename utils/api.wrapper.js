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
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    };
  
    const opts = { method, headers: finalHeaders };
    if (body !== null) {
      opts.body = JSON.stringify(body);
    }
  
    const response = await fetch(url, opts);
    const text = await response.text();
    let json;
    try { json = JSON.parse(text); } catch { json = null; }
  
    if (!response.ok) {
      throw new Error(
        `API request failed:
        ${method} ${url} — ${response.status} ${response.statusText}
        Response body: ${text}
        Request body: ${JSON.stringify(body, null, 2)}`
      );
    }
  
    return { response, body: json };
  }  
}
