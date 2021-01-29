export default class ServiceCenter {
    constructor({
        address= '',
        cell = [],
        coordinates = {},
        email = [],
        hours = [],
        id = '',
        phone = [],
        title = ''
    }){
        this.isActive = false
        this.address = address
        this.cellphone = cell
        this.coordinates = coordinates
        this.email = email
        this.hours = hours
        this.id = id
        this.name = title
        this.phone = phone
    }

    get active(){
        return this.isActive
    }

    set active(active){
        return this.isActive = active
    }
}