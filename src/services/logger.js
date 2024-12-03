import axios from "axios";

export default function log({ action, team, league }) {
  axios
    .request({
      method: "post",
      maxBodyLength: Infinity,
      url: "https://promiedos-basquet-api.onrender.com/api/logs",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify({
        Action: action,
        League: league,
        Team: team,
      }),
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
