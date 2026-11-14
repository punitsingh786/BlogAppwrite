import conf from "../conf/conf";
import { Client, TablesDB, Storage, Query, ID, Permission, Role } from "appwrite";

// Everyone can read; only the owner can change or delete
// (admins are given access through table/bucket permissions in the Appwrite console)
const ownerPermissions = (userId) => [
  Permission.read(Role.any()),
  Permission.update(Role.user(userId)),
  Permission.delete(Role.user(userId)),
];

export class Service {
  client = new Client();
  tablesDB;
  storage; // bucket

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.storage = new Storage(this.client);
  }

  // ---------- post (row) services ----------

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
        permissions: ownerPermissions(userId),
      });
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      // Only send fields that have a value, so an unchanged image isn't wiped
      const data = { title, content, status };
      if (featuredImage) data.featuredImage = featuredImage;

      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data,
      });
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return null;
    }
  }

  // Returns { rows, total } or null on error
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries,
      });
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return null;
    }
  }

  // ---------- file (storage) services ----------

  async uploadFile(file, userId) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
        permissions: ownerPermissions(userId),
      });
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  // getFileView works on every Appwrite plan (getFilePreview needs image
  // transformations, which are not available on the free plan).
  getFileView(fileId) {
    return this.storage.getFileView({
      bucketId: conf.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;
