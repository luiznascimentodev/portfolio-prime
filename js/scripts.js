// Monitorando o LCP antes de iniciar animações pesadas
const observer = new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            // LCP concluído, podemos iniciar animações
            startTypingEffect();
            observer.disconnect();
        }
    }
});

// Registrar observador para LCP
if (PerformanceObserver.supportedEntryTypes.includes('largest-contentful-paint')) {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
} else {
    // Fallback para navegadores que não suportam PerformanceObserver
    window.addEventListener('load', startTypingEffect);
}

// Restante das funções com leve atraso para priorizar renderização
window.addEventListener('load', () => {
    // Pequeno atraso para garantir que o LCP já ocorreu
    setTimeout(() => {
        initializeDarkModeToggle();
        setupPageSpecificAnimations();
    }, 300);
});

// Configuração dos títulos para diferentes páginas
const pageTitles = {
    "/index.html": "Olá, Seja Bem-Vindo!",
    "/curriculo.html": "Conheça minha carreira!",
    "/contato.html": "Vamos conversar?",
    "/projetos.html": "Conheça meus códigos!"
};

function setupPageSpecificAnimations() {
    const currentPath = window.location.pathname;
    const navbarText = pageTitles[currentPath] || "Bem-vindo ao nosso site!";
    let navbarIndex = 0;
    const navbarTypingEffect = document.querySelector(".navbar-brand");

    if (navbarTypingEffect) {
        navbarTypingEffect.style.color = "#3498db";
        navbarTypingEffect.style.fontSize = "1.2rem";
        navbarTypingEffect.textContent = "";

        function typeNavbarText() {
            if (navbarIndex < navbarText.length) {
                navbarTypingEffect.textContent += navbarText.charAt(navbarIndex);
                navbarIndex++;
                setTimeout(typeNavbarText, 90);
            }
        }

        typeNavbarText();
    }

    // Botão "Mostrar Mais" - adicionado após renderização principal
    const showMoreBtn = document.getElementById("show-more-btn");
    if (showMoreBtn) {
        showMoreBtn.addEventListener("click", function() {
            const moreText = document.getElementById("more-text");

            if (moreText.style.display === "none") {
                moreText.style.display = "block";
                this.textContent = "Mostrar Menos";
            } else {
                moreText.style.display = "none";
                this.textContent = "Mais Detalhes";
            }
        });
    }

    // Animação para texto animado
    const animatedText = document.getElementById("animated-text");
    if (animatedText && window.gsap) {
        gsap.to(animatedText, {
            duration: 1,
            x: 0,
            opacity: 1,
            ease: "power2.out",
            delay: 0.5
        });
    }
}

// Atualizar o botão de dark mode para incluir um ícone que sinalize o estado atual
function initializeDarkModeToggle() {
    const trilho = document.getElementById("trilho");
    const indicador = document.getElementById("indicador");
    const body = document.querySelector("body");
    const darkModeIcon = document.createElement("i");

    // Configurar o ícone inicial
    darkModeIcon.classList.add("bi", "bi-moon"); // Ícone de lua para dark mode
    indicador.appendChild(darkModeIcon); // Adicionar o ícone dentro do indicador

    if (trilho) {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            trilho.classList.add("dark");
            body.classList.add("dark");
            darkModeIcon.classList.replace("bi-moon", "bi-sun"); // Ícone de sol para light mode
        }

        trilho.addEventListener("click", () => {
            trilho.classList.toggle("dark");
            body.classList.toggle("dark");

            const darkModeEnabled = body.classList.contains("dark");
            localStorage.setItem("darkMode", darkModeEnabled);

            // Atualizar o ícone com base no estado atual
            if (darkModeEnabled) {
                darkModeIcon.classList.replace("bi-moon", "bi-sun");
            } else {
                darkModeIcon.classList.replace("bi-sun", "bi-moon");
            }

            const darkModeEvent = new CustomEvent("darkModeToggle", {
                detail: { darkModeEnabled }
            });

            window.dispatchEvent(darkModeEvent);
        });
    } else {
        console.error('Elemento com ID "trilho" não encontrado.');
    }
}


