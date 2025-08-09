const admin = require("firebase-admin");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else if (process.env.FIREBASE_CREDENTIAL_PATH) {
  serviceAccount = require(require("path").resolve(process.env.FIREBASE_CREDENTIAL_PATH));
} else {
  throw new Error("Firebase credentials not found in env vars or file path.");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
