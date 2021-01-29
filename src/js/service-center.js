export default class ServiceCenter {
    constructor({
        address= '',
        cell = [],
        coordinates = {},
        hours = [],
        id = '',
        name = '',
        phone = [],
        viewMap = ""
    }){
        this.isActive = false
        this.address = address
        this.cellphone = cell
        this.coordinates = coordinates
        this.hours = hours
        this.id = id
        this.name = name
        this.phone = phone
        this.map = viewMap
    }

    get active(){
        return this.isActive
    }

    set active(active){
        return this.isActive = active
    }
}