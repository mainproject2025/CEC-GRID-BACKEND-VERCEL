const admin = require("firebase-admin");

if (!admin.apps.length) {
  let serviceAccount;

  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // If running on Vercel or environment variable is set
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Fallback to local file (if it exists)
    try {
      serviceAccount = require("../../serviceAccountKey.json");
    } catch (error) {
      console.error("Error loading serviceAccountKey.json:", error);
      console.error("Please set FIREBASE_SERVICE_ACCOUNT environment variable or ensure the file exists.");
      // We might want to exit or let it fail later
    }
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

const db = admin.firestore();

module.exports = { admin, db };
