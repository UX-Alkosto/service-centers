
export const app = {
    getGeo: async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    map.setCenter(pos) //center map based on geolocation
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter())
                }
            )
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter())
        }
    },
    init: async $element => {
        map = await new google.maps.Map(document.querySelector($element), {
            center: {
                lat: 4.6482837,
                lng: -74.2478938
            },
            disableDefaultUI: true,
            draggable: false,
            zoom: 9,
            zoomControl: true,
        })
        infoWindow = new google.maps.InfoWindow()
    }
}
let infoWindow, map;
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    )
    infoWindow.open(map)
}
