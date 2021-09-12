// Firebase setup
const { initializeApp } = require('firebase/app')
const { use } = require('../routes/auth');

// Firebase authentication setup
const auth = require('firebase/auth');

const {firebaseConfig} = require('./firebaseConfig')

initializeApp(firebaseConfig);

// Firebase Database and Storage setup

var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL
});

const db = admin.firestore()
const bucket = admin.storage().bucket();

const storage = require("firebase/storage");

module.exports = {auth, admin, db, bucket, storage}

