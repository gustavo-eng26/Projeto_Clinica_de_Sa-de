// ========== VARIÁVEIS GLOBAIS ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const modal = document.getElementById('agendamento');
const closeModal = document.getElementById('closeModal');
const btnAgendar = document.getElementById('btnAgendar');
const formAgendamento = document.getElementById('formAgendamento');

// ========== MENU HAMBURGER ==========
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ========== MODAL AGENDAMENTO ==========
btnAgendar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========== FORM AGENDAMENTO ==========
formAgendamento.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        especialidade: document.getElementById('especialidade').value,
        medico: document.getElementById('medico').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        mensagem: document.getElementById('mensagem').value
    };

    // Validação da data
    const dataAgendamento = new Date(formData.data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataAgendamento < hoje) {
        showAlert('Por favor, selecione uma data futura.', 'error');
        return;
    }

    // Simulação de envio
    console.log('Dados do agendamento:', formData);
    
    showAlert('Agendamento confirmado! Você receberá um email de confirmação em breve.', 'success');
    
    // Limpar formulário
    formAgendamento.reset();
    
    // Fechar modal
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 2000);
});

// ========== FUNÇÃO ALERT CUSTOMIZADA ==========
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert alert-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };

    alertDiv.innerHTML = `
        <span class="alert-icon">${icons[type]}</span>
        <span class="alert-message">${message}</span>
    `;

    document.body.appendChild(alertDiv);

    // Adicionar estilo via style tag
    if (!document.getElementById('alert-styles')) {
        const style = document.createElement('style');
        style.id = 'alert-styles';
        style.textContent = `
            .custom-alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 3000;
                animation: slideInAlert 0.3s ease;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .alert-success {
                background: #10b981;
                color: white;
            }

            .alert-error {
                background: #ef4444;
                color: white;
            }

            .alert-info {
                background: #3b82f6;
                color: white;
            }

            .alert-icon {
                font-weight: bold;
                font-size: 1.2rem;
            }

            @keyframes slideInAlert {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideOutAlert {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }

            .custom-alert.remove {
                animation: slideOutAlert 0.3s ease;
            }

            @media (max-width: 480px) {
                .custom-alert {
                    right: 10px;
                    left: 10px;
                    width: auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remover após 3 segundos
    setTimeout(() => {
        alertDiv.classList.add('remove');
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// ========== VALIDAÇÃO DE DATA MÍNIMA ==========
document.addEventListener('DOMContentLoaded', () => {
    const inputData = document.getElementById('data');
    const hoje = new Date().toISOString().split('T')[0];
    inputData.setAttribute('min', hoje);
});

// ========== SCROLL SUAVE PARA ÂNCORAS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && href !== '#agendamento') {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ========== FUNÇÃO DE VALIDAÇÃO DE EMAIL ==========
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ========== FUNÇÃO DE VALIDAÇÃO DE TELEFONE ==========
function validarTelefone(telefone) {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    const apenasNumeros = telefone.replace(/\D/g, '');
    return apenasNumeros.length >= 10 && apenasNumeros.length <= 11;
}

// ========== MÁSCARA PARA TELEFONE ==========
const inputTelefone = document.getElementById('telefone');

inputTelefone.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }
    
    if (valor.length <= 2) {
        e.target.value = valor;
    } else if (valor.length <= 6) {
        e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
    } else if (valor.length <= 10) {
        e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 6)}-${valor.slice(6)}`;
    } else {
        e.target.value = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7)}`;
    }
});

// ========== ANIMAÇÃO DE NÚMEROS (CONTADOR) ==========
function animarNumero(elemento, alvo, duracao = 2000) {
    let inicio = 0;
    const increment = alvo / (duracao / 16);
    
    function atualizar() {
        inicio += increment;
        if (inicio >= alvo) {
            elemento.textContent = alvo.toLocaleString('pt-BR');
        } else {
            elemento.textContent = Math.floor(inicio).toLocaleString('pt-BR');
            requestAnimationFrame(atualizar);
        }
    }
    
    atualizar();
}

// ========== SCROLL OBSERVER PARA ANIMAÇÕES ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.servico-card, .medico-card, .contato-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== NAVBAR BACKGROUND CHANGE ON SCROLL ==========
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========== TOOLTIP HOVER ==========
function adicionarTooltip(elemento, texto) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = texto;
    
    if (!document.getElementById('tooltip-styles')) {
        const style = document.createElement('style');
        style.id = 'tooltip-styles';
        style.textContent = `
            .tooltip {
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.85rem;
                white-space: nowrap;
                pointer-events: none;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                bottom: 120%;
                left: 50%;
                transform: translateX(-50%);
            }

            .tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 5px solid transparent;
                border-top-color: #333;
            }

            .tooltip.visible {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    elemento.style.position = 'relative';
    elemento.addEventListener('mouseenter', () => {
        tooltip.classList.add('visible');
    });
    
    elemento.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
    });
}

// ========== IMPRESSÃO DE RECIBO (OPCIONAL) ==========
function imprimirRecibo() {
    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        especialidade: document.getElementById('especialidade').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value
    };

    const conteudo = `
        RECIBO DE AGENDAMENTO - CLÍNICA MEDICARE
        =====================================
        Data do Agendamento: ${new Date().toLocaleDateString('pt-BR')}
        
        Paciente: ${formData.nome}
        E-mail: ${formData.email}
        Telefone: ${formData.telefone}
        
        Especialidade: ${formData.especialidade}
        Data da Consulta: ${new Date(formData.data).toLocaleDateString('pt-BR')}
        Hora: ${formData.hora}
        
        Obrigado por escolher a MediCare!
    `;

    console.log(conteudo);
    return conteudo;
}

// ========== CARREGAMENTO DA PÁGINA ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website MediCare carregado com sucesso!');
    
    // Adicionar classe 'loaded' ao body
    document.body.classList.add('loaded');
});

// ========== PREVENIR SUBMIT DUPLO ==========
let enviandoFormulario = false;

formAgendamento.addEventListener('submit', (e) => {
    if (enviandoFormulario) {
        e.preventDefault();
        return;
    }
    
    enviandoFormulario = true;
    
    setTimeout(() => {
        enviandoFormulario = false;
    }, 3000);
});

// ========== DARK MODE TOGGLE (OPCIONAL) ==========
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Verificar preferência salva
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
