/*! service-centers - release: 1.4.2 */
import {
    w as e,
    b as t,
    $ as a
} from "./servicio.js";
const r = 2;
class i extends class {
    constructor(e) {}
    get _$AU() {
        return this._$AM._$AU
    }
    _$AT(e, t, a) {
        this._$Ct = e, this._$AM = t, this._$Ci = a
    }
    _$AS(e, t) {
        return this.update(e, t)
    }
    update(e, t) {
        return this.render(...t)
    }
} {
    constructor(t) {
        if (super(t), this.it = e, t.type !== r) throw Error(this.constructor.directiveName + "() can only be used in child bindings")
    }
    render(a) {
        if (a === e || null == a) return this.ft = void 0, this.it = a;
        if (a === t) return a;
        if ("string" != typeof a) throw Error(this.constructor.directiveName + "() called with a non-string value");
        if (a === this.it) return this.ft;
        this.it = a;
        const r = [a];
        return r.raw = r, this.ft = {
            _$litType$: this.constructor.resultType,
            strings: r,
            values: []
        }
    }
}
i.directiveName = "unsafeHTML", i.resultType = 1;
const n = (e => (...t) => ({
    _$litDirective$: e,
    values: t
}))(i);



let s, l, c, o, d, u, p, h, $, v, m, g, f, _ = e => e;

const k = {
        handleEvent(e) {
            document.querySelectorAll(".service-centers__menu__item > input").forEach((t => {
                const a = t.nextElementSibling.querySelector("span");
                e.target === t ? a ?.classList.replace("alk-icon-abajo", "alk-icon-arriba") : a ?.classList.replace("alk-icon-arriba", "alk-icon-abajo")
            }))
        },
        capture: !0
    },

    b = {
        handleEvent(e) {
            let t = e.target;
            if ("A" != t.tagName) return t.classList.contains("service-centers__menu__item__body") || (t = t.closest(".service-centers__menu__item__body")), A ?.clickMarker(t.dataset ?.serviceCenter)
        },
        capture: !1
    },
    C = {
        handleEvent(e) {
            const t = e.target.nextElementSibling.nextElementSibling;
            "true" == t.dataset.callCenter && (t.click(), A ?.map ?.setZoom(5))
        },
        capture: !1
    },
    y = {
        handleEvent(e) {
            A ?.bounceMarker(e.target.dataset.serviceCenter, "start")
        },
        capture: !1
    },
    E = {
        handleEvent(e) {
            A ?.bounceMarker(e.target.dataset.serviceCenter, "stop")
        },
        capture: !1
    };
let A = null;
let whatsApp;
class L {
    constructor(e, t) {
        this.serviceCenter = e, A = t
    }
    render() {
        let {
            id: e,
            name: t,
            active: r,
            isCallCenter: i,
            address: h,
            email: $,
            phone: A,
            cellphone: L,
            schedule: x,
            map: M,
            linkType: S,
            whatsapp: WA
        } = this.serviceCenter;

        whatsApp = WA;
        setTimeout(() => {
            functionWapp(this.serviceCenter)
        }, 50)
        return a(s || (s = _ `<div class="service-centers__menu__item"><input type="radio" @change="${0}" @click="${0}" name="centro-servicio" .id="${0}"> <label for="${0}">${0} <span class="${0}"></span></label><div class="service-centers__menu__item__body" data-call-center="${0}" data-service-center="${0}" @click="${0}" @mouseenter="${0}" @mouseleave="${0}">${0} ${0}<div class="contact-phones">${0} ${0}</div>${0} ${0} ${0}</div></div>`),
            k, C, e, e, n(t), r ? "alk-icon-arriba" : "alk-icon-abajo", i, e, b, y, E, h.length ?
            a(l || (l = _ `<div class="address"><p><strong><i class="alk-icon-llegada-ciudad"></i> Dirección:</strong> ${0}</p></div>`), n(h)) : "",
            $.length ? a(c || (c = _ `<div class="email"><p><strong><i class="alk-icon-email"></i> Email:</strong> <a href="mailto:${0}">${0}</a></p></div>`), $, $) : "",
            A.length ? a(o || (o = _ `<div class="phone"><p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong> ${0}</p></div>`), T(this.serviceCenter)) : "",
            L.length ? a(d || (d = _ `<div class="cell"><p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong> ${0}</p></div>`), w(this.serviceCenter)) : "",
            x.length ? a(u || (u = _ `<div class="schedule"><p><strong><i class="alk-icon-clock"></i> Horario:</strong> ${0}</p></div>`), function (e) {
                    let t = [];
                    const {
                        schedule: r
                    } = e;
                    for (const e of r) t = [...t, a(v || (v = _ `<span>${0}</span>`), n(e))];
                    return t
                }


                (this.serviceCenter)) : "", S.length ? function (e) {
                const {
                    link: t,
                    linkType: r,
                    name: i
                } = e;
                let n = "externo" !== r ? a(m || (m = _ `Para solicitar la garantía de su producto le agradecemos tener en cuenta las recomendaciones señaladas en el siguiente <a href="/politicas/politicas-garantia/c/politicas-garantia" title="Consulta más información de ${0}" rel="nofollow" target="_blank">link</a>`), i) : a(g || (g = _ `Para más información del centro de servicio por favor remitase al siguiente <a href="${0}" title="Consulta más información de ${0}" rel="nofollow" target="_blank">link</a>`), t, i);

                return a(f || (f = _ `<div class="message"><p>${0}</p></div>`), n)

            }(this.serviceCenter) : "", M.length ? a(p || (p = _ `<div class="how-to-get"><p><i class="alk-icon-arrive"></i><a rel="noopener" .href="${0}" title="Indicaciones para llegar a ${0}" target="_blank">¿Cómo llegar?</a></p></div>`), M, t) : "")


    }

}

function w(e, t = !0) {

    let r = [];
    h = "";
    const {
        name: i,
        cellphone: n,
    } = e;

    for (const e of n) r = t ? [...r, a(h || (h = _ `<a href="tel:${0}" title="Llamar aa ${0}">${0}</a>`), e.replace(/\s/g, ""), i, e)] : [...r, `<a href="tel:${e.replace(/\s/g,"")}" title="Llamar a ${i}">${e}</a>`];

    return r
}

function T(e, t = !0) {
    let r = [];
    const {
        areaCode: i,
        name: n,
        phone: s
    } = e;

    for (const e of s) r = t ? [...r, a($ || ($ = _ `<a href="tel:${0}${0}" title="Llamar a ${0}">${0}</a>`), i, e.replace(/\s/g, ""), n, e)] : [...r, `<a href="tel:${i}${e.replace(/\s/g,"")}" title="Llamar a ${n}">${e}</a>`];

    return r
}
const functionWapp = (e) => {
    console.log(e);
    let dataService = e.id;
    var matchingElements = document.querySelectorAll('[data-service-center="' + dataService + '"]');


    matchingElements.forEach((matchingElement) => {
        if (e.whatsapp.length !== 0) {
            const limpiarW = document.querySelector("#cont-wp");
            if (limpiarW) {
                limpiarW.remove();
            }
            let numbersWapp = e.whatsapp.map((wp) => {
                return `<a target="_blank" rel="noreferer noopener" title="Enviar un mensaje a ${e.name}" href="https://api.whatsapp.com/send/?phone=${wp}">Enviar WhatsApp a ${e.name}</a>`;
            }).join(" ");
            const scheduleW = matchingElement.querySelector(".schedule");
            if (scheduleW) {
                scheduleW.insertAdjacentHTML("beforebegin",
                    `<div class="contact-phones" id="cont-wp">
                        <div class="phone">
                            <p>
                                <strong><i class="alk-icon-whatsapp"></i>WhatsApp:</strong>
                                ${numbersWapp}
                            </p>
                        </div>
                    </div>`);
            }
        } else {
            console.log("No tiene WhatsApp");
        }
    });
}


export {
    L as Menu, T as getFormatedPhone, w as getFormatedCellphone
};