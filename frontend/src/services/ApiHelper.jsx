const ApiHelper = async (route, method, token = null, body = null) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method,
    headers: myHeaders,
    body,
  };

  return fetch(import.meta.env.VITE_BACKEND_URL + route, requestOptions);
};

export default ApiHelper;
