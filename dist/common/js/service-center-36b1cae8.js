/*! service-centers - release: 1.4.2 */
class i {
    constructor({
        address: i = "",
        areaCode: t = "",
        cell: e = [],
        city: s = "",
        coordinates: h = {},
        email: a = "",
        hours: c = [],
        id: l = "",
        link: n = "",
        type: r = "",
        name: o = "",
        phone: d = [],
        schedule: p = [],
        viewMap: m = "",
        whatsapp: wa = []
    }) {
        this.address = i, this.areaCode = t, this.cellphone = e, this.city = s, this.coordinates = h, this.email = a, this.hours = c, this.id = l, this.isActive = !1, this.link = n, this.linkType = r, this.name = o, this.phone = d, this.schedule = p, this.map = m, this.whatsapp = wa
    }
    get active() {
        return this.isActive
    }
    set active(i) {
        this.isActive = i
    }
    get isCallCenter() {
        return !(!this.city.match("linea-nacional") && !this.id.match("call-center"))
    }
}
export {
    i as ServiceCenter
};