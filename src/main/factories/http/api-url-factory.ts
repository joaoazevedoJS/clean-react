export const makeAPIUrl = (path: string): string => {
  const url: string[] = path.split("");

  if (url[0] === "/") url.shift();

  return `http://fordevs.herokuapp.com/api/${url.join("")}`;
};
