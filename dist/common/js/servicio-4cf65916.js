/*! service-centers - release: 1.0.9 */
export default class{constructor({address:s="",areaCode:e="",cell:t=[],coordinates:i={},hours:h=[],id:a="",name:o="",phone:r=[],viewMap:c=""}){this.address=s,this.areaCode=e,this.cellphone=t,this.coordinates=i,this.hours=h,this.id=a,this.isActive=!1,this.name=o,this.phone=r,this.map=c}get active(){return this.isActive}set active(s){this.isActive=s}}
