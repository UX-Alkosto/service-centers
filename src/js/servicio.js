import { app as map } from "./map.js"
import Select from "./select.js"
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
            init : () => map.init('#service-centers-map')
            // TODO: Get location and center map with near service centers
        },
        menu: {
            render: ({
                address = '',
                cell = '',
                coordinates = {},
                email = '',
                hours = '',
                id = '',
                phone = '',
                selected = false,
                title = '',
            }) => {
                return `<div class="service-centers__menu__item">
                    <input type="radio" name="centro-servicio" id="${id}" ${selected ? 'checked' : ''}>
                    <label for="${id}">${title}</label>
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

    let servicePointsCodes = [], enableFirst = true;

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
                getServiceCenters({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
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
                getServiceCenters({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
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
                getServiceCenters({
                    servicePointsCodes: servicePointsCodes,
                    stores: stores
                })
                servicePointsCodes = []
            })
        })
    }

    function getServiceCenters({servicePointsCodes, stores} = options){
        //reset menu items
        menuContainer.innerHTML = ""
        // remove duplicates
        servicePointsCodes = [...new Set(servicePointsCodes)]
        // render service points
        servicePointsCodes.map(code => {
            let servicePoint = { id: code, selected: enableFirst }
            enableFirst = false
            servicePoint = { ...servicePoint, ...stores[code] }
            return menuContainer.insertAdjacentHTML('beforeend', serviceCenters.menu.render(servicePoint))
        })
    }
}) ();