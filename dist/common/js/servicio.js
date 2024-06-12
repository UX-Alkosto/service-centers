/*! service-centers - release: 1.4.7 */
var e;
const t = globalThis.trustedTypes,
    n = t ? t.createPolicy("lit-html", {
        createHTML: e => e
    }) : void 0,
    s = `lit$${(Math.random()+"").slice(9)}$`,
    i = "?" + s,
    l = `<${i}>`,
    o = document,
    a = (e = "") => o.createComment(e),
    r = e => null === e || "object" != typeof e && "function" != typeof e,
    c = Array.isArray,
    d = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    u = /-->/g,
    h = />/g,
    m = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
    p = /'/g,
    v = /"/g,
    $ = /^(?:script|style|textarea|title)$/i,
    _ = (e => (t, ...n) => ({
        _$litType$: e,
        strings: t,
        values: n
    }))(1),
    A = Symbol.for("lit-noChange"),
    g = Symbol.for("lit-nothing"),
    f = new WeakMap,
    y = (e, t, n) => {
        var s, i;
        const l = null !== (s = null == n ? void 0 : n.renderBefore) && void 0 !== s ? s : t;
        let o = l._$litPart$;
        if (void 0 === o) {
            const e = null !== (i = null == n ? void 0 : n.renderBefore) && void 0 !== i ? i : null;
            l._$litPart$ = o = new x(t.insertBefore(a(), e), e, void 0, null != n ? n : {})
        }
        return o._$AI(e), o
    },
    b = o.createTreeWalker(o, 129, null, !1),
    E = (e, t) => {
        const i = e.length - 1,
            o = [];
        let a, r = 2 === t ? "<svg>" : "",
            c = d;
        for (let t = 0; t < i; t++) {
            const n = e[t];
            let i, _, A = -1,
                g = 0;
            for (; g < n.length && (c.lastIndex = g, _ = c.exec(n), null !== _);) g = c.lastIndex, c === d ? "!--" === _[1] ? c = u : void 0 !== _[1] ? c = h : void 0 !== _[2] ? ($.test(_[2]) && (a = RegExp("</" + _[2], "g")), c = m) : void 0 !== _[3] && (c = m) : c === m ? ">" === _[0] ? (c = null != a ? a : d, A = -1) : void 0 === _[1] ? A = -2 : (A = c.lastIndex - _[2].length, i = _[1], c = void 0 === _[3] ? m : '"' === _[3] ? v : p) : c === v || c === p ? c = m : c === u || c === h ? c = d : (c = m, a = void 0);
            const f = c === m && e[t + 1].startsWith("/>") ? " " : "";
            r += c === d ? n + l : A >= 0 ? (o.push(i), n.slice(0, A) + "$lit$" + n.slice(A) + s + f) : n + s + (-2 === A ? (o.push(void 0), t) : f)
        }
        const _ = r + (e[i] || "<?>") + (2 === t ? "</svg>" : "");
        if (!Array.isArray(e) || !e.hasOwnProperty("raw")) throw Error("invalid template strings array");
        return [void 0 !== n ? n.createHTML(_) : _, o]
    };
class w {
    constructor({
        strings: e,
        _$litType$: n
    }, l) {
        let o;
        this.parts = [];
        let r = 0,
            c = 0;
        const d = e.length - 1,
            u = this.parts,
            [h, m] = E(e, n);
        if (this.el = w.createElement(h, l), b.currentNode = this.el.content, 2 === n) {
            const e = this.el.content,
                t = e.firstChild;
            t.remove(), e.append(...t.childNodes)
        }
        for (; null !== (o = b.nextNode()) && u.length < d;) {
            if (1 === o.nodeType) {
                if (o.hasAttributes()) {
                    const e = [];
                    for (const t of o.getAttributeNames())
                        if (t.endsWith("$lit$") || t.startsWith(s)) {
                            const n = m[c++];
                            if (e.push(t), void 0 !== n) {
                                const e = o.getAttribute(n.toLowerCase() + "$lit$").split(s),
                                    t = /([.?@])?(.*)/.exec(n);
                                u.push({
                                    type: 1,
                                    index: r,
                                    name: t[2],
                                    strings: e,
                                    ctor: "." === t[1] ? S : "?" === t[1] ? O : "@" === t[1] ? M : H
                                })
                            } else u.push({
                                type: 6,
                                index: r
                            })
                        } for (const t of e) o.removeAttribute(t)
                }
                if ($.test(o.tagName)) {
                    const e = o.textContent.split(s),
                        n = e.length - 1;
                    if (n > 0) {
                        o.textContent = t ? t.emptyScript : "";
                        for (let t = 0; t < n; t++) o.append(e[t], a()), b.nextNode(), u.push({
                            type: 2,
                            index: ++r
                        });
                        o.append(e[n], a())
                    }
                }
            } else if (8 === o.nodeType)
                if (o.data === i) u.push({
                    type: 2,
                    index: r
                });
                else {
                    let e = -1;
                    for (; - 1 !== (e = o.data.indexOf(s, e + 1));) u.push({
                        type: 7,
                        index: r
                    }), e += s.length - 1
                } r++
        }
    }
    static createElement(e, t) {
        const n = o.createElement("template");
        return n.innerHTML = e, n
    }
}

function C(e, t, n = e, s) {
    var i, l, o, a;
    if (t === A) return t;
    let c = void 0 !== s ? null === (i = n._$Cl) || void 0 === i ? void 0 : i[s] : n._$Cu;
    const d = r(t) ? void 0 : t._$litDirective$;
    return (null == c ? void 0 : c.constructor) !== d && (null === (l = null == c ? void 0 : c._$AO) || void 0 === l || l.call(c, !1), void 0 === d ? c = void 0 : (c = new d(e), c._$AT(e, n, s)), void 0 !== s ? (null !== (o = (a = n)._$Cl) && void 0 !== o ? o : a._$Cl = [])[s] = c : n._$Cu = c), void 0 !== c && (t = C(e, c._$AS(e, t.values), c, s)), t
}
class L {
    constructor(e, t) {
        this.v = [], this._$AN = void 0, this._$AD = e, this._$AM = t
    }
    get parentNode() {
        return this._$AM.parentNode
    }
    get _$AU() {
        return this._$AM._$AU
    }
    p(e) {
        var t;
        const {
            el: {
                content: n
            },
            parts: s
        } = this._$AD, i = (null !== (t = null == e ? void 0 : e.creationScope) && void 0 !== t ? t : o).importNode(n, !0);
        b.currentNode = i;
        let l = b.nextNode(),
            a = 0,
            r = 0,
            c = s[0];
        for (; void 0 !== c;) {
            if (a === c.index) {
                let t;
                2 === c.type ? t = new x(l, l.nextSibling, this, e) : 1 === c.type ? t = new c.ctor(l, c.name, c.strings, this, e) : 6 === c.type && (t = new k(l, this, e)), this.v.push(t), c = s[++r]
            }
            a !== (null == c ? void 0 : c.index) && (l = b.nextNode(), a++)
        }
        return i
    }
    m(e) {
        let t = 0;
        for (const n of this.v) void 0 !== n && (void 0 !== n.strings ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++
    }
}
class x {
    constructor(e, t, n, s) {
        var i;
        this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = s, this._$Cg = null === (i = null == s ? void 0 : s.isConnected) || void 0 === i || i
    }
    get _$AU() {
        var e, t;
        return null !== (t = null === (e = this._$AM) || void 0 === e ? void 0 : e._$AU) && void 0 !== t ? t : this._$Cg
    }
    get parentNode() {
        let e = this._$AA.parentNode;
        const t = this._$AM;
        return void 0 !== t && 11 === e.nodeType && (e = t.parentNode), e
    }
    get startNode() {
        return this._$AA
    }
    get endNode() {
        return this._$AB
    }
    _$AI(e, t = this) {
        e = C(this, e, t), r(e) ? e === g || null == e || "" === e ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== A && this.$(e) : void 0 !== e._$litType$ ? this.T(e) : void 0 !== e.nodeType ? this.k(e) : (e => {
            var t;
            return c(e) || "function" == typeof (null === (t = e) || void 0 === t ? void 0 : t[Symbol.iterator])
        })(e) ? this.S(e) : this.$(e)
    }
    A(e, t = this._$AB) {
        return this._$AA.parentNode.insertBefore(e, t)
    }
    k(e) {
        this._$AH !== e && (this._$AR(), this._$AH = this.A(e))
    }
    $(e) {
        this._$AH !== g && r(this._$AH) ? this._$AA.nextSibling.data = e : this.k(o.createTextNode(e)), this._$AH = e
    }
    T(e) {
        var t;
        const {
            values: n,
            _$litType$: s
        } = e, i = "number" == typeof s ? this._$AC(e) : (void 0 === s.el && (s.el = w.createElement(s.h, this.options)), s);
        if ((null === (t = this._$AH) || void 0 === t ? void 0 : t._$AD) === i) this._$AH.m(n);
        else {
            const e = new L(i, this),
                t = e.p(this.options);
            e.m(n), this.k(t), this._$AH = e
        }
    }
    _$AC(e) {
        let t = f.get(e.strings);
        return void 0 === t && f.set(e.strings, t = new w(e)), t
    }
    S(e) {
        c(this._$AH) || (this._$AH = [], this._$AR());
        const t = this._$AH;
        let n, s = 0;
        for (const i of e) s === t.length ? t.push(n = new x(this.A(a()), this.A(a()), this, this.options)) : n = t[s], n._$AI(i), s++;
        s < t.length && (this._$AR(n && n._$AB.nextSibling, s), t.length = s)
    }
    _$AR(e = this._$AA.nextSibling, t) {
        var n;
        for (null === (n = this._$AP) || void 0 === n || n.call(this, !1, !0, t); e && e !== this._$AB;) {
            const t = e.nextSibling;
            e.remove(), e = t
        }
    }
    setConnected(e) {
        var t;
        void 0 === this._$AM && (this._$Cg = e, null === (t = this._$AP) || void 0 === t || t.call(this, e))
    }
}
class H {
    constructor(e, t, n, s, i) {
        this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = i, n.length > 2 || "" !== n[0] || "" !== n[1] ? (this._$AH = Array(n.length - 1).fill(new String), this.strings = n) : this._$AH = g
    }
    get tagName() {
        return this.element.tagName
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e, t = this, n, s) {
        const i = this.strings;
        let l = !1;
        if (void 0 === i) e = C(this, e, t, 0), l = !r(e) || e !== this._$AH && e !== A, l && (this._$AH = e);
        else {
            const s = e;
            let o, a;
            for (e = i[0], o = 0; o < i.length - 1; o++) a = C(this, s[n + o], t, o), a === A && (a = this._$AH[o]), l || (l = !r(a) || a !== this._$AH[o]), a === g ? e = g : e !== g && (e += (null != a ? a : "") + i[o + 1]), this._$AH[o] = a
        }
        l && !s && this.C(e)
    }
    C(e) {
        e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != e ? e : "")
    }
}
class S extends H {
    constructor() {
        super(...arguments), this.type = 3
    }
    C(e) {
        this.element[this.name] = e === g ? void 0 : e
    }
}
const T = t ? t.emptyScript : "";
class O extends H {
    constructor() {
        super(...arguments), this.type = 4
    }
    C(e) {
        e && e !== g ? this.element.setAttribute(this.name, T) : this.element.removeAttribute(this.name)
    }
}
class M extends H {
    constructor(e, t, n, s, i) {
        super(e, t, n, s, i), this.type = 5
    }
    _$AI(e, t = this) {
        var n;
        if ((e = null !== (n = C(this, e, t, 0)) && void 0 !== n ? n : g) === A) return;
        const s = this._$AH,
            i = e === g && s !== g || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive,
            l = e !== g && (s === g || i);
        i && this.element.removeEventListener(this.name, this, s), l && this.element.addEventListener(this.name, this, e), this._$AH = e
    }
    handleEvent(e) {
        var t, n;
        "function" == typeof this._$AH ? this._$AH.call(null !== (n = null === (t = this.options) || void 0 === t ? void 0 : t.host) && void 0 !== n ? n : this.element, e) : this._$AH.handleEvent(e)
    }
}
class k {
    constructor(e, t, n) {
        this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n
    }
    get _$AU() {
        return this._$AM._$AU
    }
    _$AI(e) {
        C(this, e)
    }
}
const N = window.litHtmlPolyfillSupport;
null == N || N(w, x), (null !== (e = globalThis.litHtmlVersions) && void 0 !== e ? e : globalThis.litHtmlVersions = []).push("2.2.0");
class j {
    constructor(e) {
        this.element = e, this.label = e.labels[0], this.options = q(e.querySelectorAll("option")), this.customElement = document.createElement("div"), this.arrowElement = document.createElement("span"), this.labelElement = document.createElement("span"), this.valueElement = document.createElement("span"), this.optionsCustomElement = document.createElement("ul"),
            function (e) {
                HTMLSelectElement.prototype.refresh = function () {
                    this.dispatchEvent(new Event("refresh"))
                }, e.element.disabled && e.customElement.classList.add("disabled");
                e.customElement.classList.add("custom-select__container"), e.customElement.tabIndex = 0, e.customElement.setAttribute("aria-labelledby", `${e.element.id}-label`), e.labelElement.classList.add("custom-select__label"), e.labelElement.id = `${e.element.id}-label`, e.labelElement.innerText = e.label.textContent, e.customElement.append(e.labelElement);
                const t = document.createElement("span");
                t.classList.add("alk-icon-abajo"), e.arrowElement.append(t), e.arrowElement.classList.add("custom-select__arrow"), e.customElement.append(e.arrowElement), e.valueElement.classList.add("custom-select__value"), e.valueElement.innerText = e.selectedOption.label, e.customElement.append(e.valueElement), e.optionsCustomElement.classList.add("custom-select__options"), B(e), e.customElement.append(e.optionsCustomElement), e.element.addEventListener("refresh", (() => {
                    e.element.disabled ? e.customElement.classList.add("disabled") : e.customElement.classList.remove("disabled"), e.options = q(e.element.querySelectorAll("option")), e.valueElement.innerText = e.selectedOption.label, e.valueElement.dataset.status = "", B(e)
                })), e.arrowElement.addEventListener("click", (() => I(e))), e.valueElement.addEventListener("click", (() => I(e))), e.customElement.addEventListener("blur", (() => {
                    e.arrowElement.querySelector("span").classList.replace("alk-icon-arriba", "alk-icon-abajo"), e.optionsCustomElement.classList.remove("show")
                }))
            }(this), this.element.style.display = "none", this.element.setAttribute("aria-hidden", !0), this.label.style.display = "none", e.after(this.customElement)
    }
    get selectedOption() {
        return this.options.find((e => e.selected))
    }
    selectValue(e) {
        const t = this.options.find((t => t.value === e)),
            n = this.selectedOption;
        n.selected = !1, n.element.selected = !1, t.selected = !0, t.element.selected = !0, this.element.dispatchEvent(new Event("change")), this.valueElement.innerText = t.label, this.valueElement.dataset.status = "filled"
    }
}

function I(e) {
    if (e.customElement.classList.contains("disabled")) return;
    const t = e.arrowElement.querySelector("span");
    t.classList.contains("alk-icon-abajo") ? t.classList.replace("alk-icon-abajo", "alk-icon-arriba") : t.classList.replace("alk-icon-arriba", "alk-icon-abajo"), e.optionsCustomElement.classList.toggle("show")
}

function B(e) {
    e.optionsCustomElement.innerHtml = "", e.optionsCustomElement.querySelectorAll("*").forEach((e => e.remove())), e.options.forEach((t => {
        const n = document.createElement("li");
        n.classList.add("custom-select__option"), n.classList.toggle("selected", t.selected), n.setAttribute("role", "option"), t.selected && n.setAttribute("aria-selected", !0), n.innerText = t.label, n.dataset.value = t.value, "0" === t.value && (n.style.display = "none"), n.addEventListener("click", (() => {
            if ("0" === n.dataset.value) return;
            let s = e.optionsCustomElement.querySelector(`[data-value="${e.selectedOption.value}"]`);
            s.removeAttribute("aria-selected"), s.classList.remove("selected"), e.selectValue(t.value), n.classList.add("selected"), n.setAttribute("aria-selected", !0), e.optionsCustomElement.classList.remove("show"), e.customElement.blur()
        })), e.optionsCustomElement.append(n)
    }))
}

function q(e) {
    return [...e].map((e => ({
        value: e.value,
        label: e.label,
        selected: e.selected,
        element: e
    })))
}
const P = document.getElementById("marca"),
    W = document.getElementById("departamento"),
    U = document.getElementById("ciudad"),
    R = document.getElementById("categoria"),
    z = new Option("Selecciona una opción", 0, !0, !0),
    V = window.google,
    D = document.querySelector(".service-centers__menu"),
    Z = Number(getComputedStyle(document.documentElement).getPropertyValue("--service-centers-breakpoint").replace("px", ""));
let F = z,
    G = z,
    J = z,
    K = z,
    Q = !0,
    X = null,
    Y = !1,
    ee = [],
    te = [],
    ne = [];
async function se({
    servicePointsCodes: e,
    serviceCenters: t
}) {
    if (!e.length) return [];
    const n = await import("./service-center-36b1cae8.js").then((e => e.ServiceCenter)),
        s = {};
    return e.map((({
        areaCode: e,
        city: t,
        code: n
    }) => s[n] = {
        areaCode: e,
        code: n,
        city: t
    })), Object.values(s).map((({
        areaCode: e,
        city: s,
        code: i
    }) => {
        let l = {
            areaCode: e,
            city: s,
            coordinates: {
                lat: t[i].lat,
                lng: t[i].lng
            },
            id: i
        };
        return l = {
            ...l,
            ...t[i]
        }, new n(l)
    }))
}
async function ie(e) {
    if (!e.length) return y([], D);
    const t = await import("./menu-d4e6eb5c.js").then((e => e.Menu)),
        n = [];
    e.map((e => {
        e.active = Q, Q = !1, e.isCallCenter && (e.coordinates = {
            lat: 4.67998417919688,
            lng: -74.08550441957686
        }), n.push(new t(e, X).render())
    })), Y && X.setMarkers(e), y(n, D), document.querySelector("input[name=centro-servicio]").click()
}
document.addEventListener("updateCenter", (e => {
    const t = e.detail.center;
    if (null !== t) {
        const e = document.getElementById(t);
        e.click(), setTimeout((() => D.scrollTop = e.offsetTop), 250)
    }
})), document.addEventListener("click", (e => {
    e.target.classList.contains("service-centers__map__info-window__close") && X.infoWindow.close()
})), window.addEventListener("resize", (() => {
    document.querySelector(".service-centers__map").style.display = "none", window.innerWidth > Z && "0" != document.getElementById("departamento").value && (document.querySelector(".service-centers__map").style.display = "block")
})), null !== P && (F = new Option(`Selecciona una ${P.labels[0].textContent.toLowerCase()}`, 0, !0, !0), P.append(F)), null !== W && (G = new Option(`Selecciona un ${W.labels[0].textContent.toLowerCase()}`, 0, !0, !0), W.append(G), null !== P && (W.disabled = !0)), null !== U && (J = new Option(`Selecciona una ${U.labels[0].textContent.toLowerCase()}`, 0, !0, !0), U.append(J), U.disabled = !0), null !== R && (K = new Option(`Selecciona una ${R.labels[0].textContent.toLowerCase()}`, 0, !0, !0), R.append(K), R.disabled = !0), document.querySelectorAll("[data-custom-select]").forEach((e => new j(e))), void 0 !== appConfig.jsonFile && async function (e = "") {
    if (e.length) return await fetch(e, {
        cache: "force-cache",
        mode: "cors"
    }).then((e => {
        if (e.ok) return e.json()
    })).then((e => e))
}(appConfig.jsonFile).then((async ({
    brands: e,
    categories: t,
    departments: n,
    serviceCenters: s
}) => {
    void 0 !== e && null !== P && (Object.entries(e).map((async e => {
        const t = e[1],
            n = e[0],
            s = new Option(t.name, n);
        return P.append(s)
    })), P.refresh(), P.addEventListener("change", (async () => {
        Q = !0, W.innerHTML = "", W.append(G), Y && function (e) {
            e.infoWindow.close(), e.clearMarkers(), e.map.setCenter(new V.maps.LatLng(e.center)), e.map.setZoom(5)
        }(X), e[P.value].departments.map((e => {
            const t = new Option(n[e].name, e);
            return W.append(t)
        })), W.disabled = !1, W.refresh(), await se({
            servicePointsCodes: ne,
            serviceCenters: s
        }).then((e => ie(e))), U.innerHTML = "", U.disabled = !0, U.append(J), U.refresh(), R.innerHTML = "", R.disabled = !0, R.append(K), R.refresh(), ne = []
    }))), void 0 !== n && null !== W && (Object.entries(n).map((e => {
        const t = e[1],
            n = e[0],
            s = new Option(t.name, n);
        return W.append(s)
    })), W.refresh(), W.addEventListener("change", (async () => {
        Y || await async function (e = {
            lat: 4.67998417919688,
            lng: -74.08550441957686
        }) {
            const t = await import("./map-2f0055f7.js").then((e => e.Map));
            return X = new t({
                $element: "#service-centers-map",
                baseSite: appConfig.site,
                center: e
            })
        }(), Y = !0, ee = [], te = [], Q = !0, U.innerHTML = "", U.append(J), X.infoWindow.close(), window.innerWidth > Z && (document.querySelector(".service-centers__map").style.display = "block"), document.querySelector(".msje-localiza").innerText = "Localiza los centros de servicio técnico:", Object.entries(n[W.value].cities).map((e => {
            const t = e[0];
            return Object.entries(e[1].categories).map((n => n[1].stores.map((s => {
                const i = {
                    city: t,
                    code: s,
                    areaCode: e[1].areaCode
                };
                return null === P ? ne.push(i) : s.match(P.value) ? (ee.push(t), te.push(n[0]), ne.push(i)) : void 0
            }))))
        })), await se({
            servicePointsCodes: ne,
            serviceCenters: s
        }).then((e => ie(e))), ee = [...new Set(ee)], te = [...new Set(te)], Object.entries(n[W.value].cities).map((e => {
            if (!ee.length) {
                const t = e[1],
                    n = e[0],
                    s = new Option(t.name, n);
                return U.append(s)
            }
            ee.map((t => {
                if (e[0] === t) {
                    const n = e[1],
                        s = new Option(n.name, t);
                    return U.append(s)
                }
            }))
        })), U.disabled = !1, U.refresh(), R.innerHTML = "", R.disabled = !0, R.append(K), R.refresh(), ne = []
    }))), null !== U && U.addEventListener("change", (async () => {
        Q = !0, R.innerHTML = "", R.append(K), Object.values(n[W.value].cities[U.value].categories).map((({
            stores: e
        }) => e.map((e => {
            const t = {
                city: U.value,
                code: e,
                areaCode: n[W.value].cities[U.value].areaCode
            };
            return null === P || e.match(P.value) ? ne.push(t) : void 0
        })))), await se({
            servicePointsCodes: ne,
            serviceCenters: s
        }).then((e => ie(e))), Object.entries(n[W.value].cities[U.value].categories).map((e => {
            if (!te.length) {
                const n = t[e[0]].name,
                    s = e[0],
                    i = new Option(n, s);
                return R.append(i)
            }
            te.map((n => {
                if (e[0] === n) {
                    const e = t[n].name,
                        s = new Option(e, n);
                    return R.append(s)
                }
            }))
        })), R.disabled = !1, R.refresh(), ne = []
    })), void 0 !== t && null !== R && R.addEventListener("change", (async () => {
        Q = !0, Object.values(n[W.value].cities[U.value].categories[R.value].stores).map((e => {
            const t = {
                city: U.value,
                code: e,
                areaCode: n[W.value].cities[U.value].areaCode
            };
            return null === P || e.match(P.value) ? ne.push(t) : void 0
        })), await se({
            servicePointsCodes: ne,
            serviceCenters: s
        }).then((e => ie(e))), ne = []
    }))
}));
export {
    _ as $, A as b, g as w
};