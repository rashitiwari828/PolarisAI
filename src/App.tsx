import { useState } from "react";
import Home from "./pages/home";
import MissionControl from "./pages/MissionControl";

import "./App.css";
import "./index.css";



function App() {
  const [showMissionControl, setShowMissionControl] = useState(false);

  const handleEnterMissionControl = () => {
    setShowMissionControl(true);
  };

  const handleBackToHome = () => {
    setShowMissionControl(false);
  };

  if (showMissionControl) {
    return (
      <MissionControl
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <Home
      onEnterMissionControl={handleEnterMissionControl}
    />
  );
}

export default App;