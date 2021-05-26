import { getFormatedPhone, getFormatedCellphone } from "./menu";
const google = window.google;
export class Map {
    constructor({
        $element,
        baseSite,
        center
    }) {
        this.$element = document.querySelector($element),
        this.baseSite = baseSite,
        this.bounds,
        this.center = center,
        this.geocoder = new google.maps.Geocoder(),
        this.infoWindow = new google.maps.InfoWindow(),
        this.markers = {},
        this.map;

        this.init();
    }

    bounceMarker(locationId, status) {
        // Find the correct marker to bounce based on the locationId.
        if (this.markers[locationId] !== undefined) {
            if (status === "start") this.markers[locationId].setAnimation(google.maps.Animation.BOUNCE);
            else this.markers[locationId].setAnimation(null);
        }
    }

    clickMarker(locationId) {
        if (this.markers[locationId] !== undefined) google.maps.event.trigger(this.markers[locationId], "click");
    }

    async init() {
        this.map = await new google.maps.Map(this.$element, {
            center: new google.maps.LatLng(this.center),
            disableDefaultUI: true,
            draggable: true,
            zoom: 10,
            zoomControl: true,
        });
        return this.map;
    }

    setInfoWindow(location) {
        const phones = getFormatedPhone(location, false);
        const cellphone = getFormatedCellphone(location, false);
        return `<div class="service-centers__map__info-window">
            <button class="service-centers__map__info-window__close"><span class="alk-icon-close"></span></button>
            <h4>${location.name}</h4>
            ${location.address.length ? `<p><strong>Dirección:</strong><br />
                ${location.address}
            </p>` : ""}
            ${location.phone.length ? `<p><strong>Contacto telefónico:</strong><br />
                ${phones.join(" ")}
            </p>` : ""}
            ${(!location.address.length && !location.phone.length) && location.cellphone.length ? `<p><strong>Contacto telefónico:</strong><br />
                ${cellphone.join(" ")}
            </p>` : ""}
            ${location.map.length ? ` <p><i class="alk-icon-exportar"></i>
                <a rel="noopener" href="${location.map}" title="Indicaciones para llegar a ${location.name}" target="_blank">¿Cómo llegar?</a>
            </p>` : ""}
        </div>`;
    }

    async setMarkers(locationPoints) {
        this.bounds = new google.maps.LatLngBounds();
        this.clearMarkers();
        this.markers = {};
        locationPoints.map(location => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(location.coordinates.lat, location.coordinates.lng),
                map: this.map,
                icon: `https://cdn.jsdelivr.net/gh/ux-alkosto/service-centers/dist/${this.baseSite}/img/pin.svg`,
                title: location.name
            });
            marker.addListener("click", () => {
                this.infoWindow.setContent(this.setInfoWindow(location));
                this.infoWindow.open(this.map, marker);
                this.map.panTo(marker.getPosition());
                document.dispatchEvent(new CustomEvent("updateCenter", { detail: { center: location.id } }));
            });
            this.bounds.extend(marker.getPosition());
            this.markers[location.id] = marker;
        });
        this.map.setCenter(this.bounds.getCenter());
        this.map.fitBounds(this.bounds);
        if (this.map.getZoom() > 18)
            this.map.setZoom(18);
        return this.markers;
    }

    clearMarkers(){
        return Object.values(this.markers).map(marker => marker.setMap(null));
    }
}