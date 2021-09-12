# Shopify-Winter2022-Challenge: Backend Developer Intern Challenge
Built an image repository which the following features

 - Secured Authentication (login, signup)
 - Uploading/Downloading images
 - Delete images
 - Sharing images with other users
    

### For a video demonstration visit
-  [Youtube Video](https://youtu.be/70dXZQCRH48)

# Table of Contents
-[Installations](#installations)
- [Authentication](#authentication)
- [Images](#images)
- [Share](#share)
- [Future Features](#future-features)
- [Note For Shopify Developers](#note-for-shopify-developers)
- [Contact Me](#contact-me)

<p align="center">
    <u><h2 align="center">Installations</h2></u>
</p>

- To install all the dependencies run 
```bash
npm i
```

- Please create a Firebase Project for this and make sure to enable the ```email and password``` authentication on it

- Under the firebaseSetup folder pls create a file named ```firebaseConfig.js``` and inside the file pls paste your firebase app configuration and export it like this: 
```
 const firebaseConfig = {
     apiKey: YOUR_API_KEY,
     authDomain: YOUR_AUTH_DOMAIN,
     projectId: YOUR_PROJECT_ID,
     storageBucket: YOUR_STORAGE_BUCKET,
     appId: YOUR_API_ID
   };

 module.exports = { firebaseConfig }
 
```

- Next go to your ```Firebase project -> Project Settings -> Service Accounts``` and download the firebase SDK by clicking ```Generate New Private Key``` button
- Rename the file to ``` serviceAccountKey.json ``` and put it in the root folder. The file will look like this
```
 {
  "type": ,
  "project_id": ,
  "private_key_id": ,
  "private_key": ,
  "client_email": ,
  "client_id": ,
  "auth_uri": ,
  "token_uri": ,
  "auth_provider_x509_cert_url": ,
  "client_x509_cert_url": 
}
```

- Finally pls create a ```.env``` file and enter your create a variable name BUCKET_URL in it containing your Firebase Bucket Url

```
  BUCKET_URL=YOUR_BUCKET_URL
```

## Features

<p align="center">
    <u><h2 align="center">Authentication</h2></u>
</p>

-  I used Google Firestore Authentication to ensure secure authentication
-  A user will only have access to their images and only they can delete/view their images.


-  <b>Create a new user</b>: Post {/api/auth/signup}
    -  Pass in the email and password in the request body.These details get stored in the firestore authentication table. 
    -  The password is first encypted using firestore encryption and then stored in the database for safety.

    - Sample Request Body
        ```
        {
            email : "ThirdUser@gmail.com"
            password: "anypassword"
        }
        ```
        
    - The Postman Request
        ![createuser](https://user-images.githubusercontent.com/59619895/132992863-974afdf7-31e7-465c-8991-e6087ed4d0e4.png)

-  <b>Login for an existing user</b>: Post {/api/auth/login} 
    - Provide the email and password of the user created above in the signup endpoint. 

       
    - The Postman Request
        ![loginimage](https://user-images.githubusercontent.com/59619895/132992827-7f039ec6-2386-4afc-8257-10a1c4d8f683.png)


 <p align="center">
    <u><h2 align="center">Images</h2></u>
</p>   
        
- Images can be uploaded, downloaded and deleted. One user can have multiple images and images can be shared between users.

    - Upload an image :
        - <b>Storage of an image</b>: 
            - The storage of the image is done in Firebase cloud storage because of multiple reasons relating to security, costs and backups
            - Along with this the name of the image is stored in firebase firestore (the filename undergoes md5 hashing and salting to ensure final image names are unique)
        -  <b> Ensure Bulk Images are uploaded </b>:
            - Only allowing one image to be uploaded at a time : Reason is to allow parallel uploading instead of sequential to prevent malicious attacks and increase speed of the response.
            
        - Upload an Image: Post {api/image/upload}
            
            - Sample Request Body:
                ```
                {
                    "file": cat.png,
                    "desc": "cat"
                }
                ```
                
            - The Postman Request:
                ![image](https://user-images.githubusercontent.com/59619895/132993037-b6070618-3559-4d9e-95ee-d1cff2b49852.png)
               
    - Downloading an image:
        - Download : The file's download url is generated using firebase
        - Security during download:
            - The download url is an unique url generated by firebase
            - Only users with permission for the image can download the image
        - Ensure Bulk Imgaes are deleted : Following a parallel model(As in the case of upload),only allowing one image to be deleted at a time to prevent malicious attacks and increase speed of the response.
        
          - Sample request body:
       
                    {
                        "imageName" : "d10d92934b608ed70a0a17db4e92efc2.png"
                    }
        
        - Download an Image: Get {api/image/download}

            - The Postman Request
                ![downloadimage](https://user-images.githubusercontent.com/59619895/132993096-2e52d368-7529-41ff-baad-89d3284801c9.png)

    - Reading a list of images: Get {api/image}
        -  This endpoint helps in reading the images related to a user. Only an authorized user can access this.

        - The Postman Request:
            ![readingimages](https://user-images.githubusercontent.com/59619895/132993149-94f7bab2-b5e9-4f6f-9c49-fd15298e9365.png)

    - Deleting an image for the user:
        - <b>Secure Deletion of the image </b>: 
            - This function is used to delete an image. 
        - <b>Ensuring bulk deletion of the images</b>: Only one image is allowed to be deleted at a time to follow a parallel model instead of a sequential model to prevent malicious attacks and increase speed of the response
        - Delete an image : Delete {api/image/}

          - Sample Request body :

                {
                    "imageName" : "d10d92934b608ed70a0a17db4e92efc2.png"
                }

                
            - The Postman Request:
                ![deleteimage](https://user-images.githubusercontent.com/59619895/132993201-21687e10-f3a0-470d-9e35-63bb2b13d5d4.png)
                
<p align="center">
    <u><h2 align="center">Share</h2></u>
</p>

- Have you ever used google photos ? Wanna share your photos with your friends ? Here you go :) . Sharing allows a user to share his images with other users. 
    - Sample Request Body:
        ```
        {
            "imageName" : "d10d92934b608ed70a0a17db4e92efc2.png",
            "senderEmail": "secondUser@gmail.com"
        }
        ```
    - The Postman Request:
        ![access](https://user-images.githubusercontent.com/59619895/132993267-ca02e490-aef1-46b7-ba47-9a2110a220af.png)

<p align="center">
    <u><h2 align="center">Future Features</h2></u>
</p>

- Making features to upload and delete multiple images at same time
- Make the UI interface for the app

<p align="center">
    <u><h2 align="center">Note for Shopify Developers</h2></u>
</p>

- I will migrate to aws or gcp in the future releases.
- Thankyou  for your time :) 

<p align="center">
    <u><h2 align="center">Contact Me</h2></u>
</p>

Email : rishi.koul@mail.utoronto.ca

