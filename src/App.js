// set map options

var myLatlng = {lat: 38.3460, lng: -0.4907};
var mapOptions = {
    center: myLatlng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map

var map =new google.naps.Map(document.getElementById("googleMap"),mapOptions);

//create a directions service object to use the route method and get a result

var directionsService = new google.maps.DirectionsService();

//create a directionsRender object which we will use to display rule

var directionsDisplay = new google.maps.DirectionsRender();

//bind the directionsRender to the map 

directionsDisplay.setMap(map);

//function

function calcRoute(){
        //create request
        var request ={
            origin: document.getElementById("from").ariaValueMax,
            destination: document.getElementById("to").ariaValueMax,
            travelMode : google.maps.travelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
        }

        //pass the request to the route method
        directionsService.route(request,(result,status) => {
            if(status==google.maps.DirectionsStatus.OK){
                    //get distance and time
                    const output = document.querySelector('#output');
                    output.innerHTML = "<div class='alert-info'> From: " + document.getElementById("from").value + ".<br/>To:" + document.getElementById("To").value + ".<br/> Driving distance <i class='fa-solid fa-road'></i>:" + result.routes[0].legs[0].distance.text + ".<br/>Duration <i class='fa-solid fa-hourglass-start'></i>:" + result.routes[0].legs[0].duration.text +".</div>";

                    //display route
                    directionsDisplay.setDirections(result);
            }else{
                //delete route from map
                directionsDisplay.setDirections({routes:[]});

                //center map in india

                map.setCenter(myLatlng);

                //show error message
                output.innerHTML="<div class='alert-danger'><i class='fa-solid fa-triangle-exclamation'></i> Coulnot retrieve driving license.</div>";

            }
        });
}

//create autocomplete objects for all input

var options ={
    types: ['(cities']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1,options)

var input2 = document.getElementById("To");
var autocomplete2 = new google.maps.places.Autocomplete(input2,options)