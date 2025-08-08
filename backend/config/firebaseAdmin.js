const admin = require("firebase-admin");
const path = require("path");

if (!process.env.FIREBASE_CREDENTIAL_PATH) {
  throw new Error("FIREBASE_CREDENTIAL_PATH is not set in environment variables");
}

const serviceAccount = require(path.resolve(process.env.FIREBASE_CREDENTIAL_PATH));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;