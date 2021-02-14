"use strict";
import Map from "./map.js";
import Select from "./select.js";
import ServiceCenter from "./service-center.js";
((appConfig, window, document) => {
	const app = {
		get: async (jsonUrl = "") => {
			if (jsonUrl.length) {
				return await fetch(jsonUrl, {
					cache: "force-cache",
					mode: "cors",
				}).then((response) => response.json())
				.then((data) => data);
			}
		},
		map: {
			init: async () => {
				mapElement = new Map({
					$element: "#service-centers-map",
					baseSite: appConfig.site,
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
		},
		menu: {
			render: ({
				active,
				address,
				areaCode,
				cellphone,
				id,
				map,
				name,
				phone,
			}) => {
				let phoneNumbers = ""; let cellPhoneNumbers = "";
				for (const phoneNumber of phone) {
					phoneNumbers += `<a href="tel:+57${areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${phoneNumber}</a>`;
				}
				for (const cellPhoneNumber of cellphone) {
					cellPhoneNumbers += `<a href="tel:+57${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${name}">${cellPhoneNumber}</a>`;
				}
				return `<div class="service-centers__menu__item">
                    <input type="radio" name="centro-servicio" id="${id}" ${active ? "checked" : ""}>
                    <label for="${id}">${name}<span class="${active ? "alk-icon-arrow-up" : "alk-icon-arrow-down"}"></span></label>
                    <div class="service-centers__menu__item__body" data-service-center="${id}">
                        <div class="address">
                            <p><strong><i class="alk-icon-rounded-position"></i> Dirección:</strong>
                                ${address}</p>
                        </div>
                        <div class="contact-phones">
                            ${phone.length ? `<div class="phone">
                                <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                                    ${phoneNumbers}
                                </p>
                            </div>` : ""}
                            ${cellphone.length ? `<div class="cell">
                                <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                                    ${cellPhoneNumbers}
                                </p>
                            </div>` : ""}
                        </div>
                        <div class="how-to-get">
                            <p>
                                <i class="alk-icon-arrive"></i><a rel="noopener" href="${map}" title="Indicaciones para llegar a ${name}" target="_blank">¿Cómo llegar?</a>
                            </p>
                        </div>
                    </div>
                </div>`;
			},
			toogleArrow: () => {
				const menuItems = document.querySelectorAll(".service-centers__menu__item > input");
				menuItems.forEach((menuItem) => {
					menuItem.addEventListener("change", (e) => {
						menuItems.forEach((otherMenuItem) => {
							const icon = otherMenuItem.nextElementSibling.querySelector("span");
							if (e.target === otherMenuItem) {
								icon.classList.replace("alk-icon-arrow-down", "alk-icon-arrow-up");
							} else {
								icon.classList.replace("alk-icon-arrow-up", "alk-icon-arrow-down");
							}
						});
					});
				});
			},
			animateMarker: () => {
				document.querySelectorAll(".service-centers__menu__item__body").forEach((menuItem) => {
					menuItem.addEventListener("mouseenter", () => {
						mapElement.bounceMarker(menuItem.dataset.serviceCenter, "start");
					});
					menuItem.addEventListener("mouseleave", () => {
						mapElement.bounceMarker(menuItem.dataset.serviceCenter, "stop");
					});
				});
			},
		},
		select: {
			init: () => document.querySelectorAll("[data-custom-select").forEach((selectElement) => new Select(selectElement)),
		},
	};
	const departmentSelect = document.getElementById("departamento");
	const citySelect = document.getElementById("ciudad");
	const categorySelect = document.getElementById("categoria");
	const departmentDefaultOption = new Option(`Selecciona un ${departmentSelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	const cityDefaultOption = new Option(`Selecciona una ${citySelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	const categoryDefaultOption = new Option(`Selecciona una ${categorySelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	const menuContainer = document.querySelector(".service-centers__menu");
	const mobileBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue("--service-centers-breakpoint").replace("px", ""));

	let enableFirst = true;
	let mapElement;
	let servicePointsCodes = [];

	departmentSelect.append(departmentDefaultOption);
	citySelect.append(cityDefaultOption);
	categorySelect.append(categoryDefaultOption);
	citySelect.disabled = true;
	categorySelect.disabled = true;
	app.select.init(); // init custom dropdowns

	if (appConfig.jsonFile !== undefined) {
		app.get(appConfig.jsonFile)
			.then(async ({ categories, departments, serviceCenters }) => {
				await app.map.init();
				// get departments and render options in dropdown
				Object.entries(departments).map((departmentData) => {
					const department = departmentData[1];
					const label = departmentData[0];
					const option = new Option(department.name, label);
					departmentSelect.append(option);
				});

				departmentSelect.refresh();

				document.addEventListener("updateCenter", (e) => {
					const center = e.detail.center;
					if (center !== null) {
						const item = document.getElementById(center);
						item.click();
						setTimeout(() => document.querySelector(".service-centers__menu").scrollTop = item.offsetTop, 250);
					}
				});

				departmentSelect.addEventListener("change", async () => {
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
					Object.values(departments[departmentSelect.value].cities)
						.map(({ areaCode, categories }) => {
							return Object.values(categories).map(({ stores }) => {
								return stores.map((code) => {
									const serviceCenter = {
										code: code,
										areaCode: areaCode,
									};
									return servicePointsCodes.push(serviceCenter);
								});
							});
						});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then((servicePoints) => setServiceCenters(servicePoints));
					// Get Cities and render options in dropdown
					Object.entries(departments[departmentSelect.value].cities)
						.map((cityData) => {
							const city = cityData[1];
							const label = cityData[0];
							const option = new Option(city.name, label);
							citySelect.append(option);
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

				citySelect.addEventListener("change", async () => {
					enableFirst = true;
					// Reset Categories dropdown
					categorySelect.innerHTML = "";
					categorySelect.append(categoryDefaultOption);

					Object.values(departments[departmentSelect.value].cities[citySelect.value].categories).map(({ stores }) => {
						return stores.map((code) => {
							const serviceCenter = {
								code: code,
								areaCode: departments[departmentSelect.value].cities[citySelect.value].areaCode,
							};
							return servicePointsCodes.push(serviceCenter);
						});
					});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then((servicePoints) => setServiceCenters(servicePoints));
					Object.entries(departments[departmentSelect.value].cities[citySelect.value].categories).map((categoryData) => {
						const category = categories[categoryData[0]].name;
						const label = categoryData[0];
						const option = new Option(category, label);
						categorySelect.append(option);
					});
					categorySelect.disabled = false;
					categorySelect.refresh();
					servicePointsCodes = []; // Reset service array
				});

				categorySelect.addEventListener("change", async () => {
					enableFirst = true;
					Object.values(departments[departmentSelect.value].cities[citySelect.value].categories[categorySelect.value].stores).map((code) => {
						const serviceCenter = {
							code: code,
							areaCode: departments[departmentSelect.value].cities[citySelect.value].areaCode,
						};
						return servicePointsCodes.push(serviceCenter);
					});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						serviceCenters: serviceCenters,
					}).then((servicePoints) => setServiceCenters(servicePoints));
					servicePointsCodes = []; // Reset service array
				});
			});
	}

	async function getServicePoints({ servicePointsCodes, serviceCenters }) {
		// remove duplicates
		let _areaCode = ""; const _servicePointsCodes = [];
		servicePointsCodes.map(({ code, areaCode }) => {
			_servicePointsCodes.push(code);
			_areaCode = areaCode;
		});
		servicePointsCodes = [...new Set(_servicePointsCodes)];

		return await servicePointsCodes.map((code) => {
			let servicePoint = {
				id: code,
				areaCode: _areaCode,
				coordinates: {
					lat: serviceCenters[code].lat,
					lng: serviceCenters[code].lng,
				},
			};
			servicePoint = { ...servicePoint, ...serviceCenters[code] };
			return new ServiceCenter(servicePoint);
		});
	}

	function setServiceCenters(serviceCenterPoints) {
		// reset menu items
		menuContainer.innerHTML = "";
		mapElement.setMarkers(serviceCenterPoints);
		// render service points menu items
		serviceCenterPoints.map((serviceCenterPoint) => {
			serviceCenterPoint.active = enableFirst;
			enableFirst = false;
			return menuContainer.insertAdjacentHTML("beforeend", app.menu.render(serviceCenterPoint));
		});
		app.menu.toogleArrow();
		app.menu.animateMarker();
	}
	// eslint-disable-next-line no-undef
})(appConfig, window, document);
