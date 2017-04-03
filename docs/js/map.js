var map;

function showMap(latLng){
    map = new google.maps.Map(document.getElementById('map'), 
        {
          center: latLng,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          zoom: 18,
           });
}

function addMarker(latLng, label){
    var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            label:label
          });


}



function getUserPosition()
{
	function itWorks(position) 
	{
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
     	console.log('latitude: '+latitude);
     	console.log('longitude: '+longitude);
     	var userLatLng = new google.maps.LatLng({lat: latitude, lng: longitude});
		showMap(userLatLng);
		addMarker(userLatLng,"A");
 	}

 	function itDoesntWork(error) 
 	{
      	console.log('There is an error '+error);
 	}
    navigator.geolocation.getCurrentPosition(itWorks, itDoesntWork);
}

function init(){
	getUserPosition()
}

window.addEventListener("load",init,false);