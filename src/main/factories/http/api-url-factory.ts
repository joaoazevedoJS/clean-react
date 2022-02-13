export const makeAPIUrl = (path: string): string => {
  const url: string[] = path.split("");

  if (url[0] === "/") url.shift();

  return `process.env.API_URL/${url.join("")}`;
};
