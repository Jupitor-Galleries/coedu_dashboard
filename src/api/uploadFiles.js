import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../lib/firebase";

export  const uploadImages = async (imageFiles, folder) => {
    if (imageFiles && imageFiles.length > 0) {
      const uploadPromises = imageFiles.map((imageFile) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(storage, `${folder}/${imageFile.name}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
                default:
                  break;
              }
            },
            (error) => {
              reject({ status: false, message: error.message });
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("File available at", downloadURL);
                resolve({ status: true, url: downloadURL });
              });
            }
          );
        });
      });
    }}