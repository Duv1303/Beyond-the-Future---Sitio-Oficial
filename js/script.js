// Script para funcionalidades interactivas del sitio - CORREGIDO

document.addEventListener('DOMContentLoaded', function() {
    // PREVENIR PROBLEMAS DE VIEWPORT EN MÓVILES
    setupViewportFix();
    
    // Inicializar partículas
    initParticles();
    
    // Inicializar carrusel
    initCarousel();
    
    // Navegación suave
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (window.innerWidth <= 768) {
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    const mainNav = document.querySelector('.main-nav');
                    if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                        mobileMenuBtn.classList.remove('active');
                        mainNav.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Botón de menú móvil - MEJORADO
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Indicador de scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Botón de descarga de demo - OPTIMIZADO
    const downloadBtn = document.getElementById('download-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear efecto de descarga
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando descarga...';
            this.classList.add('downloading');
            
            // Usar setTimeout para evitar bloqueo de UI
            setTimeout(() => {
                // Crear enlace de descarga directa
                const fileId = '1fpok1yFQaivqwK7f6BmomKuynz3FMqdt';
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                
                // Método más estable para descargas
                const downloadLink = document.createElement('a');
                downloadLink.href = downloadUrl;
                downloadLink.setAttribute('download', 'BeyondTheFuture_Demo.zip');
                downloadLink.setAttribute('target', '_blank');
                downloadLink.style.display = 'none';
                
                document.body.appendChild(downloadLink);
                downloadLink.click();
                
                // Limpiar después de un tiempo
                setTimeout(() => {
                    document.body.removeChild(downloadLink);
                    this.innerHTML = originalText;
                    this.classList.remove('downloading');
                    
                    showDownloadMessage();
                }, 1000);
                
            }, 500);
        });
    }
    
    // Función para mostrar mensaje de descarga
    function showDownloadMessage() {
        const downloadMessage = document.createElement('div');
        downloadMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--electric-blue);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        downloadMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            ¡Descarga iniciada! Revisa tu carpeta de descargas.
        `;
        
        document.body.appendChild(downloadMessage);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            downloadMessage.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (downloadMessage.parentNode) {
                    document.body.removeChild(downloadMessage);
                }
            }, 300);
        }, 5000);
    }
    
    // Animación de aparición al hacer scroll - OPTIMIZADA
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Dejar de observar después de que se anime
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const elementsToAnimate = document.querySelectorAll('.feature-card, .character-card, .team-member, .demo-card');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-element');
        observer.observe(element);
    });
    
    // Efecto de escritura para el título
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Delay inicial reducido
        setTimeout(typeWriter, 300);
    }
    
    // Cambio de header al hacer scroll - OPTIMIZADO
    const header = document.querySelector('.main-header');
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // Debounce para mejorar rendimiento
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(10, 14, 41, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.backgroundColor = 'rgba(10, 14, 41, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        }, 10);
    });
    
    // Sistema de partículas - OPTIMIZADO
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let animationFrame;
        
        // Configurar canvas con debounce
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        
        // Debounce para resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 250);
        });
        
        // Crear partículas
        const particles = [];
        const particleCount = window.innerWidth < 768 ? 25 : 50; // Menos partículas en móvil
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.3, // Más lento en móvil
                speedY: (Math.random() - 0.5) * 0.3,
                color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.3 + 0.2})`
            });
        }
        
        // Animar partículas con control de FPS
        let lastTime = 0;
        const fps = 30; // Reducir FPS en móvil
        const interval = 1000 / fps;
        
        function animateParticles(timestamp) {
            if (timestamp - lastTime > interval) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                particles.forEach(particle => {
                    // Actualizar posición
                    particle.x += particle.speedX;
                    particle.y += particle.speedY;
                    
                    // Rebotar en los bordes
                    if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
                    if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
                    
                    // Dibujar partícula
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color;
                    ctx.fill();
                });
                
                lastTime = timestamp;
            }
            
            animationFrame = requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Limpiar al salir de la página
        window.addEventListener('beforeunload', function() {
            cancelAnimationFrame(animationFrame);
        });
    }
    
    // Sistema del carrusel 3D - OPTIMIZADO
    function initCarousel() {
        const carousel = document.querySelector('.carousel-3d');
        if (!carousel) return;
        
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        const totalItems = items.length;
        const angle = 360 / totalItems;
        let autoPlay;
        
        function updateCarousel() {
            // Usar transform3d para mejor rendimiento
            carousel.style.transform = `rotateY(${currentIndex * -angle}deg)`;
            
            // Actualizar clases activas
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Navegación automática con control
        function startAutoPlay() {
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 4000);
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlay);
        }
        
        function navigate(direction) {
            stopAutoPlay();
            currentIndex = (currentIndex + direction + totalItems) % totalItems;
            updateCarousel();
            startAutoPlay();
        }
        
        // Botones de navegación
        if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));
        
        // Indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoPlay();
                currentIndex = index;
                updateCarousel();
                startAutoPlay();
            });
        });
        
        // Control de autoplay
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
        carousel.addEventListener('touchstart', stopAutoPlay);
        
        // Iniciar autoplay
        startAutoPlay();
        
        // Pausar autoplay cuando la página no está visible
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }
    
    // Setup para fix de viewport en móviles
    function setupViewportFix() {
        // Prevenir zoom en inputs
        document.addEventListener('touchstart', function(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }
        }, { passive: true });
        
        // Fix para altura visual en móviles
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', setVH);
    }
    
    // Inicializar video
    initVideo();
    initDesktopRecommendation();
    
    // Contador de visitas
    let visitCount = localStorage.getItem('btfVisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('btfVisitCount', visitCount);
    
    console.log(`¡Bienvenido a Beyond the Future! Esta es tu visita número ${visitCount}.`);
});

// Control de video
function initVideo() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const iframe = videoWrapper?.querySelector('iframe');
    
    if (iframe) {
        iframe.addEventListener('load', function() {
            videoWrapper.classList.remove('loading');
        });
        
        // Fallback timeout
        setTimeout(() => {
            videoWrapper.classList.remove('loading');
        }, 3000);
        
        videoWrapper.classList.add('loading');
    }
}

// Detección de dispositivo y pantalla de recomendación
function initDesktopRecommendation() {
    const recommendation = document.getElementById('desktop-recommendation');
    const continueMobileBtn = document.getElementById('continue-mobile');
    const openDesktopBtn = document.getElementById('open-desktop');
    
    if (!recommendation) return;
    
    // Verificar si es un dispositivo móvil
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth <= 1024;
    }
    
    // Verificar si ya se ha aceptado la recomendación
    function hasAcceptedRecommendation() {
        return localStorage.getItem('desktopRecommendationAccepted') === 'true';
    }
    
    // Mostrar recomendación solo en móviles y si no se ha aceptado antes
    if (isMobileDevice() && !hasAcceptedRecommendation()) {
        recommendation.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevenir scroll
        
        // Continuar en móvil
        continueMobileBtn.addEventListener('click', function() {
            localStorage.setItem('desktopRecommendationAccepted', 'true');
            recommendation.classList.add('hidden');
            document.body.style.overflow = '';
            setTimeout(() => {
                recommendation.style.display = 'none';
            }, 500);
        });
        
        // Abrir en desktop
        openDesktopBtn.addEventListener('click', function() {
            const newWindow = window.open(window.location.href, '_blank');
            if (newWindow) {
                setTimeout(() => {
                    window.close();
                }, 1000);
            } else {
                alert('Por favor, copia la URL y ábrela en tu navegador de escritorio para la mejor experiencia.');
                localStorage.setItem('desktopRecommendationAccepted', 'true');
                recommendation.classList.add('hidden');
                document.body.style.overflow = '';
                setTimeout(() => {
                    recommendation.style.display = 'none';
                }, 500);
            }
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && recommendation.style.display === 'flex') {
                localStorage.setItem('desktopRecommendationAccepted', 'true');
                recommendation.classList.add('hidden');
                document.body.style.overflow = '';
                setTimeout(() => {
                    recommendation.style.display = 'none';
                }, 500);
            }
        });
    } else {
        recommendation.style.display = 'none';
    }
}

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .downloading {
        pointer-events: none;
        opacity: 0.7;
    }
    
    .fade-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Fix para viewport en móviles */
    :root {
        --vh: 1vh;
    }
    
    .hero {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
    }
    
    @media (max-width: 768px) {
        .main-nav {
            display: none;
        }
        
        .main-nav.active {
            display: block;
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            height: calc(100vh - 60px);
            background: rgba(10, 14, 41, 0.98);
            backdrop-filter: blur(20px);
            padding: 30px 20px;
            z-index: 999;
            overflow-y: auto;
        }
        
        .main-nav.active ul {
            flex-direction: column;
            gap: 20px;
            text-align: center;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        /* Prevenir zoom en inputs en iOS */
        input, select, textarea {
            font-size: 16px !important;
        }
    }
`;
document.head.appendChild(style);
