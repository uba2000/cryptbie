import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return SCREEN_WIDTH >= 1024
      ? Math.round(PixelRatio.roundToNearestPixel(newSize / 1.75))
      : Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return SCREEN_WIDTH >= 1024
      ? Math.round(PixelRatio.roundToNearestPixel(newSize / 1.75)) - 2
      : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}
