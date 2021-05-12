/*! service-centers - release: 1.1.2 */
import{getFormatedPhone as e,getFormatedCellphone as t}from"./menu-7e915bea.js";import"./servicio.js";const n=window.google;class s{constructor({$element:e,baseSite:t,center:s}){this.$element=document.querySelector(e),this.baseSite=t,this.bounds,this.center=s,this.geocoder=new n.maps.Geocoder,this.infoWindow=new n.maps.InfoWindow,this.markers={},this.map,this.init()}bounceMarker(e,t){void 0!==this.markers[e]&&("start"===t?this.markers[e].setAnimation(n.maps.Animation.BOUNCE):this.markers[e].setAnimation(null))}clickMarker(e){void 0!==this.markers[e]&&n.maps.event.trigger(this.markers[e],"click")}async init(){return this.map=await new n.maps.Map(this.$element,{center:new n.maps.LatLng(this.center),disableDefaultUI:!0,draggable:!0,zoom:10,zoomControl:!0}),this.map}setInfoWindow(n){const s=e(n,!1),i=t(n,!1);return`<div class="service-centers__map__info-window">\n            <button class="service-centers__map__info-window__close"><span class="alk-icon-close"></span></button>\n            <h4>${n.name}</h4>\n            ${n.address.length?`<p><strong>Dirección:</strong><br />\n                ${n.address}\n            </p>`:""}\n            ${n.phone.length?`<p><strong>Contacto telefónico:</strong><br />\n                ${s.join(" ")}\n            </p>`:""}\n            ${n.address.length||n.phone.length||!n.cellphone.length?"":`<p><strong>Contacto telefónico:</strong><br />\n                ${i.join(" ")}\n            </p>`}\n            ${n.map.length?` <p><i class="alk-icon-exportar"></i>\n                <a rel="noopener" href="${n.map}" title="Indicaciones para llegar a ${n.name}" target="_blank">¿Cómo llegar?</a>\n            </p>`:""}\n        </div>`}async setMarkers(e){return this.bounds=new n.maps.LatLngBounds,this.clearMarkers(),this.markers={},e.map((e=>{const t=new n.maps.Marker({position:new n.maps.LatLng(e.coordinates.lat,e.coordinates.lng),map:this.map,icon:`https://cdn.jsdelivr.net/gh/ux-alkosto/service-centers@latest/dist/${this.baseSite}/img/pin.svg`,title:e.name});t.addListener("click",(()=>{this.infoWindow.setContent(this.setInfoWindow(e)),this.infoWindow.open(this.map,t),this.map.panTo(t.getPosition()),document.dispatchEvent(new CustomEvent("updateCenter",{detail:{center:e.id}}))})),this.bounds.extend(t.getPosition()),this.markers[e.id]=t})),this.map.setCenter(this.bounds.getCenter()),this.map.fitBounds(this.bounds),this.map.getZoom()>18&&this.map.setZoom(18),this.markers}clearMarkers(){return Object.values(this.markers).map((e=>e.setMap(null)))}}export{s as Map};
