import { app as map } from "./map.js";
(() => {
    map.init('#service-centers-map')
    map.getGeo()
}) ();