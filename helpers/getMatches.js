export default async function getMatches(date){
    return await fetch(
        `https://v1.basketball.api-sports.io/games?date=${
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1).toString().padStart(2, "0") +
          "-" +
          date.getDate()
        }&timezone=America/Argentina/Buenos_Aires`,
        {
          method: "GET",
          headers: { "x-apisports-key": import.meta.env.VITE_TOKEN },
        }
      )
}