export default class Map {
    constructor({
        $element,
        baseSite
    }) {
        this.$element = $element,
        this.baseSite = baseSite,
        this.bounds,
        this.geocoder = new google.maps.Geocoder(),
        this.infoWindow = new google.maps.InfoWindow(),
        this.markers = {},
        this.map

        this.init()
    }

    bounceMarker(locationId, status) {
        // Find the correct marker to bounce based on the locationId.
        if (this.markers[locationId] !== undefined) {
            if (status === "start") this.markers[locationId].setAnimation(google.maps.Animation.BOUNCE)
            else this.markers[locationId].setAnimation(null)
        }
    }

    async getGeo(){
        try {
            return await getCoordinates().then(response => response)
        } catch (error) {
            return error
        }
    }

    async init(){
        this.map = await new google.maps.Map(document.querySelector(this.$element), {
            center: new google.maps.LatLng(4.6482837, -74.2478938),
            disableDefaultUI: true,
            draggable: true,
            zoom: 10,
            zoomControl: true,
        })
        return this.map
    }

    setInfoWindow(location) {
        return `<div class="service-centers__map__info-window">
            <h4>${location.name}</h4>
            <p><strong>Dirección:</strong><br />
            ${location.address}
            </p>
            <p>
            <a rel="noopener" href="${location.map}" title="Indicaciones para llegar a ${location.name}" target="_blank">¿Cómo llegar?</a>
            </p>
        </div>`;
    }

    async setMarkers(locationPoints) {
        this.bounds = new google.maps.LatLngBounds()
        Object.values(this.markers).map(marker => marker.setMap(null))
        this.markers = {}
        locationPoints.map(location => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
                map: this.map,
                icon: `https://cdn.jsdelivr.net/gh/ux-alkosto/service-centers@latest/dist/${this.baseSite}/img/pin.svg`,
                title: location.name
            })
            marker.addListener('click', () => {
                this.infoWindow.setContent(this.setInfoWindow(location))
                this.infoWindow.open(this.map, marker)
                this.map.panTo(marker.getPosition())
            })
            this.bounds.extend(marker.getPosition())
            this.markers[location.id] = marker
        })
        this.map.setCenter(this.bounds.getCenter())
        this.map.fitBounds(this.bounds)
        if (this.map.getZoom() > 18) this.map.setZoom(18)
        return this.markers
    }
}

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