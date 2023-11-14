export const customFetch = (url: string, init?: RequestInit) => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL as string;
  return fetch(baseUrl + url, init);
};
