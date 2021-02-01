import Map from "./map.js"
import Select from "./select.js"
import ServiceCenter from "./service-center.js"
(() => {
    const app = {
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
                mapElement = new Map({
                    $element: '#service-centers-map',
                    baseSite: appConfig.site
                })
                document.addEventListener('click', e => {
                    if(e.target.classList.contains('service-centers__map__info-window__close')) {
                        mapElement.infoWindow.close()
                    }
                })
            }
        },
        menu: {
            render: ({
                active,
                address,
                cellphone,
                id,
                map,
                name,
                phone
            }) => {
                return `<div class="service-centers__menu__item">
                    <input type="radio" name="centro-servicio" id="${id}" ${active ? 'checked' : ''}>
                    <label for="${id}">${name}<span class="${active ? 'alk-icon-arrow-up' : 'alk-icon-arrow-down'}"></span></label>
                    <div class="service-centers__menu__item__body" data-service-center="${id}">
                        <div class="address">
                            <p><strong>Dirección:</strong>
                                ${address}</p>
                        </div>
                        <div class="contact-phones">
                            ${phone.length ? `<div class="phone">
                                <p><strong>Contacto telefónico:</strong>
                                    ${phone.map(p => `<a href="tel:+57${p.replace(/\s/g, '')}" title="Llamar a ${name}">${p}</a>`)}
                                </p>
                            </div>` : ''}
                            ${cellphone.length ? `<div class="cell">
                                <p><strong>Celular:</strong>
                                    ${cellphone.map(c => `<a href="tel:+57${c.replace(/\s/g, '')}" title="Llamar a ${name}">${c}</a>`)}
                                </p>
                            </div>` : ''}
                        </div>
                        <div class="how-to-get">
                            <p>
                                <a rel="noopener" href="${map}" title="Indicaciones para llegar a ${name}" target="_blank">¿Cómo llegar?</a>
                            </p>
                        </div>
                    </div>
                </div>`;
            },
            toogleArrow: () => {
                const menuItems = document.querySelectorAll('.service-centers__menu__item > input')
                menuItems.forEach(menuItem => {
                    menuItem.addEventListener('change', (e) => {
                        menuItems.forEach(otherMenuItem => {
                            const icon = otherMenuItem.nextElementSibling.querySelector('span')
                            if (e.target === otherMenuItem)
                                icon.classList.replace('alk-icon-arrow-down', 'alk-icon-arrow-up')
                            else
                                icon.classList.replace('alk-icon-arrow-up', 'alk-icon-arrow-down')
                        })
                    })
                })
            },
            animateMarker: () => {
                document.querySelectorAll('.service-centers__menu__item__body').forEach(menuItem => {
                    menuItem.addEventListener('mouseenter', () => {
                        mapElement.bounceMarker(menuItem.dataset.serviceCenter, 'start')
                    })
                    menuItem.addEventListener('mouseleave', () => {
                        mapElement.bounceMarker(menuItem.dataset.serviceCenter, 'stop')
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
        mobileBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue('--service-centers-breakpoint').replace('px', '')),
        updatedOptionsEvent = new Event('updated')

    let enableFirst = true,
        mapElement,
        servicePointsCodes = []

    departmentSelect.append(departmentDefaultOption)
    citySelect.append(cityDefaultOption)
    categorySelect.append(categoryDefaultOption)

    if (appConfig.jsonFile !== undefined) {
        app.get(appConfig.jsonFile).then(async ({ categories, departments, serviceCenters }) => {
            await app.map.init()
            // get departments and render options in dropdown
            Object.entries(departments).map(departmentData => {
                const department = departmentData[1],
                    label = departmentData[0],
                    option = new Option(department.name, label)
                departmentSelect.append(option)
            })
            // mapElement.map.getGeo().then(position => {
            //     if (position.message) return
            //     mapElement.map.setCenter(position)
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

            app.select.init() // init custom dropdowns

            departmentSelect.addEventListener('change', async () => {
                enableFirst = true
                citySelect.innerHTML = "" // reset cities select element
                citySelect.append(cityDefaultOption)
                mapElement.infoWindow.close()
                if (window.innerWidth > mobileBreakpoint) {
                    document.querySelector('.service-centers__map').style.display = 'block'
                }
                Object.values(departments[departmentSelect.value].cities).map(({ categories }) => {
                    return Object.values(categories).map(({ stores }) => {
                        return stores.map(serviceCenter => {
                            servicePointsCodes.push(serviceCenter)
                        })
                    })
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    serviceCenters: serviceCenters
                }).then(servicePoints => {
                    setServiceCenters(servicePoints)
                    mapElement.setMarkers(servicePoints)
                    app.menu.toogleArrow()
                    app.menu.animateMarker()
                })
                // Get Cities and render options in dropdown
                Object.entries(departments[departmentSelect.value].cities).map(cityData => {
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

                Object.values(departments[departmentSelect.value].cities[citySelect.value].categories).map(({ stores }) => {
                    return stores.map(serviceCenter => {
                        servicePointsCodes.push(serviceCenter)
                    })
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    serviceCenters: serviceCenters
                }).then(servicePoints => {
                    setServiceCenters(servicePoints)
                    mapElement.setMarkers(servicePoints)
                    app.menu.toogleArrow()
                    app.menu.animateMarker()
                })
                Object.entries(departments[departmentSelect.value].cities[citySelect.value].categories).map(categoryData => {
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
                Object.values(departments[departmentSelect.value].cities[citySelect.value].categories[categorySelect.value].stores).map(serviceCenter => {
                    servicePointsCodes.push(serviceCenter)
                })
                getServicePoints({
                    servicePointsCodes: servicePointsCodes,
                    serviceCenters: serviceCenters
                }).then(servicePoints => {
                    setServiceCenters(servicePoints)
                    mapElement.setMarkers(servicePoints)
                    app.menu.toogleArrow()
                    app.menu.animateMarker()
                })
                servicePointsCodes = [] // Reset service array
            })
        })
    }

    async function getServicePoints({ servicePointsCodes, serviceCenters }) {
        // remove duplicates
        servicePointsCodes = [...new Set(servicePointsCodes)]
        return await servicePointsCodes.map(code => {
            let servicePoint = {
                id: code,
                coordinates: {
                    lat: serviceCenters[code].lat,
                    lng: serviceCenters[code].lng
                }
            }
            servicePoint = { ...servicePoint, ...serviceCenters[code] }
            return new ServiceCenter(servicePoint)
        })
    }

    function setServiceCenters(serviceCenterPoints) {
        //reset menu items
        menuContainer.innerHTML = ""
        // render service points menu items
        serviceCenterPoints.map(serviceCenterPoint => {
            serviceCenterPoint.active = enableFirst
            enableFirst = false
            return menuContainer.insertAdjacentHTML('beforeend', app.menu.render(serviceCenterPoint))
        })
    }
})();