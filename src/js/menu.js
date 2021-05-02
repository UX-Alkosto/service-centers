import { html } from "lit-html";

export default class Menu {
    constructor(itemMenu = {}, mapElement) {
        this.active = itemMenu.active;
        this.address = itemMenu.address;
        this.areaCode = itemMenu.areaCode;
        this.cellphone = itemMenu.cellphone;
        this.id = itemMenu.id;
        this.map = itemMenu.map;
        this.name = itemMenu.name;
        this.phone = itemMenu.phone;
        map = mapElement;
    }
    item() {
        let cellPhoneNumbers = [];
        let phoneNumbers = [];

        for (const phoneNumber of this.phone) {
            phoneNumbers.push(html`<a href="tel:+57${this.areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${this.name}">${phoneNumber}</a>`);
        }
        for (const cellPhoneNumber of this.cellphone) {
            cellPhoneNumbers.push(html`<a href="tel:+57${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${this.name}">${cellPhoneNumber}</a>`);
        }
        return html`<div class="service-centers__menu__item">
            <input type="radio" @change=${_changeHandler} name="centro-servicio" .id="${this.id}" ?checked="${this.active}">
            <label for="${this.id}">${this.name}<span class="${this.active ? "alk-icon-arrow-up" : "alk-icon-arrow-down"}"></span></label>
            <div class="service-centers__menu__item__body" data-service-center="${this.id}" @mouseenter=${_mouseEnterHandler} @mouseleave=${_mouseLeaveHandler}>
                <div class="address">
                    <p><strong><i class="alk-icon-rounded-position"></i> Dirección:</strong>
                        ${this.address}</p>
                </div>
                <div class="contact-phones">
                    ${this.phone.length ? html`<div class="phone">
                        <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                            ${phoneNumbers}
                        </p>
                    </div>` : ""}
                    ${this.cellphone.length ? html`<div class="cell">
                        <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                            ${cellPhoneNumbers}
                        </p>
                    </div>` : ""}
                </div>
                <div class="how-to-get">
                    <p>
                        <i class="alk-icon-arrive"></i><a rel="noopener" .href="${this.map}" title="Indicaciones para llegar a ${this.name}" target="_blank">¿Cómo llegar?</a>
                    </p>
                </div>
            </div>
        </div>`;
    }
}

let map = null;

const menuItems = document.querySelectorAll(".service-centers__menu__item > input"),
    _changeHandler = {
        handleEvent(e) {
            menuItems.forEach(otherMenuItem => {
                const icon = otherMenuItem.nextElementSibling.querySelector("span");
                if (e.target === otherMenuItem) {
                    icon.classList.replace("alk-icon-arrow-down", "alk-icon-arrow-up");
                } else {
                    icon.classList.replace("alk-icon-arrow-up", "alk-icon-arrow-down");
                }
            });
        },
        capture: true
    },
    _mouseEnterHandler = {
        handleEvent(e) {
            map.bounceMarker(e.target.dataset.serviceCenter, "start");
        },
        capture: true
    },
    _mouseLeaveHandler = {
        handleEvent(e) {
            map.bounceMarker(e.target.dataset.serviceCenter, "stop");
        },
        capture: true
    };