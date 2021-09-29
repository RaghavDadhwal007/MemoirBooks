const hostname = window.location.hostname;

const api = {
  localhost: "http://localhost:3000/",
};

let apiBase = "";
if (hostname === "localhost") {
  apiBase = api.localhost;
}

export default apiBase;
