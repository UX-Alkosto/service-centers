import Select from "./select.js";

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
				const Map = await import("./map.js");
				mapElement = new Map.default({
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
		validCities = new Array(),
		validCategories = new Array(),
		servicePointsCodes = new Array();

	document.addEventListener("updateCenter", (e) => {
		const center = e.detail.center;
		if (center !== null) {
			const item = document.getElementById(center);
			item.click();
			setTimeout(() => document.querySelector(".service-centers__menu").scrollTop = item.offsetTop, 250);
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

	app.select.init(); // init custom dropdowns

	if (appConfig.jsonFile !== undefined) {
		app.get(appConfig.jsonFile)
			.then(async ({ brands, categories, departments, serviceCenters }) => {
				await app.map.init();
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
						mapElement.infoWindow.close();

						brands[brandSelect.value].departments.map(departmentValue => {
							const option = new Option(departments[departmentValue].name, departmentValue);
							return departmentSelect.append(option);
						});
						departmentSelect.disabled = false;
						departmentSelect.refresh();

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
									return categoriesData[1].stores.map((code) => {
										const serviceCenter = {
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
						}).then((servicePoints) => setServiceCenters(servicePoints));

						validCities = [...new Set(validCities)]; //Remove duplicated cities
						validCategories = [...new Set(validCategories)]; //Remove duplicated cities

						// Get Cities and render options in dropdown
						Object.entries(departments[departmentSelect.value].cities)
							.map((cityData) => {
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
							return stores.map((code) => {
								const serviceCenter = {
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
						}).then((servicePoints) => setServiceCenters(servicePoints));

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
				}
			});
	}

	async function getServicePoints({ servicePointsCodes, serviceCenters }) {
		const ServiceCenter = await import("./service-center.js"),
		_servicePointsCodes = [];
		let _areaCode = "";

		servicePointsCodes.map(({ code, areaCode }) => {
			_servicePointsCodes.push(code);
			_areaCode = areaCode;
		});
		// remove duplicates
		servicePointsCodes = [...new Set(_servicePointsCodes)];

		return await servicePointsCodes.map(code => {
			let servicePoint = {
				id: code,
				areaCode: _areaCode,
				coordinates: {
					lat: serviceCenters[code].lat,
					lng: serviceCenters[code].lng,
				},
			};
			servicePoint = { ...servicePoint, ...serviceCenters[code] };
			return new ServiceCenter.default(servicePoint);
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
