const admin = require("firebase-admin");
const path = require("path");

const serviceAccountPath = path.resolve(process.env.FIREBASE_CREDENTIAL_PATH);
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
