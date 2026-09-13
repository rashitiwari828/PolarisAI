import { useEffect, useState } from "react";

import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MissionControl from "./pages/MissionControl";

import { isAuthenticated } from "./components/utils/auth";

import "./App.css";
import "./index.css";

function App() {
  // -----------------------------------------
  // INITIAL SCREEN
  // -----------------------------------------
  const [screen, setScreen] = useState(() => {
    const path = window.location.pathname;

    // Already logged in → Mission Control
    if (isAuthenticated()) {
      return "mission";
    }

    // Not logged in → respect current URL
    if (path === "/login") {
      return "login";
    }

    if (path === "/signup") {
      return "signup";
    }

    return "home";
  });

  // -----------------------------------------
  // NAVIGATION
  // -----------------------------------------
  const navigateTo = (newScreen, replace = false) => {
    const paths = {
      home: "/",
      login: "/login",
      signup: "/signup",
      mission: "/mission",
    };

    const newPath = paths[newScreen];

    if (replace) {
      window.history.replaceState({}, "", newPath);
    } else {
      window.history.pushState({}, "", newPath);
    }

    setScreen(newScreen);
  };

  // -----------------------------------------
  // BROWSER BACK / FORWARD BUTTON
  // -----------------------------------------
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;

      // HOME
      if (path === "/" || path === "") {
        setScreen("home");
        return;
      }

      // LOGIN
      if (path === "/login") {
        setScreen("login");
        return;
      }

      // SIGNUP
      if (path === "/signup") {
        setScreen("signup");
        return;
      }

      // MISSION CONTROL
      if (path === "/mission") {
        if (isAuthenticated()) {
          setScreen("mission");
        } else {
          window.history.replaceState({}, "", "/");
          setScreen("home");
        }

        return;
      }

      // UNKNOWN URL
      window.history.replaceState({}, "", "/");
      setScreen("home");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // -----------------------------------------
  // HOME → MISSION CONTROL
  // -----------------------------------------
  const handleEnterMissionControl = () => {
    if (isAuthenticated()) {
      // Already logged in → directly enter Mission Control
      navigateTo("mission");
    } else {
      // Not logged in → Login first
      navigateTo("login");
    }
  };

  // -----------------------------------------
  // LOGIN → MISSION CONTROL
  // -----------------------------------------
  const handleLoginSuccess = () => {
    // Replace /login with /mission.
    // This makes browser Back go directly to Home.
    navigateTo("mission", true);
  };

  // -----------------------------------------
  // LOGIN → SIGNUP
  // -----------------------------------------
  const handleOpenSignup = () => {
    navigateTo("signup");
  };

  // -----------------------------------------
  // SIGNUP → MISSION CONTROL
  // -----------------------------------------
  const handleSignupSuccess = () => {
    // Replace /signup with /mission.
    // This makes browser Back go directly to Home.
    navigateTo("mission", true);
  };

  // -----------------------------------------
  // SIGNUP → LOGIN
  // -----------------------------------------
  const handleOpenLogin = () => {
    navigateTo("login");
  };

  // -----------------------------------------
  // LOGIN / SIGNUP → HOME
  // -----------------------------------------
  const handleBackToHome = () => {
    navigateTo("home");
  };

  // -----------------------------------------
  // MISSION CONTROL → HOME
  // -----------------------------------------
  const handleMissionBackToHome = () => {
    navigateTo("home");
  };

  // -----------------------------------------
  // LOGIN PAGE
  // -----------------------------------------
  if (screen === "login") {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSignup={handleOpenSignup}
        onBack={handleBackToHome}
      />
    );
  }

  // -----------------------------------------
  // SIGNUP PAGE
  // -----------------------------------------
  if (screen === "signup") {
    return (
      <Signup
        onSignupSuccess={handleSignupSuccess}
        onLogin={handleOpenLogin}
        onBack={handleBackToHome}
      />
    );
  }

  // -----------------------------------------
  // MISSION CONTROL
  // -----------------------------------------
  if (screen === "mission") {
    return (
      <MissionControl
        onBackToHome={handleMissionBackToHome}
      />
    );
  }

  // -----------------------------------------
  // HOME / LANDING PAGE
  // -----------------------------------------
  return (
    <Home
      onEnterMissionControl={handleEnterMissionControl}
    />
  );
}

export default App;