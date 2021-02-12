export default class ServiceCenter {
    constructor({
        address= "",
        areaCode="",
        cell = [],
        coordinates = {},
        hours = [],
        id = "",
        name = "",
        phone = [],
        viewMap = ""
    }){
        this.address = address;
        this.areaCode = areaCode;
        this.cellphone = cell;
        this.coordinates = coordinates;
        this.hours = hours;
        this.id = id;
        this.isActive = false;
        this.name = name;
        this.phone = phone;
        this.map = viewMap;
    }

    get active(){
        return this.isActive;
    }

    set active(active){
        this.isActive = active;
    }
}