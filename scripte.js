// ==========================================
// INITIALISATION ET CONFIGURATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités
    initLoader();
    initParticles();
    initNavigation();
    initCountdown();
    initTeamMembers();
    initFLLValues();
    initTimeline();
    initContactForm();
    initModals();
    initScrollAnimations();
    initParallax();
    initStatsCounter();
});

// ==========================================
// LOADER ANIMATION
// ==========================================
function initLoader() {
    const loader = document.getElementById('loader');
    const progressFill = document.getElementById('progressFill');
    
    // Simuler le chargement
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress > 100) {
            progress = 100;
            clearInterval(interval);
            
            // Cacher le loader après un délai
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 500);
        }
        progressFill.style.width = `${progress}%`;
    }, 100);
}

// ==========================================
// PARTICLES BACKGROUND
// ==========================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Position aléatoire
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Taille aléatoire
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Opacité aléatoire
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    // Animation aléatoire
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `particle-float ${duration}s infinite ${delay}s`;
    
    container.appendChild(particle);
}

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Gérer le scroll de la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mettre à jour les liens actifs
        updateActiveNavLink();
    });
    
    // Menu mobile
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// COMPTE À REBOURS
// ==========================================
function initCountdown() {
    // Date de la compétition : 17 Janvier 2026, 09:00
    const competitionDate = new Date('2026-01-17T09:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = competitionDate - now;
        
        if (timeLeft < 0) {
            // La compétition est passée
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        // Calculer les unités de temps
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Mettre à jour l'affichage
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Ajouter une animation sur le changement
        animateCountdownChange();
    }
    
    // Mettre à jour immédiatement
    updateCountdown();
    
    // Mettre à jour chaque seconde
    setInterval(updateCountdown, 1000);
}

function animateCountdownChange() {
    const units = document.querySelectorAll('.unit-value');
    units.forEach(unit => {
        unit.style.transform = 'scale(1.1)';
        setTimeout(() => {
            unit.style.transform = 'scale(1)';
        }, 200);
    });
}

// ==========================================
// ÉQUIPE - MEMBRES DYNAMIQUES
// ==========================================
function initTeamMembers() {
    const membersData = [
        {
            id: 'belkadi',
            name: 'Mohammed Belkadi',
            role: 'Capitaine & Stratège',
            icon: 'crown',
            skills: ['Leadership', 'Stratégie', 'Communication', 'Planification'],
            experience: 'Expérience avec Robotics for Life & Robotics for Future'
        },
        {
            id: 'mehdi',
            name: 'Mehdi Hayine',
            role: 'Programmeur Principal',
            icon: 'code',
            skills: ['Python', 'JavaScript', 'Algorithmique', 'Debugging'],
            experience: 'Spécialiste en programmation robotique'
        },
        {
            id: 'moatz',
            name: 'Moatz Billah Zahraoui',
            role: 'Ingénieur Mécanique',
            icon: 'cogs',
            skills: ['Conception 3D', 'Mécanique', 'Assemblage', 'Optimisation'],
            experience: 'Expert en construction robotique'
        },
        {
            id: 'saraH',
            name: 'Sara Hadri',
            role: 'Développeuse & Testeur',
            icon: 'laptop-code',
            skills: ['Développement', 'Tests', 'Qualité', 'Documentation'],
            experience: 'Assurance qualité et développement'
        },
        {
            id: 'saraB',
            name: 'Sara Bouayad',
            role: 'Ingénieure Robotique',
            icon: 'robot',
            skills: ['Robotique', 'Électronique', 'Capteurs', 'Intégration'],
            experience: 'Intégration systèmes robotiques'
        },
        {
            id: 'ibtissam',
            name: 'Ibtissam Jawhar',
            role: 'Chercheuse Innovation',
            icon: 'lightbulb',
            skills: ['Recherche', 'Innovation', 'Créativité', 'Présentation'],
            experience: 'Développement projets innovants'
        },
        {
            id: 'chaymae',
            name: 'Chaymae Hamzaoui',
            role: 'Designer & Communication',
            icon: 'palette',
            skills: ['Design', 'Communication', 'Réseaux sociaux', 'Marketing'],
            experience: 'Gestion image et communication'
        },
        {
            id: 'malak',
            name: 'Malak Mrabet Lemtei',
            role: 'Coordinatrice Projet',
            icon: 'tasks',
            skills: ['Gestion projet', 'Organisation', 'Coordination', 'Planning'],
            experience: 'Coordination équipe et planning'
        }
    ];
    
    const membersGrid = document.querySelector('.members-grid');
    
    membersData.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        memberCard.setAttribute('onclick', `openModal('${member.id}')`);
        
        memberCard.innerHTML = `
            <div class="member-avatar">
                <i class="fas fa-${member.icon}"></i>
            </div>
            <h4>${member.name}</h4>
            <p class="member-role">${member.role}</p>
            <div class="member-skills">
                ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        membersGrid.appendChild(memberCard);
    });
}

// ==========================================
// VALEURS FLL DYNAMIQUES
// ==========================================
function initFLLValues() {
    const valuesData = [
        {
            id: 'discovery',
            title: 'Découverte',
            icon: 'search',
            description: 'Nous explorons de nouveaux concepts et compétences avec curiosité et enthousiasme.',
            details: 'La découverte nous pousse à poser des questions, à chercher des réponses et à apprendre continuellement.'
        },
        {
            id: 'innovation',
            title: 'Innovation',
            icon: 'lightbulb',
            description: 'Nous utilisons la créativité et la persévérance pour résoudre des problèmes complexes.',
            details: 'L\'innovation transforme les idées en solutions concrètes qui améliorent notre monde.'
        },
        {
            id: 'impact',
            title: 'Impact',
            icon: 'globe-africa',
            description: 'Nos actions ont un effet positif sur notre communauté et l\'environnement.',
            details: 'Nous mesurons notre succès par l\'impact positif que nous créons autour de nous.'
        },
        {
            id: 'inclusion',
            title: 'Inclusion',
            icon: 'hands-helping',
            description: 'Nous respectons les différences et accueillons la diversité dans notre équipe.',
            details: 'Chaque voix compte et chaque perspective enrichit notre travail collectif.'
        },
        {
            id: 'teamwork',
            title: 'Travail d\'équipe',
            icon: 'users',
            description: 'Nous sommes plus forts ensemble grâce à la collaboration et l\'entraide.',
            details: 'Le succès de l\'équipe prime sur les réalisations individuelles.'
        },
        {
            id: 'fun',
            title: 'Amusement',
            icon: 'laugh-beam',
            description: 'Nous célébrons le plaisir d\'apprendre, de créer et de réussir ensemble.',
            details: 'L\'amusement est le moteur de notre passion et de notre engagement.'
        }
    ];
    
    const valuesGrid = document.querySelector('.values-grid');
    
    valuesData.forEach(value => {
        const valueCard = document.createElement('div');
        valueCard.className = 'value-card';
        valueCard.setAttribute('onclick', `openModal('${value.id}')`);
        
        valueCard.innerHTML = `
            <div class="value-icon">
                <i class="fas fa-${value.icon}"></i>
            </div>
            <h3>${value.title}</h3>
            <p class="value-description">${value.description}</p>
            <div class="value-action">
                En savoir plus <i class="fas fa-arrow-right"></i>
            </div>
        `;
        
        valuesGrid.appendChild(valueCard);
    });
}

// ==========================================
// TIMELINE DES RÉALISATIONS
// ==========================================
function initTimeline() {
    const timelineData = [
        {
            date: 'Septembre 2025',
            title: 'Formation de l\'équipe',
            description: 'Création d\'Atlas Robotics avec 10 membres passionnés.'
        },
        {
            date: 'Octobre 2025',
            title: 'Début du projet UNEARTHED',
            description: 'Brainstorming et recherche sur le thème archéologique.'
        },
        {
            date: 'Novembre 2025',
            title: 'Conception du robot',
            description: 'Développement et tests du robot LEGO pour les missions.'
        },
        {
            date: 'Décembre 2025',
            title: 'Projet d\'innovation',
            description: 'Finalisation de la solution innovante pour les archéologues.'
        },
        {
            date: 'Janvier 2026',
            title: 'Compétition Régionale',
            description: 'Participation au tournoi qualificatif à Bouskoura.'
        }
    ];
    
    const timeline = document.querySelector('.timeline');
    
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.date}</div>
                <h4 class="timeline-title">${item.title}</h4>
                <p class="timeline-description">${item.description}</p>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// ==========================================
// FORMULAIRE DE CONTACT
// ==========================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Validation simple
        if (!formData.name || !formData.email || !formData.message) {
            showNotification('Veuillez remplir tous les champs requis.', 'error');
            return;
        }
        
        // Simulation d'envoi (dans un projet réel, envoyer à un serveur)
        showNotification('Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
        
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Animation de confirmation
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Envoyé !';
        submitBtn.style.background = 'linear-gradient(135deg, #52d1b2, #4CAF50)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

function showNotification(message, type) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        animation: slide-in-right 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Supprimer automatiquement après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slide-in-right 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==========================================
// MODALS DYNAMIQUES
// ==========================================
function initModals() {
    // Données pour les modals
    const modalsData = {
        // Coachs
        'driss': {
            type: 'coach',
            title: 'Driss Bouricha',
            subtitle: 'Head Coach - Atlas Robotics #C-513',
            icon: 'crown',
            color: '#ffd700',
            sections: [
                {
                    title: 'À propos',
                    icon: 'user',
                    content: `
                        <p>Driss Bouricha est le Head Coach de l'équipe Atlas Robotics et professeur d'informatique pour le Tronc Commun au Lycée Moulay Driss. Sa passion pour l'enseignement et la technologie fait de lui le mentor idéal pour guider l'équipe vers l'excellence.</p>
                    `
                },
                {
                    title: 'Rôle dans l\'équipe',
                    icon: 'tasks',
                    content: `
                        <ul>
                            <li>Direction et supervision générale de l'équipe</li>
                            <li>Formation technique en programmation et robotique</li>
                            <li>Développement de la stratégie de compétition</li>
                            <li>Mentorat et accompagnement pédagogique</li>
                            <li>Coordination avec le Coach Assistant</li>
                        </ul>
                    `
                }
            ]
        },
        'mohsine': {
            type: 'coach',
            title: 'Mohsine Aamijane',
            subtitle: 'Coach Assistant - Directeur du Lycée Moulay Driss',
            icon: 'user-tie',
            color: '#ffd700',
            sections: [
                {
                    title: 'Expérience en Robotique',
                    icon: 'history',
                    content: `
                        <div class="skill-item">
                            <h4>Robotics for Life</h4>
                            <p>Mohsine a développé ses compétences en robotique et en encadrement d'équipe.</p>
                        </div>
                        <div class="skill-item">
                            <h4>Robotics for Future</h4>
                            <p>Il a contribué au succès de l'équipe, enrichissant son expérience et sa vision.</p>
                        </div>
                    `
                },
                {
                    title: 'Vision',
                    icon: 'eye',
                    content: `
                        <p style="font-style: italic; padding: 15px; background: rgba(255, 215, 0, 0.1); border-left: 4px solid #ffd700;">
                            "Mon objectif est de voir chaque membre développer ses compétences techniques tout en cultivant les valeurs FLL. Ensemble, nous construisons non seulement des robots, mais aussi l'avenir de nos jeunes."
                        </p>
                    `
                }
            ]
        },
        // Valeurs FLL
        'discovery': {
            type: 'value',
            title: 'Découverte',
            subtitle: 'Valeur FLL - Explorer pour apprendre',
            icon: 'search',
            color: '#64ffda',
            sections: [
                {
                    title: 'Notre approche',
                    icon: 'compass',
                    content: `
                        <p>Nous encourageons chaque membre à poser des questions, à explorer de nouvelles idées et à ne jamais cesser d'apprendre.</p>
                        <div class="skills-grid">
                            <div class="skill-item">
                                <h4>Recherche</h4>
                                <p>Investigation approfondie des sujets</p>
                            </div>
                            <div class="skill-item">
                                <h4>Curiosité</h4>
                                <p>Poser les bonnes questions</p>
                            </div>
                            <div class="skill-item">
                                <h4>Apprentissage</h4>
                                <p>Acquisition continue de connaissances</p>
                            </div>
                        </div>
                    `
                }
            ]
        },
        // Ajouter d'autres modals ici...
    };
    
    // Stocker les données globalement
    window.modalsData = modalsData;
}

function openModal(modalId) {
    const data = window.modalsData[modalId];
    if (!data) {
        console.error(`Modal ${modalId} non trouvé`);
        return;
    }
    
    // Créer le modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay active';
    modalOverlay.id = `modal-${modalId}`;
    
    modalOverlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <div class="modal-title">
                    <div class="modal-icon" style="color: ${data.color}; border-color: ${data.color}">
                        <i class="fas fa-${data.icon}"></i>
                    </div>
                    <div class="modal-titles">
                        <h2>${data.title}</h2>
                        <p>${data.subtitle}</p>
                    </div>
                </div>
                <div class="modal-close" onclick="closeModal('${modalId}')">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="modal-body">
                ${data.sections.map(section => `
                    <div class="modal-section">
                        <h3>
                            <i class="fas fa-${section.icon}" style="color: ${data.color}"></i>
                            ${section.title}
                        </h3>
                        ${section.content}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('modalsContainer').appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`);
    if (modal) {
        modal.style.animation = 'scale-in 0.5s ease reverse';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// Fermer le modal en cliquant en dehors
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const modalId = e.target.id.replace('modal-', '');
        closeModal(modalId);
    }
});

// ==========================================
// ANIMATIONS AU SCROLL
// ==========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observer toutes les sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observer les cartes
    document.querySelectorAll('.card, .team-card, .value-card, .timeline-item').forEach(item => {
        observer.observe(item);
    });
}

// ==========================================
// EFFET PARALLAXE
// ==========================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelector('.particles');
        
        if (particles) {
            particles.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Effet parallaxe sur le hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ==========================================
// COMPTEUR ANIMÉ DES STATS
// ==========================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 secondes
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => observer.observe(stat));
}

// ==========================================
// FONCTIONS UTILITAIRES
// ==========================================
function toggleUnearthed() {
    const content = document.getElementById('unearthedContent');
    const card = document.querySelector('.unearthed-main-card');
    
    content.classList.toggle('active');
    card.classList.toggle('expanded');
    
    // Animation du hint
    const hint = document.querySelector('.click-hint i');
    if (content.classList.contains('active')) {
        hint.className = 'fas fa-chevron-up';
    } else {
        hint.className = 'fas fa-chevron-down';
    }
}

// ==========================================
// GESTION DES ERREURS
// ==========================================
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Vous pourriez envoyer ces erreurs à un service de tracking
});

// ==========================================
// OPTIMISATIONS DES PERFORMANCES
// ==========================================
// Debounce pour les événements de scroll
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Code à exécuter après arrêt du scroll
    }, 100);
});

// ==========================================
// SUPPORT TOUCH/MOBILE
// ==========================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            // Swipe droite - navigation précédente
        } else {
            // Swipe gauche - navigation suivante
        }
    }
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================
document.addEventListener('keydown', (e) => {
    // Échap pour fermer les modals
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            const modalId = activeModal.id.replace('modal-', '');
            closeModal(modalId);
        }
    }
    
    // Tab pour la navigation au clavier
    if (e.key === 'Tab') {
        // Gérer le focus trap dans les modals
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    }
});

// ==========================================
// SERVICE WORKER PWA (Optionnel)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// ==========================================
// ANALYTICS (Exemple avec Google Analytics)
// ==========================================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Log pour le développement
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// ==========================================
// INTERNATIONALIZATION (i18n) - Structure
// ==========================================
const translations = {
    fr: {
        // Traductions françaises
    },
    en: {
        // Traductions anglaises
    }
};

let currentLang = 'fr';

function setLanguage(lang) {
    currentLang = lang;
    updateTexts();
}

function updateTexts() {
    // Mettre à jour tous les textes avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
}

// ==========================================
// THEME TOGGLE (Clair/Sombre)
// ==========================================
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Mettre à jour l'icône du bouton
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.innerHTML = newTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    }
}

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.setAttribute('data-theme', savedTheme);

// ==========================================
// PRINT FUNCTIONALITY
// ==========================================
function printPage() {
    window.print();
}

// ==========================================
// SHARE FUNCTIONALITY
// ==========================================
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Atlas Robotics - Équipe FLL #C-513',
            text: 'Découvrez l\'équipe Atlas Robotics participant à la FIRST LEGO League saison UNEARTHED 2025-2026',
            url: window.location.href
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Share
        navigator.clipboard.writeText(window.location.href);
        showNotification('Lien copié dans le presse-papier !', 'success');
    }
}

// ==========================================
// PERFORMANCE METRICS
// ==========================================
window.addEventListener('load', () => {
    // Mesurer le temps de chargement
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log(`Temps de chargement: ${pageLoadTime}ms`);
    
    // Envoyer les métriques à votre analytics
    trackEvent('Performance', 'Page Load', `Load time: ${pageLoadTime}ms`);
});

// ==========================================
// LAZY LOADING DES IMAGES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ==========================================
// INITIALISATION FINALE
// ==========================================
console.log('Atlas Robotics FLL - Site initialisé avec succès!');