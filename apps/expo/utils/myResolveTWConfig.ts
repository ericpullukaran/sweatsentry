import tailwindConfig from "../../../packages/config/tailwind/index";

type ColorsObject = {
  [key: string]: string;
};

export const myResolveTWConfig = (
  color: keyof ColorsObject,
): string | undefined => {
  const colorObj = tailwindConfig.theme?.extend?.colors as
    | ColorsObject
    | undefined;

  if (colorObj !== undefined) {
    return colorObj[color];
  } else {
    return undefined;
  }
};
