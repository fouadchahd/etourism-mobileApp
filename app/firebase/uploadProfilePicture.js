import { storage } from "../firebase";

export const uploadSinglePicture = async (picture) => {
    if (picture) {
      var now = new Date();
      const res = await fetch(picture.uri);
      const blob = await res.blob();
      const uploadTask = storage
        .ref(`profilePhotos/user_${now.getTime()}`)
        .put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("image progress " + progress);
        },
        (error) => {
          console.log("error() " + error);
        },
        () => {
          storage
            .ref("profilePhotos")
            .child(`user_${now.getTime()}`)
            .getDownloadURL()
            .then((url) => {
              console.log("image url", url);
            });
        }
      );
    }
  };