import { html } from "lit/html.js";
export { Menu as default, getFormatedPhone };
class Menu {
    constructor(itemMenu = {}, mapElement) {
        this.active = itemMenu.active;
        this.address = itemMenu.address;
        this.areaCode = itemMenu.areaCode;
        this.cellphone = itemMenu.cellphone;
        this.email = itemMenu.email;
        this.id = itemMenu.id;
        this.map = itemMenu.map;
        this.name = itemMenu.name;
        this.phone = itemMenu.phone;
        this.schedule = itemMenu.schedule;
        map = mapElement;
    }
    item() {
        return html`<div class="service-centers__menu__item">
            <input type="radio" @change=${_changeHandler} name="centro-servicio" .id="${this.id}" ?checked="${this.active}">
            <label for="${this.id}">${this.name}<span class="${this.active ? "alk-icon-arrow-up" : "alk-icon-arrow-down"}"></span></label>
            <div class="service-centers__menu__item__body" data-service-center="${this.id}" @mouseenter=${_mouseEnterHandler} @mouseleave=${_mouseLeaveHandler}>
                ${this.address.length ? html`<div class="address">
                    <p><strong><i class="alk-icon-rounded-position"></i> Dirección:</strong>
                        ${this.address}</p>
                </div>` : ""}
                ${this.email.length ? html`<div class="email">
                    <p><strong><i class="alk-icon-email1"></i> Email:</strong>
                        ${getFormatedEmail(this)}</p>
                </div>` : ""}
                <div class="contact-phones">
                    ${this.phone.length ? html`<div class="phone">
                        <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                            ${getFormatedPhone(this)}
                        </p>
                    </div>` : ""}
                    ${this.cellphone.length ? html`<div class="cell">
                        <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                            ${getFormatedCellphone(this)}
                        </p>
                    </div>` : ""}
                </div>
                ${this.schedule.length ? html`<div class="schedule">
                    <p><strong><i class="alk-icon-clock"></i> Horario:</strong>
                            ${getFormatedSchedule(this)}
                        </p>
                </div>` : ""}
                ${this.map.length ? html`<div class="how-to-get">
                    <p>
                        <i class="alk-icon-arrive"></i><a rel="noopener" .href="${this.map}" title="Indicaciones para llegar a ${this.name}" target="_blank">¿Cómo llegar?</a>
                    </p>
                </div>`: ""}
            </div>
        </div>`;
    }
}

function getFormatedCellphone(location) {
    const cellPhoneNumbers = [];
    for (const cellPhoneNumber of location.cellphone) {
        cellPhoneNumbers.push(html`<a href="tel:+57${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${cellPhoneNumber}</a>`);
    }
    return cellPhoneNumbers;
}

function getFormatedEmail(location) {
    let emailItems = [];
    for (const emailItem of location.email) {
        emailItems.push(html`<a href="mailto:${emailItem}">${emailItem}</a>`);
    }
    return emailItems;
}

function getFormatedPhone(location, returnHtml = true) {
    const phoneNumbers = [];
    for (const phoneNumber of location.phone) {
        if (returnHtml) {
            phoneNumbers.push(html`<a href="tel:+57${location.areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${phoneNumber}</a>`);
        } else {
            phoneNumbers.push(`<a href="tel:+57${location.areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${phoneNumber}</a>`);
        }
    }
    return phoneNumbers;
}

function getFormatedSchedule(location) {
    let scheduleItems = [];
    for (const scheduleItem of location.schedule) {
        scheduleItems.push(html`<span>${scheduleItem}</span>`);
    }
    return scheduleItems;
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