import axios from "axios";

export default function log(action, params) {
  let data = JSON.stringify({
    id: 0,
    ip: "string",
    endpoint: action,
    parameters: params?.length?[...params]:[],
    date: "2024-05-12T01:03:44.682Z",
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
