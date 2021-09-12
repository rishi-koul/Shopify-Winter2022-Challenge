const {auth, admin, db, bucket, storage} = require("../firebaseSetup/firebase")
const saltedMd5=require('salted-md5')
const path=require('path');
const { getStorage } = require("@firebase/storage");

// Routes
const getImages = async (req, res) => {

    const user = auth.getAuth().currentUser;

    if(user){
        try {
            const docRef = db.collection('users').doc(user.uid);
            const data = await docRef.get()

            res.status(200).send(data.data());

        } catch (error) {
            res.send(error)
        }
    }else{
        res.status(404).send("Pls login first")
    }

};

const upload = async (req, res) => {

    const user = auth.getAuth().currentUser;

    if(user){
        if(req.file && req.body.desc){
            const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
            const fileName = name + path.extname(req.file.originalname)
            await bucket.file(fileName).save(req.file.buffer)
    
            const docRef = db.collection('users').doc(user.uid);
    
            await docRef.update({imageDesc: admin.firestore.FieldValue.arrayUnion(req.body.desc)})
            await docRef.update({imageName: admin.firestore.FieldValue.arrayUnion(fileName)})
    
            res.send('Image Succesfullly Uploaded');
        }else{
            res.send("One or more argumnets missing")
        }
    }else{
        res.status(404).send("Pls login first")
    }

};

const download = async (req, res) => {

    const user = auth.getAuth().currentUser;

    if(user){
        if(req.body.imageName){
            storage.getDownloadURL(storage.ref(getStorage(), req.body.imageName))
            .then( (url) => {
                res.status(200).send(url)
            })
            .catch(err => {
                res.status(400).send(err)
            })
        }
        else{
            res.send("One or more argumnets missing")
        }
    }else{
        res.status(404).send("Pls login first")
    }

};

const deleteImage = async (req, res) => {

    const user = auth.getAuth().currentUser;

    if(user){
        if(req.body.imageName){
            try {
                const docRef = db.collection('users').doc(user.uid);
                const data = await docRef.get()
                
                var index = data.data().imageName.findIndex(name => name === req.body.imageName)
                var desc = data.data().imageDesc[index]
        
                await docRef.update({imageName: admin.firestore.FieldValue.arrayRemove(req.body.imageName)})
                await docRef.update({imageDesc: admin.firestore.FieldValue.arrayRemove(desc)})

            } catch (error) {
                res.send(`The user doesnt have any image named ${req.body.imageName}`)
            }
        }
        else{
            res.send("One or more argumnets missing")
        }  
    }else{
        res.status(404).send("Pls login first")
    }
};

const shareImage = async (req, res) => {

    const user = auth.getAuth().currentUser;

    if(user){
        if(req.body.imageName && req.body.senderEmail){
            const docRef = db.collection('users').doc(user.uid);
            const data = await docRef.get()
                
            var index = data.data().imageName.findIndex(name => name === req.body.imageName)
            if(index === -1){
                const err = "You dont own an image named " + req.body.imageName
                res.send(err)
            }
            var desc = data.data().imageDesc[index]

            admin.auth().getUserByEmail(req.body.senderEmail)
            .then(async (userCred) => {
                const tempDocRef = db.collection('users').doc(userCred.uid);

                await tempDocRef.update({imageDesc: admin.firestore.FieldValue.arrayUnion(desc)})
                await tempDocRef.update({imageName: admin.firestore.FieldValue.arrayUnion(req.body.imageName)})

                res.status(200).send(`Succesfully shared the image to ${req.body.senderEmail}`)
                
            })
            .catch((err)=>{
                res.send(`No user with the email ${req.body.senderEmail} exists`)
            })
        }
        else{
            res.send("One or more argumnets missing")
        }
    }else{
        res.status(404).send("Pls login first")
    }
};

module.exports = { upload, getImages, download, deleteImage, shareImage };
