// Firebase setup
const { use } = require('../routes/auth');
const {auth, admin, db, bucket} = require("../firebaseSetup/firebase")

// Routes

const login = async (req, res) => {

    const user = auth.getAuth().currentUser;

    auth.signInWithEmailAndPassword(auth.getAuth(), req.body.email, req.body.password)
        .then((userCredential)=>{
            res.status(200).send("User successfully logged in")
        })
        .catch((err) => {
            res.send(err)
        })
};

const signup = async (req, res) => {

    const user = auth.getAuth().currentUser;

    // check if a user is already logged in
    if(user){
        res.status(401).send("A user is already logged in")
    }
    else{
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
    }
};

const logout = async (req, res) => {

    auth.signOut(auth.getAuth())
    .then(() => {
        res.send("Logged out")
    })
    .catch((err)=>{
        res.send(err)
    })
};

module.exports = { login, signup, logout };
