export const PATH_NAMES = {
  home: "/",
  myFavorites: "/my-favorite",
} as const;

export type PathName = (typeof PATH_NAMES)[keyof typeof PATH_NAMES];