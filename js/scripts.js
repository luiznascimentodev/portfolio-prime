const text = "Transformando ideias em soluções digitais";
let index = 0;
const typingEffect = document.getElementById("typing-effect");

if (!typingEffect) {
	console.error('Element with ID "typing-effect" not found.');
} else {
	function type() {
		if (index < text.length) {
			const span = document.createElement("span");
			span.textContent = text.charAt(index);
			span.style.opacity = "0";
			typingEffect.appendChild(span);

			// Animate each letter with a fade-in effect
			setTimeout(() => {
				span.style.transition = "opacity 0.3s ease-in";
				span.style.opacity = "1";
			}, 50);

			index++;
			setTimeout(type, 180); // Adjust typing speed
		} else {
			blinkCursor();
		}
	}
	type();
}

function blinkCursor() {
	let blinkCount = 0; // Initialize blinkCount
	const interval = setInterval(() => {
		if (typingEffect.textContent.endsWith(".")) {
			typingEffect.textContent = typingEffect.textContent.slice(0, -1);
		} else {
			typingEffect.textContent += ".";
		}
		blinkCount++;
		if (blinkCount >= 3) {
			// Change to blink 3 times
			clearInterval(interval);
			typingEffect.textContent = `${text}!`;
		}
	}, 240); // Acelerado em mais 20%
}

type();

const pageTitles = {
	"/index.html": "Olá, Seja Bem-Vindo!",
	"/curriculo.html": "Conheça minha carreira!",
	"/contato.html": "Vamos conversar?",
	"/projetos.html": "Conheça meus códigos!",
};

const currentPath = window.location.pathname;
const navbarText = pageTitles[currentPath] || "Bem-vindo ao nosso site!";
let navbarIndex = 0;
const navbarTypingEffect = document.querySelector(".navbar-brand");

// Estilize a navbar-brand com as cores do site
navbarTypingEffect.style.color = "#3498db";
navbarTypingEffect.style.fontSize = "1.2rem";

// Certifique-se de limpar o texto antes de começar a digitar
navbarTypingEffect.textContent = "";

function typeNavbarText() {
	if (navbarIndex < navbarText.length) {
		navbarTypingEffect.textContent += navbarText.charAt(navbarIndex);
		navbarIndex++;
		setTimeout(typeNavbarText, 90); // Acelerado em mais 20%
	}
}

// Certifique-se de que a função typeNavbarText seja chamada apenas uma vez
document.addEventListener("DOMContentLoaded", () => {
	typeNavbarText();
});

// Adicione animações ao rolar a página
document.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger);

	gsap.from(".navbar", {
		duration: 0.4,
		y: -24,
		opacity: 0,
		ease: "power2.out",
	});
	gsap.from(".badge", {
		duration: 0.4,
		scale: 0,
		opacity: 0,
		ease: "back.out(1.7)",
		delay: 0.16,
	});
	gsap.from(".text-xxl-start", {
		duration: 0.4,
		x: -40,
		opacity: 0,
		ease: "power2.out",
		delay: 0.24,
	});
});

function initializeDarkModeToggle() {
	const trilho = document.getElementById("trilho");
	const body = document.querySelector("body");

	// Aplique o tema escuro ao carregar a página com base no localStorage
	document.addEventListener("DOMContentLoaded", () => {
		const isDarkMode = localStorage.getItem("darkMode") === "true";
		if (isDarkMode) {
			trilho?.classList.add("dark");
			body.classList.add("dark");
		}
	});

	if (trilho) {
		trilho.addEventListener("click", () => {
			trilho.classList.toggle("dark");
			body.classList.toggle("dark");

			// Salve a preferência do usuário no localStorage
			const darkModeEnabled = body.classList.contains("dark");
			localStorage.setItem("darkMode", darkModeEnabled);

			// Propague a decisão para todas as páginas
			const darkModeEvent = new CustomEvent("darkModeToggle", {
				detail: { darkModeEnabled },
			});
			window.dispatchEvent(darkModeEvent);
		});
	} else {
		console.error('Elemento com ID "trilho" não encontrado.');
	}

	// Ouça o evento de dark mode para sincronizar entre páginas
	window.addEventListener("darkModeToggle", (event) => {
		const { darkModeEnabled } = event.detail;
		if (darkModeEnabled) {
			trilho?.classList.add("dark");
			body.classList.add("dark");
		} else {
			trilho?.classList.remove("dark");
			body.classList.remove("dark");
		}
	});
}

initializeDarkModeToggle();

document.getElementById("show-more-btn").addEventListener("click", function () {
	const moreText = document.getElementById("more-text");
	if (moreText.style.display === "none") {
		moreText.style.display = "block";
		this.textContent = "Mostrar Menos";
	} else {
		moreText.style.display = "none";
		this.textContent = "Mais Detalhes";
	}
});
