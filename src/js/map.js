
const map = {
    bounceMarker: (serviceCenterId, status) => {
        // Find the correct marker to bounce based on the serviceCenterId.
        if (markers.length) {
            if (markers[serviceCenterId] !== undefined) {
                if (status == "start") markers[serviceCenterId].setAnimation(google.maps.Animation.BOUNCE)
                else markers[serviceCenterId].setAnimation(null)
            }
        }
    },
    getGeo: async () => {
        try {
            return await getCoordinates().then(response => response)
        } catch (error) {
            return error
        }
    },
    renderMarkers: async serviceCenterPoints => {
        bounds = new google.maps.LatLngBounds()
        markers.map(marker => marker.setMap(null))
        serviceCenterPoints.map(serviceCenter => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(serviceCenter.coordinates.lat, serviceCenter.coordinates.lng),
                map: mapElement,
                icon: `/dist/${serviceCentersConfig.site}/img/pin.svg`,
                title: serviceCenter.name
            })
            marker.addListener('click', (event) => {
                console.log(event)
            })
            bounds.extend(marker.getPosition())
            markers[serviceCenter.id] = marker
        })
        mapElement.setCenter(bounds.getCenter())
        mapElement.fitBounds(bounds)
        if (mapElement.getZoom() > 18) mapElement.setZoom(18)
    },
    init: async $element => {
        mapElement = await new google.maps.Map(document.querySelector($element), {
            center: new google.maps.LatLng(4.6482837, -74.2478938),
            disableDefaultUI: true,
            draggable: false,
            zoom: 10,
            zoomControl: true,
        })
        geocoder = new google.maps.Geocoder()
        infoWindow = new google.maps.InfoWindow()
        return mapElement
    }
}
let bounds, geocoder, infoWindow, mapElement, markers = [];

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
export { geocoder, infoWindow, markers, map }
