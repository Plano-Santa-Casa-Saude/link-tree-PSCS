// Dados das notícias do carrossel
const carouselNews = [
    {
        id: 1,
        title: "Novo Projeto Revolucionário Lançado!",
        excerpt: "Acabamos de lançar nosso novo projeto que promete revolucionar a forma como trabalhamos com tecnologia. Uma solução inovadora que vai mudar o mercado.",
        date: "2024-01-15",
        tags: ["Tecnologia", "Inovação"],
        image: "images/img_carrossel_01.PNG"
    },
    {
        id: 2,
        title: "Dicas Essenciais de Produtividade",
        excerpt: "Compartilhando algumas técnicas que uso diariamente para aumentar minha produtividade e foco. Métodos comprovados que realmente funcionam.",
        date: "2024-01-10",
        tags: ["Produtividade", "Dicas"],
        image: "images/img_carrossel_02.PNG"
    },
    {
        id: 3,
        title: "Atualização Importante dos Serviços",
        excerpt: "Importante atualização sobre nossos serviços e novas funcionalidades disponíveis. Melhorias significativas na experiência do usuário.",
        date: "2024-01-05",
        tags: ["Atualização", "Serviços"],
        image: "images/img_carrossel_03.PNG"
    }
];

// Variáveis do carrossel
let currentSlide = 0;
let carouselInterval;

// Função para renderizar o carrossel
function renderCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    
    // Limpar conteúdo existente
    carouselTrack.innerHTML = '';
    carouselDots.innerHTML = '';
    
    // Criar slides
    carouselNews.forEach((news, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        slide.innerHTML = `
            <img src="${news.image}" alt="${news.title}" loading="lazy">
            <div class="carousel-slide-content">
                <h3 class="carousel-slide-title">${news.title}</h3>
                <p class="carousel-slide-excerpt">${news.excerpt}</p>
                <div class="carousel-slide-meta">
                    <span class="carousel-slide-date">${formatDate(news.date)}</span>
                    <div class="carousel-slide-tags">
                        ${news.tags.map(tag => `<span class="carousel-slide-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        
        carouselTrack.appendChild(slide);
        
        // Criar dot
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
    
    // Configurar botões
    document.getElementById('prev-btn').addEventListener('click', prevSlide);
    document.getElementById('next-btn').addEventListener('click', nextSlide);
    
    // Iniciar autoplay
    startCarouselAutoplay();
}

// Função para ir para slide específico
function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Função para próximo slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselNews.length;
    updateCarousel();
}

// Função para slide anterior
function prevSlide() {
    currentSlide = currentSlide === 0 ? carouselNews.length - 1 : currentSlide - 1;
    updateCarousel();
}

// Função para atualizar carrossel
function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Atualizar posição do track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Função para iniciar autoplay
function startCarouselAutoplay() {
    carouselInterval = setInterval(nextSlide, 5000); // Mudar slide a cada 5 segundos
}

// Função para parar autoplay
function stopCarouselAutoplay() {
    clearInterval(carouselInterval);
}

// Função para reiniciar autoplay
function restartCarouselAutoplay() {
    stopCarouselAutoplay();
    startCarouselAutoplay();
}



// Função para formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}



// Função para alternar tema
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('theme-btn');
    const icon = themeBtn.querySelector('i');
    const profileImg = document.getElementById('profile-img');
    
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        icon.className = 'fas fa-sun';
        profileImg.src = 'images/2.png';
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-moon';
        profileImg.src = 'images/logo_scs.png';
        localStorage.setItem('theme', 'light');
    }
}

// Função para carregar tema salvo
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeBtn = document.getElementById('theme-btn');
    const icon = themeBtn.querySelector('i');
    const profileImg = document.getElementById('profile-img');
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-moon';
        profileImg.src = 'images/logo_scs.png';
    }
}

// Função para adicionar efeitos de hover nos links
function addLinkEffects() {
    const links = document.querySelectorAll('.sidebar-link');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Função para animar elementos quando entram na viewport
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.sidebar-link').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}



// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Carregar tema salvo
    loadSavedTheme();
    
    // Renderizar carrossel de notícias
    renderCarousel();
    
    // Adicionar efeitos nos links
    addLinkEffects();
    
    // Configurar botão de tema
    document.getElementById('theme-btn').addEventListener('click', toggleTheme);
    
    // Animar elementos no scroll
    animateOnScroll();
    
    // Adicionar efeito de digitação no nome
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
    const originalText = profileName.textContent;
    profileName.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            profileName.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
    }
    
    // Pausar autoplay quando o mouse estiver sobre o carrossel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopCarouselAutoplay);
    carouselContainer.addEventListener('mouseleave', startCarouselAutoplay);
});

// Adicionar efeito de partículas no background (opcional)
function createParticles() {
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--accent-color);
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        
        container.appendChild(particle);
    }
}

// Adicionar CSS para animação de partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
`;
document.head.appendChild(style);

// Inicializar partículas
setTimeout(createParticles, 2000);
