import { geocoder, infoWindow, map, markers } from "./map.js"
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
            init: async () => mapElement = await map.init('#service-centers-map')
        },
        menu: {
            render: ({
                active,
                address,
                cellphone,
                email,
                hours,
                id,
                name,
                phone
            }) => {
                return `<div class="service-centers__menu__item">
                    <input type="radio" name="centro-servicio" id="${id}" ${active ? 'checked' : ''}>
                    <label for="${id}">${name}</label>
                    <div class="service-centers__menu__item__body" data-service-center="${id}">
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
                                <a href="mailto:${email}" target="_blank" rel="nooppener">${email}</a>
                            </p>
                        </div>
                        ${phone !== null ? `<div class="phone">
                            <p><strong>Contacto telefónico:</strong>
                                ${phone}</p>
                        </div>` : ''}
                        ${cellphone !== null ? `<div class="cell">
                            <p><strong>Celular:</strong>
                                ${cellphone}</p>
                        </div>` : ''}
                    </div>
                </div>`;
            },
            animateMarker: () => {
                document.querySelectorAll('.service-centers__menu__item__body').forEach(menuItem => {
                    menuItem.addEventListener('mouseenter', () => {
                        map.bounceMarker(menuItem.dataset.serviceCenter, 'start' )
                    })
                    menuItem.addEventListener('mouseleave', () => {
                        map.bounceMarker(menuItem.dataset.serviceCenter, 'stop')
                    })
                })
            }
        },
        select: {
            init: () => document.querySelectorAll('[data-custom-select').forEach(selectElement => new Select(selectElement))
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

    let enableFirst = true,
        mapElement,
        servicePointsCodes = []

    departmentSelect.append(departmentDefaultOption)
    citySelect.append(cityDefaultOption)
    categorySelect.append(categoryDefaultOption)

    if (serviceCentersConfig.jsonFile !== undefined) {
        serviceCenters.get(serviceCentersConfig.jsonFile).then(async({categories, cities, stores}) => {
            await serviceCenters.map.init().then(() => {
                infoWindow.setPosition(mapElement.getCenter())
                infoWindow.setContent('Selecciona un departamento') // Set default message
                infoWindow.open(mapElement)
            })
            // get departments and render options in dropdown
            Object.entries(cities).map(departmentData => {
                const department = departmentData[1],
                    label = departmentData[0],
                    option = new Option(department.name, label)
                departmentSelect.append(option)
            })
            // map.getGeo().then(position => {
            //     if (position.message) return
            //     mapElement.setCenter(position)
            //     geocoder.geocode({ location: position }, (results, status) => {
            //         if (status === "OK") {
            //             if (results[0]) {
            //                 const locationData = results[0]
            //                 locationData.address_components.map(components => {
            //                     console.log(components)
            //                 })
            //             }
            //         }
            //     })
            // })

            serviceCenters.select.init() // init custom dropdowns

            departmentSelect.addEventListener('change', async () => {
                enableFirst = true
                citySelect.innerHTML = "" // reset cities select element
                citySelect.append(cityDefaultOption)
                infoWindow.close()
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
                    map.renderMarkers(servicePoints)
                    serviceCenters.menu.animateMarker()
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
                servicePointsCodes = [] // Reset service array
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
                    map.renderMarkers(servicePoints)
                    serviceCenters.menu.animateMarker()
                })
                Object.entries(cities[departmentSelect.value].cities[citySelect.value].categories).map(categoryData => {
                    const category = categories[categoryData[0]].name,
                        label = categoryData[0],
                        option = new Option(category, label)
                    categorySelect.append(option)
                })
                categorySelect.dispatchEvent(updatedOptionsEvent)
                servicePointsCodes = [] // Reset service array
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
                    map.renderMarkers(servicePoints)
                    serviceCenters.menu.animateMarker()
                })
                servicePointsCodes = [] // Reset service array
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