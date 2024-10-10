import { html } from "lit/html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
export { Menu, getFormatedPhone, getFormatedCellphone };

const _changeHandler = {
        handleEvent(e) {
            document.querySelectorAll(".service-centers__menu__item > input").forEach(otherMenuItem => {
                const icon = otherMenuItem.nextElementSibling.querySelector("span");
                if (e.target === otherMenuItem) {
                    icon?.classList.replace("alk-icon-abajo", "alk-icon-arriba");
                } else {
                    icon?.classList.replace("alk-icon-arriba", "alk-icon-abajo");
                }
            });
        },
        capture: true
    },
    _bodyClickHandler = {
        handleEvent(e) {
            let target = e.target;
            if (target.tagName == "A") return;
            if (target.classList.contains("service-centers__menu__item__body")) {
                return map?.clickMarker(target.dataset?.serviceCenter);
            }
            target = target.closest(".service-centers__menu__item__body");
            return map?.clickMarker(target.dataset?.serviceCenter);
        },
        capture: false
    },
    _clickHandler = {
        handleEvent(e) {
            const body = e.target.nextElementSibling.nextElementSibling;
            if (body.dataset.callCenter == "true") {
                body.click();
                map?.map?.setZoom(5);
            }
        },
        capture: false
    },
    _mouseEnterHandler = {
        handleEvent(e) {
            map?.bounceMarker(e.target.dataset.serviceCenter, "start");
        },
        capture: false
    },
    _mouseLeaveHandler = {
        handleEvent(e) {
            map?.bounceMarker(e.target.dataset.serviceCenter, "stop");
        },
        capture: false
    };

let map = null;

class Menu {
    constructor(serviceCenter, mapElement) {
        this.serviceCenter = serviceCenter;
        map = mapElement;
    }
    render() {
        const { id, name, active, isCallCenter, address, email, phone, cellphone, schedule, map, linkType } = this.serviceCenter;
        return html`<div class="service-centers__menu__item">
            <input type="radio" @change=${_changeHandler} @click=${_clickHandler}
                name="centro-servicio" .id="${id}">
            <label for="${id}">
                ${unsafeHTML(name)}
                <span class="${active ?
                    "alk-icon-arriba" : "alk-icon-abajo"}"></span>
            </label>
            <div class="service-centers__menu__item__body"
                data-call-center="${isCallCenter}"
                data-service-center="${id}"
                @click=${_bodyClickHandler} @mouseenter=${_mouseEnterHandler}
                @mouseleave=${_mouseLeaveHandler}>
                ${address.length ? html`<div class="address">
                    <p><strong><i class="alk-icon-llegada-ciudad"></i> Dirección:</strong>
                        ${unsafeHTML(address)}</p>
                </div>` : ""}
                ${email.length ? html`<div class="email">
                    <p><strong><i class="alk-icon-email"></i> Email:</strong>
                        <a href="mailto:${email}">${email}</a>
                    </p>
                </div>` : ""}
                <div class="contact-phones">
                    ${phone.length ? html`<div class="phone">
                        <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                            ${getFormatedPhone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                    ${cellphone.length ? html`<div class="cell">
                        <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                            ${getFormatedCellphone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                </div>
                ${schedule.length ? html`<div class="schedule">
                    <p><strong><i class="alk-icon-clock"></i> Horario:</strong>
                            ${getFormatedSchedule(this.serviceCenter)}
                        </p>
                </div>` : ""}
                ${linkType.length ? getInfoMessage(this.serviceCenter) : ""}
                ${map.length ? html`<div class="how-to-get">
                    <p>
                        <i class="alk-icon-arrive"></i><a rel="noopener" .href="${map}" title="Indicaciones para llegar a ${name}" target="_blank">¿Cómo llegar?</a>
                    </p>
                </div>`: ""}
            </div>
        </div>`;
    }
}

function getFormatedCellphone(location, returnHtml = true) {
    let cellPhoneNumbers = [];
    const { name, cellphone } = location;
    for (const cellPhoneNumber of cellphone) {
        if (returnHtml) {
            cellPhoneNumbers = [...cellPhoneNumbers, html`<a href="tel:${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${cellPhoneNumber}</a>`];
        } else {
            cellPhoneNumbers = [...cellPhoneNumbers, `<a href="tel:${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${cellPhoneNumber}</a>`];
        }
    }
    return cellPhoneNumbers;
}

function getFormatedPhone(location, returnHtml = true) {
    let phoneNumbers = [];
    const {areaCode, name, phone} = location;
    for (const phoneNumber of phone) {
        if (returnHtml) {
            phoneNumbers = [...phoneNumbers, html`<a href="tel:${areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${phoneNumber}</a>`];
        } else {
            phoneNumbers = [...phoneNumbers, `<a href="tel:${areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${phoneNumber}</a>`];
        }
    }
    return phoneNumbers;
}

function getFormatedSchedule(location) {
    let scheduleItems = [];
    const {schedule} = location;
    for (const scheduleItem of schedule) {
        scheduleItems = [...scheduleItems,html`<span>${unsafeHTML(scheduleItem)}</span>`];
    }
    return scheduleItems;
}

function getInfoMessage(location) {
    const { link, linkType, name} = location;
    let message = (linkType !== "externo") ?
        html`Para solicitar la garantía de su producto le agradecemos tener en cuenta las recomendaciones señaladas en el siguiente <a href="/politicas/politicas-garantia/c/politicas-garantia" title="Consulta más información de ${name}" rel="nofollow" target="_blank">link</a>` :
        html`Para más información del centro de servicio por favor remitase al siguiente <a href="${link}" title="Consulta más información de ${name}" rel="nofollow" target="_blank">link</a>`;
    return html`<div class="message"><p>${message}</p></div>`;
}