import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Sign up, then log the user in straight away
  async createAccount({ email, password, name }) {
    const userAccount = await this.account.create(
      ID.unique(),
      email,
      password,
      name
    );
    if (userAccount) {
      return this.login({ email, password });
    }
    return userAccount;
  }

  async login({ email, password }) {
    return await this.account.createEmailPasswordSession(email, password);
  }

  // Returns the logged-in user, or null if nobody is logged in
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch {
      return null;
    }
  }

  async logout() {
    await this.account.deleteSession({ sessionId: "current" });
  }
}

const authService = new AuthService();

export default authService;