import { TOTAL_SCREENS } from "./commonUtils";
import { Subject } from "rxjs";

export default class ScrollService {
  static scrollHandler = new ScrollService();

  static currentScreenBroadcaster = new Subject();
  static currentScreenFadeIn = new Subject();

  constructor() {
    window.addEventListener("scroll", this.checkCurrentScreenUnderViewport);
  }

  scrollToHireMe = () => {
    const contactMeScreen = document.getElementById("ContactMe");
    if (!contactMeScreen) return;
    contactMeScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  scrollToHome = () => {
    const homeScreen = document.getElementById("Home");
    if (!homeScreen) return;
    homeScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  isElementInView = (elem, type) => {
    if (!elem) return false;
    const rec = elem.getBoundingClientRect();
    const elementTop = rec.top;
    const elementBottom = rec.bottom;

    const partiallyVisible =
      elementTop < window.innerHeight && elementBottom >= 0;
    const completelyVisible =
      elementTop >= 0 && elementBottom <= window.innerHeight;

    switch (type) {
      case "partial":
        return partiallyVisible; 
      case "complete":
        return completelyVisible;
      default:
        return false;
    }
  };

  checkCurrentScreenUnderViewport = (event) => {
    for (const screen of TOTAL_SCREENS) {
      const screenFromDOM = document.getElementById(screen.screen_name);
      if (!screenFromDOM) continue;

      const fullVisible = this.isElementInView(screenFromDOM, "complete");
      const partiallyVisible = this.isElementInView(screenFromDOM, "partial");

      if (fullVisible || partiallyVisible) {
        if (partiallyVisible && !screen.alreadyRendered) {
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name,
          });
          screen.alreadyRendered = true;
          break;
        }
        if (fullVisible) {
          ScrollService.currentScreenBroadcaster.next({
            screenInView: screen.screen_name,
          });
          break;
        }
      }
    }
  };
}
