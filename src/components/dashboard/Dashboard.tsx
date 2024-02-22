import React from "react";
import { IonButton, IonContent, IonImg, IonPage } from "@ionic/react";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard = (props: DashboardProps) => {
  const { setIsLoggedIn } = props;

  const handleLogin = () => {
    setIsLoggedIn(false);
  };

  return (
    <IonPage>
      <IonContent>
        Dashboard (Logged In)
        <IonButton onClick={() => handleLogin()}>Log Out</IonButton>
        <div style={{ height: "200px", width: "1px" }} />
        <IonImg src={"/hawaii.jpeg"} />
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
