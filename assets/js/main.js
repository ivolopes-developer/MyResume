(function () {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim();
		if (all) {
			return [...document.querySelectorAll(el)];
		} else {
			return document.querySelector(el);
		}
	};

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		let selectEl = select(el, all);

		if (selectEl) {
			if (all) {
				selectEl.forEach((e) => e.addEventListener(type, listener));
			} else {
				selectEl.addEventListener(type, listener);
			}
		}
	};

	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	/**
	 * Mobile nav toggle
	 */
	on("click", ".mobile-nav-toggle", function (e) {
		select("#navbar").classList.toggle("navbar-mobile");
		this.classList.toggle("bi-list");
		this.classList.toggle("bi-x");
	});

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on(
		"click",
		"#navbar .nav-link",
		function (e) {
			let section = select(this.hash);
			if (section) {
				e.preventDefault();

				let navbar = select("#navbar");
				let header = select("#header");
				let sections = select("section", true);
				let navlinks = select("#navbar .nav-link", true);

				navlinks.forEach((item) => {
					item.classList.remove("active");
				});

				this.classList.add("active");

				if (navbar.classList.contains("navbar-mobile")) {
					navbar.classList.remove("navbar-mobile");
					let navbarToggle = select(".mobile-nav-toggle");
					navbarToggle.classList.toggle("bi-list");
					navbarToggle.classList.toggle("bi-x");
				}

				if (this.hash == "#header") {
					header.classList.remove("header-top");
					sections.forEach((item) => {
						item.classList.remove("section-show");
					});
					return;
				}

				if (!header.classList.contains("header-top")) {
					header.classList.add("header-top");
					setTimeout(function () {
						sections.forEach((item) => {
							item.classList.remove("section-show");
						});
						section.classList.add("section-show");
					}, 350);
				} else {
					sections.forEach((item) => {
						item.classList.remove("section-show");
					});
					section.classList.add("section-show");
				}

				scrollto(this.hash);
			}
		},
		true
	);

	/**
	 * Activate/show sections on load with hash links
	 */
	window.addEventListener("load", () => {
		if (window.location.hash) {
			let initial_nav = select(window.location.hash);

			if (initial_nav) {
				let header = select("#header");
				let navlinks = select("#navbar .nav-link", true);

				header.classList.add("header-top");

				navlinks.forEach((item) => {
					if (item.getAttribute("href") == window.location.hash) {
						item.classList.add("active");
					} else {
						item.classList.remove("active");
					}
				});

				setTimeout(function () {
					initial_nav.classList.add("section-show");
				}, 350);

				scrollto(window.location.hash);
			}
		}
	});

	/**
	 * Skills animation
	 */
	let skilsContent = select(".skills-content");
	if (skilsContent) {
		new Waypoint({
			element: skilsContent,
			offset: "90%",
			handler: function (direction) {
				let progress = select(".progress .progress-bar", true);
				progress.forEach((el) => {
					el.style.width = el.getAttribute("aria-valuenow") + "%";
				});
			},
		});
	}

	/**
	 * Testimonials slider
	 */
	new Swiper(".testimonials-slider", {
		speed: 600,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		slidesPerView: "auto",
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},

			1200: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
		},
	});

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener("load", () => {
		let portfolioContainer = select(".portfolio-container");
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: ".portfolio-item",
				layoutMode: "fitRows",
			});

			let portfolioFilters = select("#portfolio-flters li", true);

			on(
				"click",
				"#portfolio-flters li",
				function (e) {
					e.preventDefault();
					portfolioFilters.forEach(function (el) {
						el.classList.remove("filter-active");
					});
					this.classList.add("filter-active");

					portfolioIsotope.arrange({
						filter: this.getAttribute("data-filter"),
					});
				},
				true
			);
		}
	});

	/**
	 * Initiate portfolio lightbox
	 */
	const portfolioLightbox = GLightbox({
		selector: ".portfolio-lightbox",
	});

	/**
	 * Initiate portfolio details lightbox
	 */
	const portfolioDetailsLightbox = GLightbox({
		selector: ".portfolio-details-lightbox",
		width: "90%",
		height: "90vh",
	});

	/**
	 * Portfolio details slider
	 */
	new Swiper(".portfolio-details-slider", {
		speed: 400,
		loop: false,
		// autoplay: {
		// 	delay: 5000,
		// 	disableOnInteraction: true,
		// },
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true,
		},
	});
})();

/*
calc idade
*/
let hoje = new Date();
let diaAniversario = 20;
let mesNascimento = 2;
let nascimento = 1999;
let idade = hoje.getFullYear() - nascimento;

/* This code is calculating the age of the user based on their birthdate. It first gets the current
date and then checks if the current day and month are greater than or equal to the user's birth day
and month. If it is, then it sets the age to the current year minus the birth year. If not, it
subtracts 1 from the age. Finally, it updates the HTML element with the id "idade" to display the
calculated age. The code uses querySelectorAll to select all elements with the id "idade" and
updates their innerHTML property to display the age. */
var temp = document.querySelectorAll("#idade");
for (let index = 0; index < temp.length; index++) {
	console.log(hoje.getDate(), hoje.getMonth() + 1);
	if (
		(hoje.getDate() >= diaAniversario || hoje.getDate() < diaAniversario) &&
		hoje.getMonth() + 1 >= mesNascimento
	) {
		//já fiz o anus
		temp[index].innerHTML = idade;
	} else {
		//não fiz o anus
		temp[index].innerHTML = idade - 1;
	}
}

// INICIO DAS PARTICULAS ----------------------------------------------------------------------------------------------------------------

/* ---- particles.js config ---- */

particlesJS("particles-js", {
	particles: {
		number: {
			value: 380,
			density: {
				enable: true,
				value_area: 3000,
			},
		},
		color: {
			value: "#ffffff",
		},
		shape: {
			type: "circle",
			stroke: {
				width: 0,
				color: "#fff",
			},
			polygon: {
				nb_sides: 5,
			},
		},
		opacity: {
			value: 1,
			random: true,
			anim: {
				enable: true,
				speed: 1,
				opacity_min: 0.1,
				sync: true,
			},
		},
		size: {
			value: 3,
			random: true,
			anim: {
				enable: false,
				speed: 40,
				size_min: 0.1,
				sync: false,
			},
		},
		line_linked: {
			enable: true,
			distance: 150,
			color: "#ffffff",
			opacity: 0.5,
			width: 1,
		},
		move: {
			enable: true,
			speed: 1,
			direction: "none",
			random: false,
			straight: false,
			out_mode: "out",
			bounce: false,
			attract: {
				enable: false,
				rotateX: 600,
				rotateY: 1200,
			},
		},
	},
	retina_detect: true,
});

// FIM DAS PARTICULAS ----------------------------------------------------------------------------------------------------------------

//SENDING CONTACT FORM TO DISCORD INICIO ------------------------------------

const { Webhook, MessageBuilder } = require("./discord-webhook-node");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const webhookURL =
	"https://discord.com/api/webhooks/1149356621865160737/MDpVbhEtd9iHD1m0tY8_mqY8rEqdEzf7Pwl4201-j2Si1kwQONdjReciMHSbQuYsj4U0";

app.post("/contact-form", async (req, res) => {
	const { name, email, message } = req.body;

	// Crie uma instância do webhook
	const webhook = new Webhook(webhookURL);

	// Crie uma mensagem
	const messageBuilder = new MessageBuilder()
		.setTitle("Formulário de Contato")
		.setColor("#FF0000") // Cor vermelha (você pode escolher outra)
		.addField("Nome", name, true)
		.addField("Email", email, true)
		.addField("Mensagem", message);

	// Envie a mensagem para o webhook
	await webhook.send(messageBuilder);

	res.send("Formulário enviado com sucesso para o Discord!");
});

app.listen(3000, () => {
	console.log("Servidor está rodando na porta 3000");
});

//SENDING CONTACT FORM TO DISCORD FIM ------------------------------------
