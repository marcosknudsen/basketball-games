import axios from "axios";

export default function log(action,params) {
  return null
  axios
    .request({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://promiedos-basquet-log-api.netlify.app/.netlify/functions/server/log",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        date:new Date(),
        action,
        params,
      }),
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}