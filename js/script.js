// Script para funcionalidades interactivas del sitio

document.addEventListener('DOMContentLoaded', function() {
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
            }
        });
    });
    
    // Botón de menú móvil
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
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
    
// Botón de descarga de demo
const downloadBtn = document.getElementById('download-btn');

if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Crear efecto de descarga
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando descarga...';
        this.classList.add('downloading');
        
        // Crear enlace de descarga directa
        const fileId = '1fpok1yFQaivqwK7f6BmomKuynz3FMqdt';
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
        
        // Crear elemento de descarga invisible
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.download = 'BeyondTheFuture_Demo.zip'; // Nombre del archivo al descargar
        downloadLink.style.display = 'none';
        
        // Agregar al documento y hacer click
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Restaurar botón después de un tiempo
        setTimeout(() => {
            this.innerHTML = originalText;
            this.classList.remove('downloading');
            
            // Mostrar mensaje de confirmación
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
                    document.body.removeChild(downloadMessage);
                }, 300);
            }, 5000);
            
        }, 2000);
    });
}

// Agregar estilos CSS para las animaciones
const downloadStyles = document.createElement('style');
downloadStyles.textContent = `
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
`;
document.head.appendChild(downloadStyles);
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
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
        
        setTimeout(typeWriter, 500);
    }
    
    // Cambio de header al hacer scroll
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 14, 41, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.backgroundColor = 'rgba(10, 14, 41, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Sistema de partículas
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        // Configurar canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Crear partículas
        const particles = [];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
        
        // Animar partículas
        function animateParticles() {
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
                
                // Conectar partículas cercanas
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 150, 255, ${0.1 * (1 - distance/100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
    }
    
    // Sistema del carrusel 3D
    function initCarousel() {
        const carousel = document.querySelector('.carousel-3d');
        const items = document.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicators = document.querySelectorAll('.indicator');
        
        let currentIndex = 0;
        const totalItems = items.length;
        const angle = 360 / totalItems;
        
        function updateCarousel() {
            // Rotar el carrusel
            carousel.style.transform = `rotateY(${currentIndex * -angle}deg)`;
            
            // Actualizar clases activas
            items.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) {
                    item.classList.add('active');
                }
            });
            
            // Actualizar indicadores
            indicators.forEach((indicator, index) => {
                indicator.classList.remove('active');
                if (index === currentIndex) {
                    indicator.classList.add('active');
                }
            });
        }
        
        // Navegación automática
        let autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 4000);
        
        // Botones de navegación
        prevBtn.addEventListener('click', () => {
            clearInterval(autoPlay);
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 4000);
        });
        
        nextBtn.addEventListener('click', () => {
            clearInterval(autoPlay);
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 4000);
        });
        
        // Indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(autoPlay);
                currentIndex = index;
                updateCarousel();
                autoPlay = setInterval(() => {
                    currentIndex = (currentIndex + 1) % totalItems;
                    updateCarousel();
                }, 4000);
            });
        });
        
        // Pausar autoplay al hacer hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoPlay);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalItems;
                updateCarousel();
            }, 4000);
        });
    }
    
    // Contador de visitas
    let visitCount = localStorage.getItem('btfVisitCount') || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem('btfVisitCount', visitCount);
    
    console.log(`¡Bienvenido a Beyond the Future! Esta es tu visita número ${visitCount}.`);
    
    // Añadir estilos CSS para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .fade-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .downloading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .main-nav {
                display: none;
            }
            
            .main-nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(10, 14, 41, 0.95);
                backdrop-filter: blur(15px);
                padding: 20px;
            }
            
            .main-nav.active ul {
                flex-direction: column;
                gap: 15px;
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
        }
    `;
    document.head.appendChild(style);
});

// Control de video - Agrega esto al DOMContentLoaded
function initVideo() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const iframe = videoWrapper?.querySelector('iframe');
    
    if (iframe) {
        // Mostrar indicador de carga
        iframe.addEventListener('load', function() {
            videoWrapper.classList.remove('loading');
        });
        
        // Ocultar indicador después de un tiempo (fallback)
        setTimeout(() => {
            videoWrapper.classList.remove('loading');
        }, 3000);
        
        // Agregar clase loading inicial
        videoWrapper.classList.add('loading');
    }
}

// Llamar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initVideo();
    
    // También agregar el enlace al nav si quieres
    const nav = document.querySelector('.main-nav ul');
    if (nav) {
        const trailerItem = document.createElement('li');
        trailerItem.innerHTML = '<a href="#trailer" class="nav-link">Tráiler</a>';
        // Insertar antes de Demo
        const demoItem = document.querySelector('a[href="#demo"]').parentElement;
        nav.insertBefore(trailerItem, demoItem);
    }
});

// Detección de dispositivo y pantalla de recomendación
function initDesktopRecommendation() {
    const recommendation = document.getElementById('desktop-recommendation');
    const continueMobileBtn = document.getElementById('continue-mobile');
    const openDesktopBtn = document.getElementById('open-desktop');
    
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
    if (isMobileDevice() && !hasAcceptedRecommendation() && recommendation) {
        recommendation.style.display = 'flex';
        
        // Continuar en móvil
        continueMobileBtn.addEventListener('click', function() {
            localStorage.setItem('desktopRecommendationAccepted', 'true');
            recommendation.classList.add('hidden');
            setTimeout(() => {
                recommendation.style.display = 'none';
            }, 500);
        });
        
        // Abrir en desktop (intentar abrir en nueva ventana/pestaña)
        openDesktopBtn.addEventListener('click', function() {
            // Intentar abrir la página en una nueva ventana (simulando desktop)
            const newWindow = window.open(window.location.href, '_blank');
            if (newWindow) {
                // Si se pudo abrir nueva ventana, cerrar esta
                setTimeout(() => {
                    window.close();
                }, 1000);
            } else {
                // Si el navegador bloquea popup, simplemente continuar
                alert('Por favor, copia la URL y ábrela en tu navegador de escritorio para la mejor experiencia.');
                localStorage.setItem('desktopRecommendationAccepted', 'true');
                recommendation.classList.add('hidden');
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
                setTimeout(() => {
                    recommendation.style.display = 'none';
                }, 500);
            }
        });
    } else {
        // Ocultar si no es móvil o ya se aceptó
        if (recommendation) {
            recommendation.style.display = 'none';
        }
    }
}

// Llamar la función cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initDesktopRecommendation();
});