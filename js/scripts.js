// Corrigir o efeito de digitação para garantir que o elemento seja encontrado e o texto seja exibido corretamente
const text = "Transformando ideias em soluções digitais";
let index = 0;

function startTypingEffect() {
    const typingEffect = document.getElementById("typing-effect");
    if (!typingEffect) {
        console.error('Elemento com ID "typing-effect" não encontrado. Verifique se o ID está correto no HTML.');
        return;
    }

    function type() {
        if (index < text.length) {
            typingEffect.textContent += text.charAt(index);
            index++;
            setTimeout(type, 90);
        } else {
            blinkCursor();
        }
    }

    function blinkCursor() {
        let blinkCount = 0;
        const interval = setInterval(() => {
            if (typingEffect.textContent.endsWith("|")) {
                typingEffect.textContent = typingEffect.textContent.slice(0, -1);
            } else {
                typingEffect.textContent += "|";
            }

            blinkCount++;
            if (blinkCount >= 6) {
                clearInterval(interval);
                typingEffect.textContent = text; // Remove o cursor após o piscar
            }
        }, 500);
    }

    type();
}

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

// Funcionalidade de alternância de tema escuro
function initializeDarkModeToggle() {
    const trilho = document.getElementById("trilho");
    const body = document.querySelector("body");

    if (trilho) {
        const isDarkMode = localStorage.getItem("darkMode") === "true";
        if (isDarkMode) {
            trilho.classList.add("dark");
            body.classList.add("dark");
        }

        trilho.addEventListener("click", () => {
            trilho.classList.toggle("dark");
            body.classList.toggle("dark");

            const darkModeEnabled = body.classList.contains("dark");
            localStorage.setItem("darkMode", darkModeEnabled);

            const darkModeEvent = new CustomEvent("darkModeToggle", {
                detail: { darkModeEnabled }
            });

            window.dispatchEvent(darkModeEvent);
        });
    } else {
        console.error('Elemento com ID "trilho" não encontrado.');
    }
}


