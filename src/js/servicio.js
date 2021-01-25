import { app as map } from "./map.js"
import Select from "./select.js"
import ServiceCenter from "./service-center.js"
(() => {
    const serviceCenters = {
        get: async (jsonUrl = '') => {
            if (jsonUrl.length) {
                return await fetch(jsonUrl, {
                    cache: 'force-cache',
                    mode: 'cors'
                })
                    .then(response => response.json())
                    .then(data => data)
            }
        },
        map: {
            init: async () => {
                mapElement = await map.init('#service-centers-map')
                // TODO: Get location and center map with near service centers
            }
        },
        menu: {
            render: ({
                active,
                address,
                cell,
                email,
                hours,
                id,
                name,
                phone
            }) => {
                return `<div class="service-centers__menu__item">
                    <input type="radio" name="centro-servicio" id="${id}" ${active ? 'checked' : ''}>
                    <label for="${id}">${name}</label>
                    <div class="service-centers__menu__item__body">
                        <div class="schedules">
                            <p><strong>Lunes a Viernes:</strong>
                                11:00 a.m  - 3:00 p.m.</p>
                            <p><strong>Sábados:</strong>
                                11:00 a.m - 3:00 p.m.</p>
                        </div>
                        <div class="address">
                            <p><strong>Dirección:</strong>
                                ${address}</p>
                        </div>
                        <div class="email">
                            <p><strong>Correo electrónico:</strong>
                                <a href="mailto:${email}" target="_blank" rel="nooppener">${email}</a></p>
                        </div>
                        ${phone !== null ? `<div class="phone">
                            <p><strong>Contacto telefónico:</strong>
                                ${phone}</p>
                        </div>` : ''}
                    </div>
                </div>`;
            }
        },
        select: {
            init : () => {
                const customSelects = document.querySelectorAll('[data-custom-select')
                customSelects.forEach(selectElement => new Select(selectElement))
            }
        }
    },
    departmentSelect = document.getElementById('departamento'),
    citySelect = document.getElementById('ciudad'),
    categorySelect = document.getElementById('categoria'),
    departmentDefaultOption = new Option(`Selecciona un ${departmentSelect.labels[0].textContent.toLowerCase()}`, 0, true, true),
    cityDefaultOption = new Option(`Selecciona una ${citySelect.labels[0].textContent.toLowerCase()}`, 0, true, true),
    categoryDefaultOption = new Option(`Selecciona una ${categorySelect.labels[0].textContent.toLowerCase()}`, 0, true, true),
    menuContainer = document.querySelector('.service-centers__menu'),
    updatedOptionsEvent = new Event('updated')

    let mapElement, markers = [], servicePointsCodes = [], enableFirst = true;

    departmentSelect.append(departmentDefaultOption)
    citySelect.append(cityDefaultOption)
    categorySelect.append(categoryDefaultOption)

    if (serviceCentersJsonFile !== undefined) {
        serviceCenters.get(serviceCentersJsonFile).then(({categories, cities, stores}) => {
            // get departments and render options in dropdown
            Object.entries(cities).map(departmentData => {
                const department = departmentData[1],
                    label = departmentData[0],
                    option = new Option(department.name, label)
                departmentSelect.append(option)
            })

            // Auto initialize init functions
            Object.values(serviceCenters).map(method => method.init !== undefined ? method.init.call() : '')

            departmentSelect.addEventListener('change', () => {
                enableFirst = true
                citySelect.innerHTML = "" // reset cities select element
                citySelect.append(cityDefaultOption)
                Object.values(cities[departmentSelect.value].cities).map(({ categories }) => {
                    return Object.values(categories).map(({ stores }) => {
                        return stores.map(store => {
                            servicePointsCodes.push(store)
                        })
                    })
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
                }).then(servicePoints => {
                    renderServiceCenters(servicePoints)
                    getMarkersInfo(servicePoints)
                })
                // Get Cities and render options in dropdown
                Object.entries(cities[departmentSelect.value].cities).map(cityData => {
                    const city = cityData[1],
                        label = cityData[0],
                        option = new Option(city.name, label)
                    citySelect.append(option)
                })
                citySelect.dispatchEvent(updatedOptionsEvent)

                // Reset Categories dropdown
                categorySelect.innerHTML = ""
                categorySelect.append(categoryDefaultOption)
                categorySelect.dispatchEvent(updatedOptionsEvent)
                servicePointsCodes = []
            })

            citySelect.addEventListener('change', () => {
                enableFirst = true
                // Reset Categories dropdown
                categorySelect.innerHTML = ""
                categorySelect.append(categoryDefaultOption)

                Object.values(cities[departmentSelect.value].cities[citySelect.value].categories).map(({stores}) => {
                    return stores.map(store => {
                        servicePointsCodes.push(store)
                    })
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
                }).then(servicePoints => {
                    renderServiceCenters(servicePoints)
                    getMarkersInfo(servicePoints)
                })
                Object.entries(cities[departmentSelect.value].cities[citySelect.value].categories).map(categoryData => {
                    const category = categories[categoryData[0]].name,
                        label = categoryData[0],
                        option = new Option(category, label)
                    categorySelect.append(option)
                })
                categorySelect.dispatchEvent(updatedOptionsEvent)
                servicePointsCodes = []
            })

            categorySelect.addEventListener('change', () => {
                enableFirst = true
                Object.values(cities[departmentSelect.value].cities[citySelect.value].categories[categorySelect.value].stores).map(store => {
                    servicePointsCodes.push(store)
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
                }).then(servicePoints => {
                    renderServiceCenters(servicePoints)
                    getMarkersInfo(servicePoints)
                })
                servicePointsCodes = []
            })
        })
    }

    async function getServicePoints({ servicePointsCodes, stores }) {
        // remove duplicates
        servicePointsCodes = [...new Set(servicePointsCodes)]
        return await servicePointsCodes.map(code => {
            let servicePoint = {
                id: code,
                coordinates : {
                    lat: stores[code].lat,
                    lng: stores[code].lng
                }
            }
            servicePoint = { ...servicePoint, ...stores[code] }
            return new ServiceCenter(servicePoint)
        })
    }

    async function getMarkersInfo(serviceCenterPoints) {
        const bounds = new google.maps.LatLngBounds()
        markers.map(marker => marker.setMap(null))
        serviceCenterPoints.map(serviceCenter => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(serviceCenter.coordinates.lat, serviceCenter.coordinates.lng),
                map: mapElement,
            })
            bounds.extend(marker.getPosition())
            markers.push(marker)
        })
        mapElement.setCenter(bounds.getCenter())
        mapElement.fitBounds(bounds)
        if(mapElement.getZoom() > 18) mapElement.setZoom(18)
    }

    function renderServiceCenters(serviceCenterPoints) {
        //reset menu items
        menuContainer.innerHTML = ""
        // render service points menu items
        serviceCenterPoints.map(serviceCenterPoint => {
            serviceCenterPoint.activeCenter = enableFirst
            enableFirst = false
            return menuContainer.insertAdjacentHTML('beforeend', serviceCenters.menu.render(serviceCenterPoint))
        })
    }
}) ();