/*! service-centers - v1.0.8 */
export default class ServiceCenter{constructor({address:e="",areaCode:s="",cell:t=[],coordinates:i={},hours:h=[],id:a="",name:r="",phone:o=[],viewMap:c=""}){this.address=e,this.areaCode=s,this.cellphone=t,this.coordinates=i,this.hours=h,this.id=a,this.isActive=!1,this.name=r,this.phone=o,this.map=c}get active(){return this.isActive}set active(e){this.isActive=e}};