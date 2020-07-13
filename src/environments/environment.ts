// Assume this is local, it will be overwritten by dev/staging/prod when deployed
export const environment = {
  production: false,
  name: "Local",
  theme: "orange",
  initial_page: "/blog/news",
  api_path: 'http://devapi.fllair.com/',
  // api_path: "http://localhost:3000/",
  domain: 'localhost'
};
