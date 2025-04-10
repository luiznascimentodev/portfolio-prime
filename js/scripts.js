// Carregar módulos do Bootstrap sob demanda
const loadBootstrapModule = async (module) => {
    try {
        const component = await import(`bootstrap/js/dist/${module}`);
        return component.default;
    } catch (error) {
        console.warn(`Failed to load ${module}:`, error);
        return null;
    }
};

// Inicialização básica
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de digitação (mantido por ser crítico para UX)
    const typingEffect = (text, element, speed = 130) => {
        let index = 0;
        
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Inicializar apenas funcionalidades essenciais
    const init = async () => {
        // Carregar Collapse apenas se necessário para o menu mobile
        if (document.querySelector('.navbar-collapse')) {
            const Collapse = await loadBootstrapModule('collapse');
            if (Collapse) {
                document.querySelectorAll('.navbar-collapse').forEach(el => new Collapse(el));
            }
        }

        // Iniciar efeito de digitação se elemento existir
        const typingElement = document.getElementById('typing-effect');
        if (typingElement) {
            typingEffect('Transformando ideias em soluções digitais', typingElement);
        }
    };

    init();
});

// Carregar módulos adicionais conforme interação do usuário
document.addEventListener('click', async (e) => {
    // Carregar modal apenas quando necessário
    if (e.target.dataset.bsToggle === 'modal') {
        const Modal = await loadBootstrapModule('modal');
        if (Modal) {
            const modalId = e.target.dataset.bsTarget;
            const modalElement = document.querySelector(modalId);
            new Modal(modalElement);
        }
    }
});

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


