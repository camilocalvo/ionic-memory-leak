import React from "react";
import { IonButton, IonContent, IonPage } from "@ionic/react";

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = (props: LoginProps) => {
  const { setIsLoggedIn } = props;

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <IonPage>
      <IonContent>
        Not Logged In
        <IonButton onClick={() => handleLogin()}>Log In</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
