import olympicsLogo from "@/images/league_logos/Olympics.png";
import interligasLogo from "@/images/league_logos/Interligas.png";
import euroLeagueLogo from "@/images/league_logos/EuroLeague.png";
import clubsFriendlyLogo from "@/images/league_logos/ClubsFriendly.png";

const leaguesData = {
  1304: { name: "Liga Nacional" },
  7592: { name: "Liga Argentina" },
  28862: { name: "Liga Federal" },
  1525: { name: "ACB" },
  1583: { name: "Lega 1" },
  37671: { logo: olympicsLogo, name: "Olympics 2024" },
  37729: { logo: olympicsLogo, name: "Olympics 2024 - Women" },
  37733: { logo: olympicsLogo, name: "Olympics 2024 - 3x3" },
  37731: { logo: olympicsLogo, name: "Olympics 2024 - 3x3 Women" },
  34642: { logo: interligasLogo },
  1923: { logo: euroLeagueLogo},
  14: { logo: clubsFriendlyLogo },
};

export default function (league) {
  let { name, logo } = leaguesData[league.id] ?? {};
  if (name) {
    league.name = name;
  }
  if (logo) {
    league.logo = logo;
  }
}
