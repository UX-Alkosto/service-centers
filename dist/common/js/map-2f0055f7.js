/*! service-centers - release: 1.4.2 */
import {
    getFormatedPhone as e,
    getFormatedCellphone as t
} from "./menu-d4e6eb5c.js";
import "./servicio.js";
const n = window.google;
class s {
    constructor({
        $element: e,
        baseSite: t,
        center: s,
    }) {
        this.$element = document.querySelector(e), this.baseSite = t, this.bounds, this.center = s, this.geocoder = new n.maps.Geocoder, this.infoWindow = new n.maps.InfoWindow, this.markers = {}, this.map, this.init()
    }
    bounceMarker(e, t) {
        void 0 !== this.markers[e] && ("start" === t ? this.markers[e].setAnimation(n.maps.Animation.BOUNCE) : this.markers[e].setAnimation(null))
    }
    clickMarker(e) {
        void 0 !== this.markers[e] && n.maps.event.trigger(this.markers[e], "click")
    }
    async init() {
        return this.map = await new n.maps.Map(this.$element, {
            center: new n.maps.LatLng(this.center),
            disableDefaultUI: !0,
            draggable: !0,
            zoom: 10,
            zoomControl: !0
        }), this.map
    }
    setInfoWindow(n) {
        const {
            address: s,
            cellphone: i,
            map: o,
            name: a,
            phone: r
        } = n, c = e(n, !1), m = t(n, !1);
        return `<div class="service-centers__map__info-window">\n<button class="service-centers__map__info-window__close"><span class="alk-icon-close"></span></button>\n<h4>${a}</h4>\n${s.length?`<p><strong>Dirección:</strong><br />\n ${s}\n</p>`:""}\n${r.length?`<p><strong>Contacto telefónico:</strong><br />\n ${c.join(" ")}\n</p>`:""}\n${s.length||r.length||!i.length?"":`<p><strong>Contacto telefónico:</strong><br />\n ${m.join(" ")}\n</p>`}\n${o.length?` <p><i class="alk-icon-exportar"></i>\n <a rel="noopener" href="${o}" title="Indicaciones para llegar a ${a}" target="_blank">¿Cómo llegar?</a>\n</p>`:""}\n        </div>`
    }
    setMarkers(e) {
        return this.bounds = new n.maps.LatLngBounds, this.clearMarkers(), this.markers = {}, e.map((e => {
            const {
                coordinates: t,
                id: s,
                name: i
            } = e, o = new n.maps.Marker({
                position: new n.maps.LatLng(t.lat, t.lng),
                map: this.map,
                icon: `https://cdn.jsdelivr.net/gh/ux-alkosto/service-centers/dist/${this.baseSite}/img/pin.svg`,
                title: i
            });
            o.addListener("click", (() => {
                this.infoWindow.setContent(this.setInfoWindow(e)), this.infoWindow.open(this.map, o), this.map.panTo(o.getPosition()), document.dispatchEvent(new CustomEvent("updateCenter", {
                    detail: {
                        center: s
                    }
                }))
            })), this.bounds.extend(o.getPosition()), this.markers[s] = o
        })), this.map.setCenter(this.bounds.getCenter()), this.map.fitBounds(this.bounds), this.map.getZoom() > 18 && this.map.setZoom(18), this.markers
    }
    clearMarkers() {
        return Object.values(this.markers).map((e => e.setMap(null)))
    }
}
export {
    s as Map
};