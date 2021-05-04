export default class ServiceCenter {
    constructor({
        address = "",
        areaCode = "",
        cell = [],
        city = "",
        coordinates = {},
        email = [],
        hours = [],
        id = "",
        link = "",
        type = "",
        name = "",
        phone = [],
        schedule = [],
        viewMap = ""
    }) {
        this.address = address;
        this.areaCode = areaCode;
        this.cellphone = cell;
        this.city = city;
        this.coordinates = coordinates;
        this.email = email;
        this.hours = hours;
        this.id = id;
        this.isActive = false;
        this.link = link;
        this.linkType = type;
        this.name = name;
        this.phone = phone;
        this.schedule = schedule;
        this.map = viewMap;
    }

    get active() {
        return this.isActive;
    }

    set active(active) {
        this.isActive = active;
    }

    get isCallCenter() {
        return (this.city.match("linea-nacional")) ? true : false;
    }
}