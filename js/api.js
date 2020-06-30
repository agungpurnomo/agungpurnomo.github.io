const api_key = "dc6bded9fb224bb18cc2bc2c439ee266";
const base_url = "https://api.football-data.org/v2/";
const liga_id = 2021;


const endpoint_klasemen = `${base_url}competitions/${liga_id}/standings`;
const endpoint_scorers = `${base_url}competitions/${liga_id}/scorers`;


const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token' : api_key
    }
  })
    .then(res=>{
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      }else{
        return Promise.resolve(res)
      }
    })

    .then(res => res.json())
    .catch(err =>{
      console.log(err)
    })
};

function klasemen() {
  if ("caches" in window) {
    caches.match(endpoint_klasemen).then(function (response){
      if(response) {
        response.json().then(function(data){
          console.log("Competition Data: " + data);
          getKlasemen(data);
        })
      }
    })
  }

  fetchApi(endpoint_klasemen)
    .then(data => {
      getKlasemen(data);
    })
    .catch(error => {
      console.log(error);
    })
}

function getKlasemen(data){
  let standings = "";
  let standingElement = document.getElementById("klasemen");

  data.standings[0].table.forEach(function (standing) {
    standings +=`
        <tr>
          <td style="text-align:center";>${standing.position}</td>
          <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"</td>
          <td>${standing.team.name}</td>
          <td>${standing.playedGames}</td>
          <td>${standing.won}</td>
          <td>${standing.draw}</td>
          <td>${standing.lost}</td>
          <td>${standing.goalDifference}</td>
          <td>${standing.points}</td>
          <td style="text-align:center;"><a href="./team.html?id=${standing.team.id}" class="waves-effect waves-light btn-small">DETAIL</a></td>
        </tr>
    `;
  });

  standingElement.innerHTML = `
        <div class="card">
        <table class="striped responsive-table">
          <thead style="border-radius:0;">
            <tr style="background-color: slategray;
            color: white;">
              <th style="text-align:center; border-radius:0";>Position</th>
              <th>Klub</th>
              <th></th>
              <th>D</th>
              <th>M</th>
              <th>S</th>
              <th>K</th>
              <th>SG</th>
              <th>Pn</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="standings">
            ${standings}
          </tbody>
        </table>
        </div>
  `;
}

function Scorers() {
  if ("caches" in window) {
    caches.match(endpoint_scorers).then(function (response){
      if(response) {
        response.json().then(function(data){
          console.log("Top Scorers Data: " + data);
          getScorers(data);
        })
      }
    })
  }

  fetchApi(endpoint_scorers)
    .then(data =>{
      getScorers(data);
    })
    .catch(error =>{
      console.log(error);
    })
}


function Teams() {
  return new Promise(function(resolve, reject){
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response){
        if(response) {
          response.json().then(function(data){
            console.log("Team: " + data);
            getTeams(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(base_url + "teams/" + idParam)
     .then(data =>{
      console.log(data);
        getTeams(data);
        resolve(data);
      })
      .catch(error =>{
        console.log(error);
      })
  })
}




function getScorers(data){
  let scorers = "";
  let scorersElement = document.getElementById("scorers");
  let no = 0;
  data.scorers.forEach(function (scorer) {
    no=no+1;
    scorers +=`
        <tr>
          <td style="text-align:center";>${no}</td>
          <td>${scorer.player.name}</td>
          <td>${scorer.team.name}</td>
          <td>${scorer.numberOfGoals}</td>
        </tr>
    `;
  });

  scorersElement.innerHTML = `
        <div class="card">
        <table class="striped responsive-table">
          <thead style="border-radius:0;">
            <tr style="background-color: slategray;
            color: white;">
              <th style="text-align:center; border-radius:0";>No</th>
              <th>Nama</th>
              <th>Klub</th>
              <th>Gol</th>
            </tr>
          </thead>
          <tbody id="scorers">
            ${scorers}
          </tbody>
        </table>
        </div>
  `;
}

function getTeams(data){
  let teamsElement = document.getElementById("teamslogo");
  let teamsinfoElement = document.getElementById("teamsinfo");
  
  teamsElement.innerHTML = `          
      <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}">  
  `;

  teamsinfoElement.innerHTML = `          
      <div class="info" style="border:1px solid rgba(0,0,0,.125); padding:20px; border-radius:20px;background-color: mintcream;">
        <h5 style="text-color:white;"><b>${data.name}</b></h5>
        <p>Address : ${data.address}</p>
        <p>Phone : ${data.phone}</p>
        <p>Website : ${data.website}</p>
        <p>Email : ${data.email}</p>
        <p>Venue : ${data.venue}</p>
      </div>
      
`;
}

function getTeamSave(){
  getAllTeam().then(function(teams){
    console.log(teams);
  
   var teamsHTML = "";
   teams.forEach(function(team){
     teamsHTML +=`
      <div class="col s12 m3">
        <div class="card">
          <a href="./team.html?id=${team.id}&saved=true">
          <div class="card-image">
            <img class="responsive-img" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
            <a onclick="(deleteTeam(${team.id}));" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i>
            </a>
          </div>
          <div class="card-content">
            <span class="card-title" "><b>${team.name}</b></span>
            <p></p>
          </div>
        </div>
      </div>
     `;
   });
   document.getElementById("favorite").innerHTML = teamsHTML;         
  });    
  
}

function getTeamSaveById() {
  var urlParams = new URLSearchParams(windos.location.search);
  var idParam = urlParams.get("id");

  let teamsElement = document.getElementById("teamslogo");
  let teamsinfoElement = document.getElementById("teamsinfo");

  getById(idParam).then(function(team) {
    teamsElement = '';
    teamsElement.innerHTML = `       
    <img class="responsive-img" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}">  
    `;

    teamsinfoElement.innerHTML = `          
    <div class="info" style="border:1px solid rgba(0,0,0,.125); padding:20px; border-radius:20px;background-color: mintcream;">
      <h5 style="text-color:white;"><b>${data.name}</b></h5>
      <p>Address : ${data.address}</p>
      <p>Phone : ${data.phone}</p>
      <p>Website : ${data.website}</p>
      <p>Email : ${data.email}</p>
      <p>Venue : ${data.venue}</p>
    </div>
`;
  })
}


