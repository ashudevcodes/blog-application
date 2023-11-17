const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITER_URL),
  appwriteProjectID: String(import.meta.env.VITE_APPWRITER_PROJECT_ID),
  appwriteCollectionID: String(import.meta.env.VITE_APPWRITER_COLLECTION_ID),
  appwriteDatabaseID: String(import.meta.env.VITE_APPWRITER_DATABASE_ID),
  appwriteBucketID: String(import.meta.env.VITE_APPWRITER_BUCKET_ID),
};

export default conf