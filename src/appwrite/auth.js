import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  clint = new Client();
  account;

  constructor() {
    this.clint.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectID);
    this.account = new Account(this.clint);
  }

  async createAccount({ userName, email, password }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        userName,
        email,
        password
      );
      if (userAccount) {
        return this.loginUser({ email, password });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async grtCurrentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }

    return null;
  }

  async logOut() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
    }
  }
}

const authService = new AuthService();

export default authService;
