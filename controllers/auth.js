// Firebase setup
const { use } = require('../routes/auth');
const {auth, admin, db, bucket} = require("../firebaseSetup/firebase")

// Routes

const login = async (req, res) => {

    auth.signInWithEmailAndPassword(auth.getAuth(), req.body.email, req.body.password)
        .then((userCredential)=>{
            res.status(200).send("User successfully logged in")
        })
        .catch((err) => {
            res.status(401).send(err)
        })
};

const signup = async (req, res) => {

    auth.createUserWithEmailAndPassword(auth.getAuth(),req.body.email, req.body.password)
        .then(async (userCredential) => {
        const docRef = db.collection('users').doc(userCredential.user.uid);

        await docRef.set({
            imageDesc: [],
            imageName: []
            })
        res.status(200).send("User successfully logged in")
        })
        .catch((error) => {
          res.status(400).send(error)
        });
};

const logout = async (req, res) => {

    auth.signOut(auth.getAuth())
    .then(() => {
        res.status(201).send("Logged out")
    })
    .catch((err)=>{
        res.status(401).send(err)
    })
};

module.exports = { login, signup, logout };
