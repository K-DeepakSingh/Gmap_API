
function initMap() {
  // Update MAP_ID with custom map ID
  let points =[];
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 22.11839,
      lng: 78.04667,
    },
    zoom: 19,
    mapId: "MAP_ID",
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: true,
  });

  // Name
  // Latitude, Longitude
  const markers = [
    ["A1", 22.11839, 78.04667, "A"],
    ["A2", 22.11842, 78.04642, "A"],
    ["B1", 22.11844, 78.04673, "B"],
    ["B2", 22.11847, 78.04648, "B"],
    ["C1", 22.11878, 78.04624, "C"],
    ["A3", 22.11853, 78.04627, "A"],
    ["C2", 22.11856, 78.0463, "C"],
    ["C3", 22.11858, 78.04549, "C"],
    ["C4", 22.11833, 78.04553, "C"],
    ["B3", 22.11838, 78.04544, "B"],
    ["B4", 22.1184, 78.04502, "B"],
  ];

  // ye section me bhi array banake loop lagake kar sakte chize for now constants me kiya hu me
  //   https://developers.google.com/maps/documentation/javascript/adding-a-legend  ye reference link hai idhar se dhekh ke for loop laga dena

  // const legend = document.getElementById("legend");

  // const div0 = document.createElement("div");
  // const div = document.createElement("div");
  // const div1 = document.createElement("div");
  // const div2 = document.createElement("div");

  // div0.innerHTML = '<p class="hed">Map Legends</p>>';
  // legend.appendChild(div0);
  // div.innerHTML =
  //   '<label class="para">Type A</label>' +
  //   '<img class="marker" src="A.png"> '
  //    +'<input id="checkbox" class="cbox" type="checkbox" value="0">'
  //    ;
  // legend.appendChild(div);
  // div1.innerHTML =
  //   '<label class="para">Type B</label>' +
  //   '<img class="marker" src="B.png"> ' 
  //   +'<input id="checkbox1" class="cbox" type="checkbox" value="1">'
  //   ;
  // legend.appendChild(div1);
  // div2.innerHTML =
  //   '<label class="para">Type C</label>' +
  //   '<img class="marker" src="C.png"> ' 
  //   +'<input id="checkbox2" class="cbox" type="checkbox" value="2">'
  //   ;
  // legend.appendChild(div2);
  // map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);

  
 var checkbox = document.getElementById("checkbox");
 var checkbox1 = document.getElementById("checkbox1");
 var checkbox2 = document.getElementById("checkbox2");
  
  
  

  var cordinateArr = [];
  var line = 0;
  
  for (let i = 0; i < markers.length; i++) {
    
    const currMarker = markers[i];
    const marker = new google.maps.Marker({
      position: { lat: currMarker[1], lng: currMarker[2] },
      // map,
      title: currMarker[0],
      icon: currMarker[3] + ".png",
      animation: google.maps.Animation.DROP,
    });
    
    points.push(marker);
    
    
    const infowindow = new google.maps.InfoWindow({
      content: currMarker[0],
    });

    marker.addListener("click", () => {
      //   infowindow.open(map, marker);
      position = {
        lat: currMarker[1],
        lng: currMarker[2],
        class: currMarker[3],
      };
      console.log(position);
      cordinateArr.push(this.position);

      if (line != 0) {
        line.setMap(null);
        line = 0;
      }

      if (cordinateArr.length == 2) {
        if (cordinateArr[0].class == cordinateArr[1].class) {
          // Draw a line showing the straight distance between the markers
          line = new google.maps.Polyline({
            path: [cordinateArr[0], cordinateArr[1]],
          });
          line.setMap(map);
          console.log(line);

          //Calculate and display the distance between markers
          var distance = haversine_distance(cordinateArr[0], cordinateArr[1]);
          distance = distance*1.6;
          document.getElementById('msg').innerHTML = "Distance between markers: " + (distance.toFixed(2)) + "Km";
          console.log(
            haversine_distance(cordinateArr[0], cordinateArr[1]).toFixed(2)
          );
        }

        cordinateArr = [];
      }
    });
  }
  
  checkbox.addEventListener('change', function(e) {
    
      for(let i =0;i<points.length;i++){
        if(points[i].title[0] == 'A'){
          if(checkbox.checked){
            points[i].setMap(map);
          }else{
            points[i].setMap(null);
          }
        }
      }
     
  });
  checkbox1.addEventListener('change', function(e) {
    for(let i =0;i<points.length;i++){
      if(points[i].title[0] == 'B'){
        if(checkbox1.checked){
          points[i].setMap(map);
        }else{
          points[i].setMap(null);
        }
      }
    }  
  });
  checkbox2.addEventListener('change', function(e) {
    for(let i =0;i<points.length;i++){
      if(points[i].title[0] == 'C'){
        if(checkbox2.checked){
          points[i].setMap(map);
        }else{
          points[i].setMap(null);
        }
      }
    }  
  });
  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d;
  }

  console.log(markers[0][3]);
  
}
