// Importa apenas os componentes necessários do Bootstrap
import { Collapse } from 'bootstrap/js/dist/collapse';

// Inicializa componentes essenciais
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa Collapse para o menu mobile
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        new Collapse(navbarToggler);
    }
});

// Carregamento lazy de outros componentes conforme necessário
const loadTooltips = async () => {
    const { Tooltip } = await import('bootstrap/js/dist/tooltip');
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => new Tooltip(el));
};

// Carregar tooltips apenas quando o mouse passar sobre elementos que os usam
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
    el.addEventListener('mouseenter', loadTooltips, { once: true });
});
