import { render } from "lit/html.js";
import Select from "./select.js";

const app = {
	get: async (jsonUrl = "") => {
		if (jsonUrl.length) {
			return await fetch(jsonUrl, {
				cache: "force-cache",
				mode: "cors",
			}).then(response => {
				if(response.ok) return response.json();
			}).then(data => data);
		}
	},
	map: {
		init: async () => {
			const Map = await import("./map.js");
			mapElement = new Map.default({
				$element: "#service-centers-map",
				// eslint-disable-next-line no-undef
				baseSite: appConfig.site,
				center: {
					lat: 4.6482837,
					lng: -74.2478938
				}
			});
			document.addEventListener("click", (e) => {
				if (e.target.classList
					.contains("service-centers__map__info-window__close")) {
					mapElement.infoWindow.close();
				}
			});
			window.onresize = () => {
				if (window.innerWidth > mobileBreakpoint &&
					document.getElementById("departamento").value != "0") {
					document.querySelector(".service-centers__map")
						.style.display = "block";
				} else {
					document.querySelector(".service-centers__map")
						.style.display = "none";
				}
			};
		},
	}
},
	brandSelect = document.getElementById("marca"),
	departmentSelect = document.getElementById("departamento"),
	citySelect = document.getElementById("ciudad"),
	categorySelect = document.getElementById("categoria"),
	defaultOption = new Option("Selecciona una opción", 0, true, true),
	menuContainer = document.querySelector(".service-centers__menu"),
	mobileBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue("--service-centers-breakpoint").replace("px", ""));

let brandDefaultOption = defaultOption,
	departmentDefaultOption = defaultOption,
	cityDefaultOption = defaultOption,
	categoryDefaultOption = defaultOption,
	enableFirst = true,
	mapElement = null,
	mapLoaded = false,
	validCities = new Array(),
	validCategories = new Array(),
	servicePointsCodes = new Array();

document.addEventListener("updateCenter", e => {
	const center = e.detail.center;
	if (center !== null) {
		const item = document.getElementById(center);
		item.click();
		setTimeout(() => menuContainer.scrollTop = item.offsetTop, 250);
	}
});

if (brandSelect !== null) {
	brandDefaultOption = new Option(`Selecciona una ${brandSelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	brandSelect.append(brandDefaultOption);
}

if (departmentSelect !== null) {
	departmentDefaultOption = new Option(`Selecciona un ${departmentSelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	departmentSelect.append(departmentDefaultOption);
	if (brandSelect !== null) {
		departmentSelect.disabled = true;
	}
}

if (citySelect !== null) {
	cityDefaultOption = new Option(`Selecciona una ${citySelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	citySelect.append(cityDefaultOption);
	citySelect.disabled = true;
}

if (categorySelect !== null) {
	categoryDefaultOption = new Option(`Selecciona una ${categorySelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	categorySelect.append(categoryDefaultOption);
	categorySelect.disabled = true;
}

document.querySelectorAll("[data-custom-select]").forEach(selectElement => new Select(selectElement)); // init custom dropdowns

// eslint-disable-next-line no-undef
if (appConfig.jsonFile !== undefined) {
	// eslint-disable-next-line no-undef
	app.get(appConfig.jsonFile)
		.then(async ({ brands, categories, departments, serviceCenters }) => {
			if (brands !== undefined && brandSelect !== null) {
				Object.entries(brands).map(async brandData => {
					const brand = brandData[1];
					const value = brandData[0];
					const option = new Option(brand.name, value);
					return brandSelect.append(option);
				});
				brandSelect.refresh();

				brandSelect.addEventListener("change", async () => {
					enableFirst = true;
					departmentSelect.innerHTML = ""; // reset cities select element
					departmentSelect.append(departmentDefaultOption);
					if (mapLoaded)
						mapElement.infoWindow.close();

					brands[brandSelect.value].departments.map(departmentValue => {
						const option = new Option(departments[departmentValue].name, departmentValue);
						return departmentSelect.append(option);
					});
					departmentSelect.disabled = false;
					departmentSelect.refresh();

					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then(servicePoints => setServiceCenters(servicePoints));

					// Reset Cities dropdown
					citySelect.innerHTML = "";
					citySelect.disabled = true;
					citySelect.append(cityDefaultOption);
					citySelect.refresh();
					// Reset Categories dropdown
					categorySelect.innerHTML = "";
					categorySelect.disabled = true;
					categorySelect.append(categoryDefaultOption);
					categorySelect.refresh();
					servicePointsCodes = []; // Reset service array
				});
			}

			if (departments !== undefined && departmentSelect !== null) {
				// get departments and render options in dropdown
				Object.entries(departments).map(departmentData => {
					const department = departmentData[1];
					const value = departmentData[0];
					const option = new Option(department.name, value);
					return departmentSelect.append(option);
				});
				departmentSelect.refresh();

				departmentSelect.addEventListener("change", async () => {
					if(!mapLoaded)
						await app.map.init();
					mapLoaded = true;
					validCities = [];
					validCategories = [];
					enableFirst = true;
					citySelect.innerHTML = ""; // reset cities select element
					citySelect.append(cityDefaultOption);
					mapElement.infoWindow.close();
					if (window.innerWidth > mobileBreakpoint) {
						// Show map on desktop devices
						document.querySelector(".service-centers__map")
							.style.display = "block";
					}
					document.querySelector(".msje-localiza")
						.innerText = "Localiza los centros de servicio técnico:";
					Object.entries(departments[departmentSelect.value].cities)
						.map(cityData => {
							const city = cityData[0];
							return Object.entries(cityData[1].categories).map(categoriesData => {
								return categoriesData[1].stores.map(code => {
									const serviceCenter = {
										city: city,
										code: code,
										areaCode: cityData[1].areaCode,
									};
									if (brandSelect !== null) {
										if (code.match(brandSelect.value)) {
											validCities.push(city);
											validCategories.push(categoriesData[0]);
											return servicePointsCodes.push(serviceCenter);
										}
									} else {
										return servicePointsCodes.push(serviceCenter);
									}
								});
							});
						});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then(servicePoints => setServiceCenters(servicePoints));

					validCities = [...new Set(validCities)]; //Remove duplicated cities
					validCategories = [...new Set(validCategories)]; //Remove duplicated cities

					// Get Cities and render options in dropdown
					Object.entries(departments[departmentSelect.value].cities)
						.map(cityData => {
							if (validCities.length) {
								validCities.map(validCity => {
									if (cityData[0] === validCity) {
										const city = cityData[1];
										const option = new Option(city.name, validCity);
										return citySelect.append(option);
									}
								});
							} else {
								const city = cityData[1];
								const value = cityData[0];
								const option = new Option(city.name, value);
								return citySelect.append(option);
							}
						});
					citySelect.disabled = false;
					citySelect.refresh();

					// Reset Categories dropdown
					categorySelect.innerHTML = "";
					categorySelect.disabled = true;
					categorySelect.append(categoryDefaultOption);
					categorySelect.refresh();
					servicePointsCodes = []; // Reset service array
				});
			}

			if (citySelect !== null) {
				citySelect.addEventListener("change", async () => {
					enableFirst = true;
					// Reset Categories dropdown
					categorySelect.innerHTML = "";
					categorySelect.append(categoryDefaultOption);

					Object.values(departments[departmentSelect.value].cities[citySelect.value].categories).map(({ stores }) => {
						return stores.map(code => {
							const serviceCenter = {
								city: citySelect.value,
								code: code,
								areaCode: departments[departmentSelect.value].cities[citySelect.value].areaCode,
							};

							if (brandSelect !== null) {
								if (code.match(brandSelect.value)) {
									return servicePointsCodes.push(serviceCenter);
								}
							} else {
								return servicePointsCodes.push(serviceCenter);
							}
						});
					});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then(servicePoints => setServiceCenters(servicePoints));

					Object.entries(departments[departmentSelect.value].cities[citySelect.value].categories).map(categoryData => {
						if (validCategories.length) {
							validCategories.map(validCategory => {
								if (categoryData[0] === validCategory) {
									const category = categories[validCategory].name;
									const option = new Option(category, validCategory);
									return categorySelect.append(option);
								}
							});
						} else {
							const category = categories[categoryData[0]].name;
							const label = categoryData[0];
							const option = new Option(category, label);
							return categorySelect.append(option);
						}
					});
					categorySelect.disabled = false;
					categorySelect.refresh();
					servicePointsCodes = []; // Reset service array
				});
			}

			if (categories !== undefined && categorySelect !== null) {
				categorySelect.addEventListener("change", async () => {
					enableFirst = true;
					Object.values(departments[departmentSelect.value].cities[citySelect.value].categories[categorySelect.value].stores).map(code => {
						const serviceCenter = {
							city: citySelect.value,
							code: code,
							areaCode: departments[departmentSelect.value].cities[citySelect.value].areaCode,
						};
						if (brandSelect !== null) {
							if (code.match(brandSelect.value)) {
								return servicePointsCodes.push(serviceCenter);
							}
						} else {
							return servicePointsCodes.push(serviceCenter);
						}
					});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then((servicePoints) => setServiceCenters(servicePoints));
					servicePointsCodes = []; // Reset service array
				});
			}
		});
}

async function getServicePoints({ servicePointsCodes, serviceCenters }) {
	const ServiceCenter = await import("./service-center.js"),
	_servicePointsCodes = [];
	let _areaCode = "",
		_city = "";

	servicePointsCodes.map(({ city, code, areaCode }) => {
		_areaCode = areaCode;
		_city = city;
		_servicePointsCodes.push(code);
	});
	// remove duplicates
	servicePointsCodes = [...new Set(_servicePointsCodes)];

	return await servicePointsCodes.map(code => {
		let servicePoint = {
			areaCode: _areaCode,
			city: _city,
			coordinates: {
				lat: serviceCenters[code].lat,
				lng: serviceCenters[code].lng,
			},
			id: code
		};
		servicePoint = { ...servicePoint, ...serviceCenters[code] };
		return new ServiceCenter.default(servicePoint);
	});
}

async function setServiceCenters(serviceCenterPoints) {
	const Menu = await import("./menu.js");
	const menuItems = [];

	// render service points menu items
	serviceCenterPoints.map(serviceCenterPoint => {
		serviceCenterPoint.active = enableFirst;
		enableFirst = false;
		if(serviceCenterPoint.isCallCenter) {
			serviceCenterPoint.coordinates = {
				lat: 4.6482837,
				lng: -74.2478938
			};
		}
		return menuItems.push(new Menu.default(serviceCenterPoint, mapElement).item());
	});
	if (mapLoaded)
		mapElement.setMarkers(serviceCenterPoints); // render map markers
	render(menuItems, menuContainer);
}