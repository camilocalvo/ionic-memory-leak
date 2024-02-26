import React, { useEffect, useState } from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import {
  CameraResultType,
  Camera,
  CameraSource,
  CameraDirection,
} from "@capacitor/camera";
import { addImage, saveImage } from "../../store/actions";
import { imageStateSelector } from "../../selectors/imageStateSelector";

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
      id='captured-image' 
    />
  );
};

const Dashboard = (props: DashboardProps) => {
  const { setIsLoggedIn } = props;

  const dispatch = useDispatch();

  const [images, setImages] = useState<Array<ImageAttachment>>([]);
  const { images: reduxImages } = useSelector(imageStateSelector);

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
        dispatch(addImage(newImage.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    takePhoto();

    return () => {
      document?.getElementById('captured-image')?.removeAttribute('src');
    }
  }, []);

  const onClickSaveImage = () => {
    dispatch(saveImage());
  };

  const onClickClearImages = () => {
    setImages([]);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <IonPage>
      <IonContent>
        Dashboard (Logged In)
        <div style={{ marginTop: "3rem" }}>
          <IonButton onClick={() => onClickSaveImage()}>Save Image</IonButton>
          <IonButton onClick={() => onClickClearImages()}>Clear Images</IonButton>
          <IonButton onClick={() => handleLogout()}>Log Out</IonButton>
        </div>
        {images?.map((image, index) => {
          return <CapturedImage key={index} imageAttachment={image} />;
        })}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
