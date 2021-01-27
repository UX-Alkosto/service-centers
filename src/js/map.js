
const app = {
    getGeo: async () => {
        try {
            return await getCoordinates().then(response => response)
        } catch (error) {
            return error
        }
    },
    init: async $element => {
        map = await new google.maps.Map(document.querySelector($element), {
            center: new google.maps.LatLng(4.6482837, -74.2478938),
            disableDefaultUI: true,
            draggable: false,
            zoom: 10,
            zoomControl: true,
        })
        infoWindow = new google.maps.InfoWindow()
        geocoder = new google.maps.Geocoder()
        return map
    }
}
let geocoder, infoWindow, map;

async function getCoordinates() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                })
            },
            error => {
                reject(error)
            }
        )
    })
}
export {geocoder, infoWindow, app}
