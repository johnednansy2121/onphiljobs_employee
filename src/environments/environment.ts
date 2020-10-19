// Assume this is local, it will be overwritten by dev/staging/prod when deployed
export const environment = {
  production: false,
  name: "Local",
  theme: "orange",
  initial_page: "/blog/news",
  api_path: 'http://ec2-3-16-168-154.us-east-2.compute.amazonaws.com:3000/',
  // api_path: "http://localhost:3000/",
  domain: 'http://ec2-3-16-168-154.us-east-2.compute.amazonaws.com'
};
