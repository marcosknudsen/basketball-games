const leaguesData={
    1304:{name:"Liga Nacional"},
    7592:{name:"Liga Argentina"},
    28862:{name:"Liga Federal"},
    1525:{name:"ACB"},
    1583:{name:"Lega 1"}
}

export default function(league){
    let {name}=leaguesData[league.id]??{}
    if (name){
        league.name=name
    }
}