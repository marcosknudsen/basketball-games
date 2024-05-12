import axios from "axios";

export default function log(action, params) {
  let data = JSON.stringify({
    id: 0,
    ip: "string",
    endpoint: action,
    parameters: params??"",
    date: new Date(),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://promiedos-basquet-logger20240511205053.azurewebsites.net/api/requests",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .catch((error) => {
      console.log(error);
    });
}
