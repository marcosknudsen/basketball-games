import axios from "axios";

export default function log(action, params) {
  let data = JSON.stringify({
    id: 0,
    ip: "string",
    endpoint: action,
    parameters: params??null,
    date: new Date(),
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_LOG_API_URL}/api/requests`,
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
