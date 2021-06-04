/*! service-centers - release: 1.2.3 */
var e,t,n,s;const i=globalThis.trustedTypes,l=i?i.createPolicy("lit-html",{createHTML:e=>e}):void 0,o=`lit$${(Math.random()+"").slice(9)}$`,a="?"+o,r=`<${a}>`,c=document,d=(e="")=>c.createComment(e),u=e=>null===e||"object"!=typeof e&&"function"!=typeof e,m=Array.isArray,h=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,v=/>/g,f=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,g=/'/g,y=/"/g,b=/^(?:script|style|textarea)$/i,E=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),w=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),L=new WeakMap,x=(e,t,n)=>{var s,i;const l=null!==(s=null==n?void 0:n.renderBefore)&&void 0!==s?s:t;let o=l._$litPart$;if(void 0===o){const e=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:null;l._$litPart$=o=new A(t.insertBefore(d(),e),e,void 0,n)}return o.I(e),o},H=c.createTreeWalker(c,129,null,!1),$=(e,t)=>{const n=e.length-1,s=[];let i,a=2===t?"<svg>":"",c=h;for(let t=0;t<n;t++){const n=e[t];let l,d,u=-1,m=0;for(;m<n.length&&(c.lastIndex=m,d=c.exec(n),null!==d);)m=c.lastIndex,c===h?"!--"===d[1]?c=p:void 0!==d[1]?c=v:void 0!==d[2]?(b.test(d[2])&&(i=RegExp("</"+d[2],"g")),c=f):void 0!==d[3]&&(c=f):c===f?">"===d[0]?(c=null!=i?i:h,u=-1):void 0===d[1]?u=-2:(u=c.lastIndex-d[2].length,l=d[1],c=void 0===d[3]?f:'"'===d[3]?y:g):c===y||c===g?c=f:c===p||c===v?c=h:(c=f,i=void 0);const E=c===f&&e[t+1].startsWith("/>")?" ":"";a+=c===h?n+r:u>=0?(s.push(l),n.slice(0,u)+"$lit$"+n.slice(u)+o+E):n+o+(-2===u?(s.push(void 0),t):E)}const d=a+(e[n]||"<?>")+(2===t?"</svg>":"");return[void 0!==l?l.createHTML(d):d,s]};class S{constructor({strings:e,_$litType$:t},n){let s;this.parts=[];let l=0,r=0;const c=e.length-1,u=this.parts,[m,h]=$(e,t);if(this.el=S.createElement(m,n),H.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=H.nextNode())&&u.length<c;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(o)){const n=h[r++];if(e.push(t),void 0!==n){const e=s.getAttribute(n.toLowerCase()+"$lit$").split(o),t=/([.?@])?(.*)/.exec(n);u.push({type:1,index:l,name:t[2],strings:e,ctor:"."===t[1]?k:"?"===t[1]?N:"@"===t[1]?M:O})}else u.push({type:6,index:l})}for(const t of e)s.removeAttribute(t)}if(b.test(s.tagName)){const e=s.textContent.split(o),t=e.length-1;if(t>0){s.textContent=i?i.emptyScript:"";for(let n=0;n<t;n++)s.append(e[n],d()),H.nextNode(),u.push({type:2,index:++l});s.append(e[t],d())}}}else if(8===s.nodeType)if(s.data===a)u.push({type:2,index:l});else{let e=-1;for(;-1!==(e=s.data.indexOf(o,e+1));)u.push({type:7,index:l}),e+=o.length-1}l++}}static createElement(e,t){const n=c.createElement("template");return n.innerHTML=e,n}}function _(e,t,n=e,s){var i,l,o,a;if(t===w)return t;let r=void 0!==s?null===(i=n.Σi)||void 0===i?void 0:i[s]:n.Σo;const c=u(t)?void 0:t._$litDirective$;return(null==r?void 0:r.constructor)!==c&&(null===(l=null==r?void 0:r.O)||void 0===l||l.call(r,!1),void 0===c?r=void 0:(r=new c(e),r.T(e,n,s)),void 0!==s?(null!==(o=(a=n).Σi)&&void 0!==o?o:a.Σi=[])[s]=r:n.Σo=r),void 0!==r&&(t=_(e,r.S(e,t.values),r,s)),t}class T{constructor(e,t){this.l=[],this.N=void 0,this.D=e,this.M=t}u(e){var t;const{el:{content:n},parts:s}=this.D,i=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:c).importNode(n,!0);H.currentNode=i;let l=H.nextNode(),o=0,a=0,r=s[0];for(;void 0!==r;){if(o===r.index){let t;2===r.type?t=new A(l,l.nextSibling,this,e):1===r.type?t=new r.ctor(l,r.name,r.strings,this,e):6===r.type&&(t=new I(l,this,e)),this.l.push(t),r=s[++a]}o!==(null==r?void 0:r.index)&&(l=H.nextNode(),o++)}return i}v(e){let t=0;for(const n of this.l)void 0!==n&&(void 0!==n.strings?(n.I(e,n,t),t+=n.strings.length-2):n.I(e[t])),t++}}class A{constructor(e,t,n,s){this.type=2,this.N=void 0,this.A=e,this.B=t,this.M=n,this.options=s}setConnected(e){var t;null===(t=this.P)||void 0===t||t.call(this,e)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(e,t=this){e=_(this,e,t),u(e)?e===C||null==e||""===e?(this.H!==C&&this.R(),this.H=C):e!==this.H&&e!==w&&this.m(e):void 0!==e._$litType$?this._(e):void 0!==e.nodeType?this.$(e):(e=>{var t;return m(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.g(e):this.m(e)}k(e,t=this.B){return this.A.parentNode.insertBefore(e,t)}$(e){this.H!==e&&(this.R(),this.H=this.k(e))}m(e){const t=this.A.nextSibling;null!==t&&3===t.nodeType&&(null===this.B?null===t.nextSibling:t===this.B.previousSibling)?t.data=e:this.$(c.createTextNode(e)),this.H=e}_(e){var t;const{values:n,_$litType$:s}=e,i="number"==typeof s?this.C(e):(void 0===s.el&&(s.el=S.createElement(s.h,this.options)),s);if((null===(t=this.H)||void 0===t?void 0:t.D)===i)this.H.v(n);else{const e=new T(i,this),t=e.u(this.options);e.v(n),this.$(t),this.H=e}}C(e){let t=L.get(e.strings);return void 0===t&&L.set(e.strings,t=new S(e)),t}g(e){m(this.H)||(this.H=[],this.R());const t=this.H;let n,s=0;for(const i of e)s===t.length?t.push(n=new A(this.k(d()),this.k(d()),this,this.options)):n=t[s],n.I(i),s++;s<t.length&&(this.R(n&&n.B.nextSibling,s),t.length=s)}R(e=this.A.nextSibling,t){var n;for(null===(n=this.P)||void 0===n||n.call(this,!1,!0,t);e&&e!==this.B;){const t=e.nextSibling;e.remove(),e=t}}}class O{constructor(e,t,n,s,i){this.type=1,this.H=C,this.N=void 0,this.V=void 0,this.element=e,this.name=t,this.M=s,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this.H=Array(n.length-1).fill(C),this.strings=n):this.H=C}get tagName(){return this.element.tagName}I(e,t=this,n,s){const i=this.strings;let l=!1;if(void 0===i)e=_(this,e,t,0),l=!u(e)||e!==this.H&&e!==w,l&&(this.H=e);else{const s=e;let o,a;for(e=i[0],o=0;o<i.length-1;o++)a=_(this,s[n+o],t,o),a===w&&(a=this.H[o]),l||(l=!u(a)||a!==this.H[o]),a===C?e=C:e!==C&&(e+=(null!=a?a:"")+i[o+1]),this.H[o]=a}l&&!s&&this.W(e)}W(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class k extends O{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===C?void 0:e}}class N extends O{constructor(){super(...arguments),this.type=4}W(e){e&&e!==C?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class M extends O{constructor(){super(...arguments),this.type=5}I(e,t=this){var n;if((e=null!==(n=_(this,e,t,0))&&void 0!==n?n:C)===w)return;const s=this.H,i=e===C&&s!==C||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,l=e!==C&&(s===C||i);i&&this.element.removeEventListener(this.name,this,s),l&&this.element.addEventListener(this.name,this,e),this.H=e}handleEvent(e){var t,n;"function"==typeof this.H?this.H.call(null!==(n=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==n?n:this.element,e):this.H.handleEvent(e)}}class I{constructor(e,t,n){this.element=e,this.type=6,this.N=void 0,this.V=void 0,this.M=t,this.options=n}I(e){_(this,e)}}null===(t=(e=globalThis).litHtmlPlatformSupport)||void 0===t||t.call(e,S,A),(null!==(n=(s=globalThis).litHtmlVersions)&&void 0!==n?n:s.litHtmlVersions=[]).push("2.0.0-rc.3");class j{constructor(e){this.element=e,this.label=e.labels[0],this.options=q(e.querySelectorAll("option")),this.customElement=document.createElement("div"),this.arrowElement=document.createElement("span"),this.labelElement=document.createElement("span"),this.valueElement=document.createElement("span"),this.optionsCustomElement=document.createElement("ul"),function(e){HTMLSelectElement.prototype.refresh=function(){this.dispatchEvent(new Event("refresh"))},e.element.disabled&&e.customElement.classList.add("disabled");e.customElement.classList.add("custom-select__container"),e.customElement.tabIndex=0,e.customElement.setAttribute("aria-labelledby",`${e.element.id}-label`),e.labelElement.classList.add("custom-select__label"),e.labelElement.id=`${e.element.id}-label`,e.labelElement.innerText=e.label.textContent,e.customElement.append(e.labelElement);const t=document.createElement("span");t.classList.add("alk-icon-arrow-down"),e.arrowElement.append(t),e.arrowElement.classList.add("custom-select__arrow"),e.customElement.append(e.arrowElement),e.valueElement.classList.add("custom-select__value"),e.valueElement.innerText=e.selectedOption.label,e.customElement.append(e.valueElement),e.optionsCustomElement.classList.add("custom-select__options"),W(e),e.customElement.append(e.optionsCustomElement),e.element.addEventListener("refresh",(()=>{e.element.disabled?e.customElement.classList.add("disabled"):e.customElement.classList.remove("disabled"),e.options=q(e.element.querySelectorAll("option")),e.valueElement.innerText=e.selectedOption.label,e.valueElement.dataset.status="",W(e)})),e.arrowElement.addEventListener("click",(()=>B(e))),e.valueElement.addEventListener("click",(()=>B(e))),e.customElement.addEventListener("blur",(()=>{e.arrowElement.querySelector("span").classList.replace("alk-icon-arrow-up","alk-icon-arrow-down"),e.optionsCustomElement.classList.remove("show")}))}(this),this.element.style.display="none",this.element.setAttribute("aria-hidden",!0),this.label.style.display="none",e.after(this.customElement)}get selectedOption(){return this.options.find((e=>e.selected))}selectValue(e){const t=this.options.find((t=>t.value===e)),n=this.selectedOption;n.selected=!1,n.element.selected=!1,t.selected=!0,t.element.selected=!0,this.element.dispatchEvent(new Event("change")),this.valueElement.innerText=t.label,this.valueElement.dataset.status="filled"}}function B(e){if(e.customElement.classList.contains("disabled"))return;const t=e.arrowElement.querySelector("span");t.classList.contains("alk-icon-arrow-down")?t.classList.replace("alk-icon-arrow-down","alk-icon-arrow-up"):t.classList.replace("alk-icon-arrow-up","alk-icon-arrow-down"),e.optionsCustomElement.classList.toggle("show")}function W(e){e.optionsCustomElement.innerHtml="",e.optionsCustomElement.querySelectorAll("*").forEach((e=>e.remove())),e.options.forEach((t=>{const n=document.createElement("li");n.classList.add("custom-select__option"),n.classList.toggle("selected",t.selected),n.setAttribute("role","option"),t.selected&&n.setAttribute("aria-selected",!0),n.innerText=t.label,n.dataset.value=t.value,"0"===t.value&&(n.style.display="none"),n.addEventListener("click",(()=>{if("0"===n.dataset.value)return;let s=e.optionsCustomElement.querySelector(`[data-value="${e.selectedOption.value}"]`);s.removeAttribute("aria-selected"),s.classList.remove("selected"),e.selectValue(t.value),n.classList.add("selected"),n.setAttribute("aria-selected",!0),e.optionsCustomElement.classList.remove("show"),e.customElement.blur()})),e.optionsCustomElement.append(n)}))}function q(e){return[...e].map((e=>({value:e.value,label:e.label,selected:e.selected,element:e})))}const P=document.getElementById("marca"),V=document.getElementById("departamento"),R=document.getElementById("ciudad"),z=document.getElementById("categoria"),D=new Option("Selecciona una opción",0,!0,!0),Z=window.google,F=document.querySelector(".service-centers__menu"),G=Number(getComputedStyle(document.documentElement).getPropertyValue("--service-centers-breakpoint").replace("px",""));let J=D,K=D,Q=D,U=D,X=!0,Y=null,ee=!1,te=[],ne=[],se=[];async function ie({servicePointsCodes:e,serviceCenters:t}){if(!e.length)return[];const n=await import("./service-center-caf71fec.js").then((e=>e.ServiceCenter)),s={};return e.map((({areaCode:e,city:t,code:n})=>s[n]={areaCode:e,code:n,city:t})),Object.values(s).map((({areaCode:e,city:s,code:i})=>{let l={areaCode:e,city:s,coordinates:{lat:t[i].lat,lng:t[i].lng},id:i};return l={...l,...t[i]},new n(l)}))}async function le(e){if(!e.length)return x([],F);const t=await import("./menu-114d652f.js").then((e=>e.Menu)),n=[];e.map((e=>{e.active=X,X=!1,e.isCallCenter&&(e.coordinates={lat:4.67998417919688,lng:-74.08550441957686}),n.push(new t(e,Y).render())})),ee&&Y.setMarkers(e),x(n,F),document.querySelector("input[name=centro-servicio]").click()}document.addEventListener("updateCenter",(e=>{const t=e.detail.center;if(null!==t){const e=document.getElementById(t);e.click(),setTimeout((()=>F.scrollTop=e.offsetTop),250)}})),document.addEventListener("click",(e=>{e.target.classList.contains("service-centers__map__info-window__close")&&Y.infoWindow.close()})),window.onresize=()=>{document.querySelector(".service-centers__map").style.display="none",window.innerWidth>G&&"0"!=document.getElementById("departamento").value&&(document.querySelector(".service-centers__map").style.display="block")},null!==P&&(J=new Option(`Selecciona una ${P.labels[0].textContent.toLowerCase()}`,0,!0,!0),P.append(J)),null!==V&&(K=new Option(`Selecciona un ${V.labels[0].textContent.toLowerCase()}`,0,!0,!0),V.append(K),null!==P&&(V.disabled=!0)),null!==R&&(Q=new Option(`Selecciona una ${R.labels[0].textContent.toLowerCase()}`,0,!0,!0),R.append(Q),R.disabled=!0),null!==z&&(U=new Option(`Selecciona una ${z.labels[0].textContent.toLowerCase()}`,0,!0,!0),z.append(U),z.disabled=!0),document.querySelectorAll("[data-custom-select]").forEach((e=>new j(e))),void 0!==appConfig.jsonFile&&async function(e=""){if(e.length)return await fetch(e,{cache:"force-cache",mode:"cors"}).then((e=>{if(e.ok)return e.json()})).then((e=>e))}(appConfig.jsonFile).then((async({brands:e,categories:t,departments:n,serviceCenters:s})=>{void 0!==e&&null!==P&&(Object.entries(e).map((async e=>{const t=e[1],n=e[0],s=new Option(t.name,n);return P.append(s)})),P.refresh(),P.addEventListener("change",(async()=>{X=!0,V.innerHTML="",V.append(K),ee&&function(e){e.infoWindow.close(),e.clearMarkers(),e.map.setCenter(new Z.maps.LatLng(e.center)),e.map.setZoom(5)}(Y),e[P.value].departments.map((e=>{const t=new Option(n[e].name,e);return V.append(t)})),V.disabled=!1,V.refresh(),await ie({servicePointsCodes:se,serviceCenters:s}).then((e=>le(e))),R.innerHTML="",R.disabled=!0,R.append(Q),R.refresh(),z.innerHTML="",z.disabled=!0,z.append(U),z.refresh(),se=[]}))),void 0!==n&&null!==V&&(Object.entries(n).map((e=>{const t=e[1],n=e[0],s=new Option(t.name,n);return V.append(s)})),V.refresh(),V.addEventListener("change",(async()=>{ee||await async function(e={lat:4.67998417919688,lng:-74.08550441957686}){const t=await import("./map-ae4bb788.js").then((e=>e.Map));return Y=new t({$element:"#service-centers-map",baseSite:appConfig.site,center:e})}(),ee=!0,te=[],ne=[],X=!0,R.innerHTML="",R.append(Q),Y.infoWindow.close(),window.innerWidth>G&&(document.querySelector(".service-centers__map").style.display="block"),document.querySelector(".msje-localiza").innerText="Localiza los centros de servicio técnico:",Object.entries(n[V.value].cities).map((e=>{const t=e[0];return Object.entries(e[1].categories).map((n=>n[1].stores.map((s=>{const i={city:t,code:s,areaCode:e[1].areaCode};return null===P?se.push(i):s.match(P.value)?(te.push(t),ne.push(n[0]),se.push(i)):void 0}))))})),await ie({servicePointsCodes:se,serviceCenters:s}).then((e=>le(e))),te=[...new Set(te)],ne=[...new Set(ne)],Object.entries(n[V.value].cities).map((e=>{if(!te.length){const t=e[1],n=e[0],s=new Option(t.name,n);return R.append(s)}te.map((t=>{if(e[0]===t){const n=e[1],s=new Option(n.name,t);return R.append(s)}}))})),R.disabled=!1,R.refresh(),z.innerHTML="",z.disabled=!0,z.append(U),z.refresh(),se=[]}))),null!==R&&R.addEventListener("change",(async()=>{X=!0,z.innerHTML="",z.append(U),Object.values(n[V.value].cities[R.value].categories).map((({stores:e})=>e.map((e=>{const t={city:R.value,code:e,areaCode:n[V.value].cities[R.value].areaCode};return null===P||e.match(P.value)?se.push(t):void 0})))),await ie({servicePointsCodes:se,serviceCenters:s}).then((e=>le(e))),Object.entries(n[V.value].cities[R.value].categories).map((e=>{if(!ne.length){const n=t[e[0]].name,s=e[0],i=new Option(n,s);return z.append(i)}ne.map((n=>{if(e[0]===n){const e=t[n].name,s=new Option(e,n);return z.append(s)}}))})),z.disabled=!1,z.refresh(),se=[]})),void 0!==t&&null!==z&&z.addEventListener("change",(async()=>{X=!0,Object.values(n[V.value].cities[R.value].categories[z.value].stores).map((e=>{const t={city:R.value,code:e,areaCode:n[V.value].cities[R.value].areaCode};return null===P||e.match(P.value)?se.push(t):void 0})),await ie({servicePointsCodes:se,serviceCenters:s}).then((e=>le(e))),se=[]}))}));export{C as A,E as T,w};
