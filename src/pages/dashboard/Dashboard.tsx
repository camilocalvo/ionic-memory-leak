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

const CapturedImage = ({ photo }: {photo?: Photo }) => {
  if (!photo) return <></>;

    return (
      <img
        src={`data:image/${photo.format};base64,${photo.base64String}`}
        alt=""
      />
    );
};

const Dashboard = (props: DashboardProps) => {
  const { setIsLoggedIn } = props;

  const [photo, setPhoto] = useState<Photo | undefined>(undefined);

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
        setPhoto(photo);
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
        <CapturedImage photo={photo} />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
