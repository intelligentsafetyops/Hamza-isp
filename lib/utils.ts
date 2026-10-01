import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge can't tell our custom type scale (tokens.css --text-*) from colours, so it
// would treat `text-body` and `text-on-brand` as the same group and drop one. Declare the scale.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "caption",
            "body",
            "lede",
            "subheading",
            "heading-sm",
            "heading",
            "heading-lg",
            "section",
            "display",
            "display-lg"
          ]
        }
      ]
    }
  }
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
