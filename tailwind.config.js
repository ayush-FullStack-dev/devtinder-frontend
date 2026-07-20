// /** @type {import('tailwindcss').Config} */

import { screens } from "./src/styles/screens";
import { colors } from "./src/styles/colors";
import { borderRadius } from "./src/styles/radius";
import { boxShadow } from "./src/styles/shadows";
import { backgroundImage } from "./src/styles/gradients";
import {
  backdropBlur,
  transitionTimingFunction,
} from "./src/styles/transitions";

export default {
  theme: {
    extend: {
      screens,
      colors,
      borderRadius,
      boxShadow,
      backgroundImage,
      backdropBlur,
      transitionTimingFunction,
    },
  },
};
