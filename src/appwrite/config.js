import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, fimage, status, userid }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          fimage,
          userid,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, fimage, status }) {
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          fimage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteDocument(slug) {
    try {
      await this.database.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async uplodeFile(file) {
    try {
      await this.bucket.createFile(conf.appwriteBucketID, ID.unique(), file);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async delefile(fileID) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  filePreview(fileID) {
    return this.bucket.getFilePreview(conf.appwriteBucketID, fileID);
  }
}

const databaseServices = new Services();

export default databaseServices;
