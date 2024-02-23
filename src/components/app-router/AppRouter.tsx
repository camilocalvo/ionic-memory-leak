import {
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useState } from "react";
import { Route } from "react-router";
import Dashboard from "../../pages/dashboard/Dashboard";
import Login from "../../pages/login/Login";

const AppRouter: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path={"/"}
          render={() => <Dashboard setIsLoggedIn={setIsLoggedIn} />}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton
          data-testid="Dashboard"
          layout="icon-start"
          selected={isLoggedIn}
          tab="dashboard"
          href={"/tabs/home"}
        >
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppRouter;
