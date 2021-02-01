/*! service-centers - v1.0.0 */
import Map from"./map.js";import Select from"./select.js";import ServiceCenter from"./service-center.js";(()=>{const e={get:async(e="")=>{if(e.length)return await fetch(e,{cache:"force-cache",mode:"cors"}).then(e=>e.json()).then(e=>e)},map:{init:async()=>{p=new Map({$element:"#service-centers-map",baseSite:appConfig.site}),document.addEventListener("click",e=>{e.target.classList.contains("service-centers__map__info-window__close")&&p.infoWindow.close()})}},menu:{render:({active:e,address:n,cellphone:t,id:a,map:r,name:s,phone:c})=>`<div class="service-centers__menu__item">\n                    <input type="radio" name="centro-servicio" id="${a}" ${e?"checked":""}>\n                    <label for="${a}">${s}<span class="${e?"alk-icon-arrow-up":"alk-icon-arrow-down"}"></span></label>\n                    <div class="service-centers__menu__item__body" data-service-center="${a}">\n                        <div class="address">\n                            <p><strong>Dirección:</strong>\n                                ${n}</p>\n                        </div>\n                        <div class="contact-phones">\n                            ${c.length?`<div class="phone">\n                                <p><strong>Contacto telefónico:</strong>\n                                    ${c.map(e=>`<a href="tel:+57${e.replace(/\s/g,"")}" title="Llamar a ${s}">${e}</a>`)}\n                                </p>\n                            </div>`:""}\n                            ${t.length?`<div class="cell">\n                                <p><strong>Celular:</strong>\n                                    ${t.map(e=>`<a href="tel:+57${e.replace(/\s/g,"")}" title="Llamar a ${s}">${e}</a>`)}\n                                </p>\n                            </div>`:""}\n                        </div>\n                        <div class="how-to-get">\n                            <p>\n                                <a rel="noopener" href="${r}" title="Indicaciones para llegar a ${s}" target="_blank">¿Cómo llegar?</a>\n                            </p>\n                        </div>\n                    </div>\n                </div>`,toogleArrow:()=>{const e=document.querySelectorAll(".service-centers__menu__item > input");e.forEach(n=>{n.addEventListener("change",n=>{e.forEach(e=>{const t=e.nextElementSibling.querySelector("span");n.target===e?t.classList.replace("alk-icon-arrow-down","alk-icon-arrow-up"):t.classList.replace("alk-icon-arrow-up","alk-icon-arrow-down")})})})},animateMarker:()=>{document.querySelectorAll(".service-centers__menu__item__body").forEach(e=>{e.addEventListener("mouseenter",()=>{p.bounceMarker(e.dataset.serviceCenter,"start")}),e.addEventListener("mouseleave",()=>{p.bounceMarker(e.dataset.serviceCenter,"stop")})})}},select:{init:()=>document.querySelectorAll("[data-custom-select").forEach(e=>new Select(e))}},n=document.getElementById("departamento"),t=document.getElementById("ciudad"),a=document.getElementById("categoria"),r=new Option(`Selecciona un ${n.labels[0].textContent.toLowerCase()}`,0,!0,!0),s=new Option(`Selecciona una ${t.labels[0].textContent.toLowerCase()}`,0,!0,!0),c=new Option(`Selecciona una ${a.labels[0].textContent.toLowerCase()}`,0,!0,!0),i=document.querySelector(".service-centers__menu"),o=Number(getComputedStyle(document.documentElement).getPropertyValue("--service-centers-breakpoint").replace("px","")),l=new Event("updated");let p,d=!0,m=[];async function u({servicePointsCodes:e,serviceCenters:n}){return e=[...new Set(e)],await e.map(e=>{let t={id:e,coordinates:{lat:n[e].lat,lng:n[e].lng}};return t={...t,...n[e]},new ServiceCenter(t)})}function v(n){i.innerHTML="",n.map(n=>(n.active=d,d=!1,i.insertAdjacentHTML("beforeend",e.menu.render(n))))}n.append(r),t.append(s),a.append(c),void 0!==appConfig.jsonFile&&e.get(appConfig.jsonFile).then(async({categories:r,departments:i,serviceCenters:g})=>{await e.map.init(),Object.entries(i).map(e=>{const t=e[1],a=e[0],r=new Option(t.name,a);n.append(r)}),e.select.init(),n.addEventListener("change",async()=>{d=!0,t.innerHTML="",t.append(s),p.infoWindow.close(),window.innerWidth>o&&(document.querySelector(".service-centers__map").style.display="block"),Object.values(i[n.value].cities).map(({categories:e})=>Object.values(e).map(({stores:e})=>e.map(e=>{m.push(e)}))),u({servicePointsCodes:m,serviceCenters:g}).then(n=>{v(n),p.setMarkers(n),e.menu.toogleArrow(),e.menu.animateMarker()}),Object.entries(i[n.value].cities).map(e=>{const n=e[1],a=e[0],r=new Option(n.name,a);t.append(r)}),t.dispatchEvent(l),a.innerHTML="",a.append(c),a.dispatchEvent(l),m=[]}),t.addEventListener("change",()=>{d=!0,a.innerHTML="",a.append(c),Object.values(i[n.value].cities[t.value].categories).map(({stores:e})=>e.map(e=>{m.push(e)})),u({servicePointsCodes:m,serviceCenters:g}).then(n=>{v(n),p.setMarkers(n),e.menu.toogleArrow(),e.menu.animateMarker()}),Object.entries(i[n.value].cities[t.value].categories).map(e=>{const n=r[e[0]].name,t=e[0],s=new Option(n,t);a.append(s)}),a.dispatchEvent(l),m=[]}),a.addEventListener("change",()=>{d=!0,Object.values(i[n.value].cities[t.value].categories[a.value].stores).map(e=>{m.push(e)}),u({servicePointsCodes:m,serviceCenters:g}).then(n=>{v(n),p.setMarkers(n),e.menu.toogleArrow(),e.menu.animateMarker()}),m=[]})})})();