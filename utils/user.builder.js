import { ApiClient } from "./api.wrapper";

import { config } from "dotenv";
config()

export class UserBuilder {
  constructor() {
    this.apiClient = new ApiClient(process.env.API_URL);
    this.user = {
      username: "",
      email: "",
      password: "",
    };
  }

  withUsername(username) {
    this.user.username = username;
    return this;
  }

  withEmail(email) {
    this.user.email = email;
    return this;
  }

  withPassword(password) {
    this.user.password = password;
    return this;
  }

  async build() {
    const registerResponse = await this.apiClient.post("/users", {
      user: {
          username: this.user.username,
          email: this.user.email,
          password: this.user.password,
        },
    });
    const { user } = registerResponse.body;
    // Get effectiveImage for the user (used in local storage)
    const profileResponse = await this.apiClient.get(
      `/profiles/${this.user.username}`,
    );
    const { profile } = await profileResponse.body;
    user.effectiveImage = profile.image;
    return {
      init: {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      },
      user
    }
  }
}