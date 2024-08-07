import OlympicsLogo from "@/images/league_logos/Olympics.png";

const leaguesData={
    1304:{name:"Liga Nacional"},
    7592:{name:"Liga Argentina"},
    28862:{name:"Liga Federal"},
    1525:{name:"ACB"},
    1583:{name:"Lega 1"},
    37671:{logo:OlympicsLogo,name:"Olympics 2024"},
    37729:{logo:OlympicsLogo,name:"Olympics 2024 - Women"},
    37733:{logo:OlympicsLogo,name:"Olympics 2024 - 3x3"},
    37731:{logo:OlympicsLogo,name:"Olympics 2024 - 3x3 Women"},
}

export default function(league){
    let {name,logo}=leaguesData[league.id]??{}
    if (name){
        league.name=name
    }
    if (logo){
        league.logo=logo
    }
}