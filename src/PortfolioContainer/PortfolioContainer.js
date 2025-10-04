import React from "react";
import { TOTAL_SCREENS } from "../utilities/commonUtils";

export default function PortfolioContainer() {

  const mapAllScreens = () => {
    return TOTAL_SCREENS.map((screen) => {
      if (screen.component) {
        const ScreenComponent = screen.component;
        return (
          <ScreenComponent
            screenName={screen.screen_name}
            key={screen.screen_name}
            id={screen.screen_name}
          />
        );
      } else {
        return <div key={screen.screen_name}></div>;
      }
    });
  };

  return (
    <div className="portfolio-container">
      {mapAllScreens()}
    </div>
  );
}
