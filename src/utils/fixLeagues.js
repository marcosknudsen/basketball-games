import OlympicsLogo from "@/images/league_logos/Olympics.png";

const leaguesData={
    1304:{name:"Liga Nacional"},
    7592:{name:"Liga Argentina"},
    28862:{name:"Liga Federal"},
    1525:{name:"ACB"},
    1583:{name:"Lega 1"},
    37671:{logo:OlympicsLogo},
    37729:{logo:OlympicsLogo},
    37733:{logo:OlympicsLogo},
    37731:{logo:OlympicsLogo},
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