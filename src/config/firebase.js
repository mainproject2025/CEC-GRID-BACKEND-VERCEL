const admin = require("firebase-admin");

if (!admin.apps.length) {
  let serviceAccount;

  try {
    process.env.FIREBASE_SERVICE_ACCOUNT ? console.log("FIREBASE_SERVICE_ACCOUNT is set") : console.log("FIREBASE_SERVICE_ACCOUNT is not set");

    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } else {
      serviceAccount = require("../../serviceAccountKey.json");
    }
  } catch (error) {
    console.warn("Could not load Firebase credentials:", error.message);
  }

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    console.error("Firebase initialized without credentials! This will likely fail.");
  }
}

const db = admin.firestore();

module.exports = { admin, db };
