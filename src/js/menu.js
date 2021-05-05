import { html } from "lit/html.js";
export { Menu, getFormatedPhone };

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

let map = null;

class Menu {
    constructor(serviceCenter, mapElement) {
        this.serviceCenter = serviceCenter;
        map = mapElement;
    }
    render() {
        return html`<div class="service-centers__menu__item">
            <input type="radio" @change=${_changeHandler} name="centro-servicio" .id="${this.serviceCenter.id}" ?checked="${this.serviceCenter.active}">
            <label for="${this.serviceCenter.id}">${this.serviceCenter.name}<span class="${this.serviceCenter.active ? "alk-icon-arrow-up" : "alk-icon-arrow-down"}"></span></label>
            <div class="service-centers__menu__item__body" data-service-center="${this.serviceCenter.id}" @mouseenter=${_mouseEnterHandler} @mouseleave=${_mouseLeaveHandler}>
                ${this.serviceCenter.address.length ? html`<div class="address">
                    <p><strong><i class="alk-icon-rounded-position"></i> Dirección:</strong>
                        ${this.serviceCenter.address}</p>
                </div>` : ""}
                ${this.serviceCenter.email.length ? html`<div class="email">
                    <p><strong><i class="alk-icon-email1"></i> Email:</strong>
                        <a href="mailto:${this.serviceCenter.email}">${this.serviceCenter.email}</a>
                    </p>
                </div>` : ""}
                <div class="contact-phones">
                    ${this.serviceCenter.phone.length ? html`<div class="phone">
                        <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                            ${getFormatedPhone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                    ${this.serviceCenter.cellphone.length ? html`<div class="cell">
                        <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                            ${getFormatedCellphone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                </div>
                ${this.serviceCenter.schedule.length ? html`<div class="schedule">
                    <p><strong><i class="alk-icon-clock"></i> Horario:</strong>
                            ${getFormatedSchedule(this.serviceCenter)}
                        </p>
                </div>` : ""}
                ${this.serviceCenter.map.length ? html`<div class="how-to-get">
                    <p>
                        <i class="alk-icon-arrive"></i><a rel="noopener" .href="${this.serviceCenter.map}" title="Indicaciones para llegar a ${this.name}" target="_blank">¿Cómo llegar?</a>
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