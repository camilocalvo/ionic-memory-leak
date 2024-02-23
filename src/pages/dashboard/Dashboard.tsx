import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import {
  CameraResultType,
  Camera,
  CameraSource,
  CameraDirection,
  Photo,
} from "@capacitor/camera";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ImageAttachment {
  name: string;
  fileExtension: string;
  data: string;
}

const CapturedImage = ({
  imageAttachment,
}: {
  imageAttachment?: ImageAttachment;
}) => {
  if (!imageAttachment) return <></>;

  return (
    <img
      src={`data:image/${imageAttachment.fileExtension};base64,${imageAttachment.data}`}
      alt=""
    />
  );
};

const Dashboard = (props: DashboardProps) => {
  const { setIsLoggedIn } = props;

  const [images, setImages] = useState<Array<ImageAttachment>>([]);

  const takePhoto = async () => {
    await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      saveToGallery: false,
      source: CameraSource.Camera,
      presentationStyle: "fullscreen",
      correctOrientation: true,
      width: 2048,
      height: 1536,
      direction: CameraDirection.Rear,
    })
      .then((photo) => {
        if (!photo.base64String) return;

        const newImage: ImageAttachment = {
          name: "test",
          fileExtension: photo.format,
          data: photo.base64String,
        };

        const newImages = [...images, newImage];
        setImages(newImages);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    takePhoto();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(false);
  };

  return (
    <IonPage>
      <IonContent>
        Dashboard (Logged In)
        <IonButton onClick={() => handleLogin()}>Log Out</IonButton>
        {images?.map((image, index) => {
          return <CapturedImage key={index} imageAttachment={image} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
