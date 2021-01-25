export default class ServiceCenter {
    constructor({
        address= '',
        cellphone = '',
        coordinates = {},
        email = '',
        hours = '',
        id = '',
        phone = '',
        title = ''
    }){
        this.active = false
        this.address = address
        this.cellphone = cellphone
        this.coordinates = coordinates
        this.email = email
        this.hours = hours
        this.id = id
        this.name = title
        this.phone = phone
    }

    get activeCenter(){
        return this.active
    }

    set activeCenter(active){
        return this.active = active
    }
}