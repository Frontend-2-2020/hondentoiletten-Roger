//Imports

//CSS
import "leaflet/dist/leaflet.css"; 
import '../styles/index.scss';
import '../styles/split.css';


//JS
import L from "leaflet"; //leaflet installeren met npm
import Axios from "axios"; //axios installeren met npm
import { getDistance } from 'geolib';



// Kaart aanmaken
var map = L.map('map', {
    center: [51.035133942053, 3.7399235735628], //we geven hier startcoordinaten aan, best met data uit de json file
    zoom: 13
});

// Kaart afbeeldingen toevoegen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//Eerste mapmarker

const myIcon = L.icon({
    iconUrl: 'public/marker.png', //marker die zal gebruikt worden op de kaart
    iconSize: [15, 20], //grootte van de marker
    iconAnchor: [15, 41], //plaats van het pijltje onderaan de marker
    popupAnchor: [0, -35], //plaats van de popup boven de marker
});


//Tweede mapmarker
const myIcon2 = L.icon({
    iconUrl: 'public/marker2.png', //marker die zal gebruikt worden op de kaart
    iconSize: [15, 20], //grootte van de marker
    iconAnchor: [15, 41], //plaats van het pijltje onderaan de marker
    popupAnchor: [0, -35], //plaats van de popup boven de marker
});


//Lees de data uit de api

Axios.get("https://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson")
    .then(function(response){
        var coordinates = response.data.coordinates; //haal coordinates op uit api
        navigator.geolocation.getCurrentPosition(setPostion); //lees de huidige positie uit
        // Loop through the coordinates & save them in an array
        for (let i = 0; i < coordinates.length; i++) { //zolang er coordinaten zijn lees je die uit


            const coord = coordinates[i]; //maak een constante van coordinates
            var marker = L.marker([coord[1], coord[0]], {icon: myIcon}).addTo(map); //steek de coordinaten in de marker de coordinaten binnen de array noem je coord[1] en coord[2]
            
            marker.bindPopup(coord[1] + "/" + coord[0]); //maak een popup aan de marker vast
           
         
        }

        //markeer mijn positie en open de kaart op deze plaats

        function setPostion(position){
            const {latitude, longitude} = position.coords;
            console.log(latitude, longitude);
            const marker = L.marker([latitude, longitude], {icon: myIcon2}).addTo(map);
            map.panTo([latitude, longitude]);
        
        console.log(latitude, longitude);
     }
      
     //Geef de eerste 5 afstanden weer vanaf je huidige positie
     
     for (let i = 0; i < 5; i++) { //zolang er coordinaten zijn lees je die uit

            
            const coord = coordinates[i]; //maak een constante van coordinates
            var distance = getDistance([coord[1],  coord[0]], [51.0771287, 3.1114507]); //hoe krijg ik hier de latitude en de longitude in?
             console.log(distance/1000);
            
             var plaats = `<li>Plaats ${i+1}<br>&nbsp;<br></li>`;
            
             var getallen =   `
             <li id="coordinaat">${coord[1]}, ${coord[0]}</li>
             `;
             
          
                // console.log(getallen);
               


             var afstand =   `
             <li>${distance/1000} km<br>&nbsp;<br></li>
             `;
             
            
             document
             .querySelector('#plaats')
             .innerHTML+= plaats;
   
             document
             .querySelector('#overview')
              .innerHTML+= getallen;
       
              document
              .querySelector('#afstand')
               .innerHTML+=  afstand;
           
               ;

               
               //ga naar de coordinaten waarop geklikt werd - nog te vervolledigen i les
               
               var el = document.getElementById("overview");
                el.addEventListener("click", function(){
                    map.panTo([coord[1], coord[0]]
                        
                        )});
          
               
             


        }
        // <div class="card h-100 " id="film${i}" data-id="${resultaat[i].id}" data-rank="${[i+1]}">
        //                      <a href=""><img
        //                          id="poster${i}"
        //                          class="card-img-top w3-hover-opacity"
        //                          src="https://image.tmdb.org/t/p/w500/${resultaat[i].poster_path}"></a>
        //                      <div class="d-title"><h1 id="titel${i}" class="card-title">${resultaat[i].title}</h1></div>
        //                      <div class="d-ranking"><p class="ranking">${[i+1]}</p></div>
        //                      <h2 id="score${i}" class="card-score"> <strong>Score:</strong> ${resultaat[i].vote_average}</h2>
        //                      <p id="reldate${i}" class="card-text"><strong>Release date:</strong> ${resultaat[i].release_date} </p>
        //                  </div>
             
             

//zet de huidige locatie en position op kaart




});


