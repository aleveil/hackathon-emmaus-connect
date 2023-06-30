const ApiHelper = async (
  route,
  method,
  token = null,
  body = null,
  contentType = "application/json"
) => {
  const myHeaders = new Headers();
  if (contentType !== "") myHeaders.append("Content-Type", contentType);
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
