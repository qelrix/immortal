// Создание дополнительных деталей на фоне
function createBackgroundDetails() {
    const overlay = document.querySelector('.bg-overlay');
    if (!overlay) return;
    
    // Создаем дополнительные темные элементы
    for (let i = 0; i < 8; i++) {
        const detail = document.createElement('div');
        detail.className = 'bg-detail';
        detail.style.position = 'absolute';
        detail.style.width = Math.random() * 200 + 100 + 'px';
        detail.style.height = Math.random() * 200 + 100 + 'px';
        detail.style.left = Math.random() * 100 + '%';
        detail.style.top = Math.random() * 100 + '%';
        detail.style.background = `radial-gradient(circle, 
            rgba(${20 + Math.random() * 10}, 0, 0, ${0.1 + Math.random() * 0.1}) 0%, 
            transparent 70%)`;
        detail.style.borderRadius = '50%';
        detail.style.pointerEvents = 'none';
        detail.style.filter = 'blur(20px)';
        detail.style.animation = `detail-float ${15 + Math.random() * 10}s ease-in-out infinite`;
        detail.style.animationDelay = Math.random() * 5 + 's';
        overlay.appendChild(detail);
    }
}

// Добавляем CSS для анимации деталей
const detailStyle = document.createElement('style');
detailStyle.textContent = `
    @keyframes detail-float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(${1 + Math.random() * 0.3});
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(detailStyle);

// Матрица на фоне с улучшенной анимацией
function createMatrix() {
    const matrix = document.getElementById('matrix');
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 25);
    
    for (let i = 0; i < columns; i++) {
        createMatrixColumn(i, chars);
    }
}

function createMatrixColumn(index, chars) {
    const column = document.createElement('div');
    column.className = 'matrix-char';
    column.style.left = (index * 25) + 'px';
    const duration = Math.random() * 4 + 3;
    column.style.animationDuration = duration + 's';
    column.style.animationDelay = Math.random() * 3 + 's';
    column.textContent = chars[Math.floor(Math.random() * chars.length)];
    
    document.getElementById('matrix').appendChild(column);
    
    // Плавное обновление символов
    const updateInterval = setInterval(() => {
        if (column.parentNode) {
            column.textContent = chars[Math.floor(Math.random() * chars.length)];
            const newDuration = Math.random() * 4 + 3;
            column.style.animationDuration = newDuration + 's';
        } else {
            clearInterval(updateInterval);
        }
    }, 2000);
    
    // Плавное перемещение
    const moveInterval = setInterval(() => {
        if (column.parentNode) {
            const newX = Math.random() * (window.innerWidth - 30);
            column.style.transition = 'left 2s cubic-bezier(0.4, 0, 0.2, 1)';
            column.style.left = newX + 'px';
        } else {
            clearInterval(moveInterval);
        }
    }, 5000);
}

// Эффект капель с логотипа
function createDrops() {
    const logo = document.getElementById('logo');
    const dropsContainer = document.getElementById('drops');
    
    function updateDrops() {
        const logoRect = logo.getBoundingClientRect();
        const containerRect = dropsContainer.getBoundingClientRect();
        
        const drop = document.createElement('div');
        drop.className = 'drop';
        
        const randomX = Math.random() * logoRect.width;
        drop.style.left = (logoRect.left - containerRect.left + randomX) + 'px';
        drop.style.top = (logoRect.bottom - containerRect.top) + 'px';
        drop.style.animationDuration = (Math.random() * 1.5 + 1.2) + 's';
        drop.style.opacity = Math.random() * 0.3 + 0.4;
        
        dropsContainer.appendChild(drop);
        
        setTimeout(() => {
            if (drop.parentNode) {
                drop.remove();
            }
        }, 3000);
    }
    
    setInterval(updateDrops, 150);
    
    // Обновление позиции при скролле/изменении размера
    window.addEventListener('resize', () => {
        // Позиция обновится автоматически при следующем создании капли
    });
}

// Автоматическое воспроизведение музыки
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');

let isPlaying = false;
let isMuted = false;

// Функция загрузки музыки
function loadMusic() {
    // Прямая ссылка на трек MONTAGEM BOMBO (Slowed) - DJ FallThox
    audioPlayer.src = 'https://rus.hitmotop.com/get/music/20251223/DJ_FallThox_-_MONTAGEM_BOMBO_Slowed_80526790.mp3';
    
    audioPlayer.volume = 0.6;
    audioPlayer.loop = true;
    
    // Попытка автовоспроизведения
    audioPlayer.addEventListener('canplaythrough', () => {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
                playPauseBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="4" width="4" height="16" fill="rgba(139, 0, 0, 0.75)"/>
                    <rect x="14" y="4" width="4" height="16" fill="rgba(139, 0, 0, 0.75)"/>
                </svg>`;
            }).catch(err => {
                console.log('Автовоспроизведение заблокировано. Нажмите кнопку воспроизведения.');
                isPlaying = false;
                playPauseBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" fill="rgba(139, 0, 0, 0.75)"/>
                </svg>`;
            });
        }
    });
    
    // Обработка ошибок загрузки
    audioPlayer.addEventListener('error', (e) => {
        console.log('Ошибка загрузки музыки. Убедитесь, что файл music.mp3 находится в папке с сайтом.');
        playPauseBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" fill="rgba(139, 0, 0, 0.75)"/>
        </svg>`;
    });
}

// Стилизация иконок кнопок - красные SVG иконки
function styleIcons() {
    // SVG иконка воспроизведения (по умолчанию)
    const playIcon = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z" fill="rgba(139, 0, 0, 0.75)"/>
    </svg>`;
    
    // SVG иконка звука (по умолчанию)
    const volumeIcon = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="rgba(139, 0, 0, 0.75)"/>
    </svg>`;
    
    // Устанавливаем иконки по умолчанию
    if (!playPauseBtn.querySelector('.icon-svg')) {
        playPauseBtn.innerHTML = playIcon;
    }
    if (!volumeBtn.querySelector('.icon-svg')) {
        volumeBtn.innerHTML = volumeIcon;
    }
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" fill="rgba(139, 0, 0, 0.75)"/>
        </svg>`;
    } else {
        audioPlayer.play().then(() => {
            playPauseBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="4" width="4" height="16" fill="rgba(139, 0, 0, 0.75)"/>
                <rect x="14" y="4" width="4" height="16" fill="rgba(139, 0, 0, 0.75)"/>
            </svg>`;
        }).catch(err => {
            console.log('Ошибка воспроизведения:', err);
        });
    }
    isPlaying = !isPlaying;
});

volumeBtn.addEventListener('click', () => {
    if (isMuted) {
        audioPlayer.volume = volumeSlider.value / 100;
        volumeBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="rgba(139, 0, 0, 0.75)"/>
        </svg>`;
    } else {
        audioPlayer.volume = 0;
        volumeBtn.innerHTML = `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="rgba(139, 0, 0, 0.75)"/>
        </svg>`;
    }
    isMuted = !isMuted;
});

volumeSlider.addEventListener('input', (e) => {
    if (!isMuted) {
        audioPlayer.volume = e.target.value / 100;
    }
});

// Загрузка музыки при загрузке страницы
loadMusic();

// Эффект наклона при движении мыши
const container = document.getElementById('mainContainer');
let isMobile = window.innerWidth <= 768;

window.addEventListener('mousemove', (e) => {
    if (isMobile) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const rotateX = (y - 0.5) * 8;
    const rotateY = (0.5 - x) * 8;
    
    container.style.transition = 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

window.addEventListener('mouseleave', () => {
    if (isMobile) return;
    container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
    if (isMobile) {
        container.style.transform = 'none';
    }
});

// Эффект следа мыши
const canvas = document.getElementById('mouseTrail');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 20;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.life * 0.2;
        ctx.fillStyle = '#8b0000';
        ctx.strokeStyle = 'rgba(139, 0, 0, 0.4)';
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(139, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

let mouseX = 0;
let mouseY = 0;

let lastMouseTime = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const now = Date.now();
    if (now - lastMouseTime > 50 && particles.length < maxParticles) {
        particles.push(new Particle(mouseX, mouseY));
        lastMouseTime = now;
    }
});

function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateTrail);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Эффект волны блика от логотипа каждые 5 секунд
function initShineWave() {
    const logo = document.getElementById('logo');
    
    function triggerShineWave() {
        logo.classList.remove('shine-wave');
        // Небольшая задержка для перезапуска анимации
        setTimeout(() => {
            logo.classList.add('shine-wave');
        }, 10);
    }
    
    // Первый запуск через 1 секунду после загрузки
    setTimeout(triggerShineWave, 1000);
    
    // Затем каждые 5 секунд
    setInterval(triggerShineWave, 5000);
}

// Создание плавающих частиц на фоне
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const startX = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 4;
        
        particle.style.left = startX + '%';
        particle.style.animationDelay = delay + 's';
        particle.style.animationDuration = duration + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

// Эффект искр при наведении на кнопки
function initButtonSparks() {
    const buttons = document.querySelectorAll('.control-btn, .link-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            createSparks(e.target);
        });
    });
}

function createSparks(element) {
    const rect = element.getBoundingClientRect();
    const sparkCount = 8;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.width = '3px';
        spark.style.height = '3px';
        spark.style.background = 'radial-gradient(circle, rgba(139, 0, 0, 0.9), transparent)';
        spark.style.borderRadius = '50%';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '1000';
        spark.style.boxShadow = '0 0 6px rgba(139, 0, 0, 0.8)';
        
        const angle = (Math.PI * 2 * i) / sparkCount;
        const distance = 30 + Math.random() * 20;
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        
        spark.style.left = startX + 'px';
        spark.style.top = startY + 'px';
        
        document.body.appendChild(spark);
        
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        spark.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards'
        }).onfinish = () => {
            spark.remove();
        };
    }
}

// Эффект пульсации для логотипа при загрузке
function initLogoEffects() {
    const logo = document.getElementById('logo');
    
    // Добавляем эффект при первом появлении
    setTimeout(() => {
        logo.style.animation = 'logo-entrance 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards, metal-shine 4s ease-in-out infinite 1.5s';
    }, 100);
}

// Добавляем CSS для анимации появления логотипа
const style = document.createElement('style');
style.textContent = `
    @keyframes logo-entrance {
        0% {
            transform: scale(0.8) translateY(-50px);
            opacity: 0;
            filter: blur(10px);
        }
        100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            filter: blur(0);
        }
    }
`;
document.head.appendChild(style);

// Кастомный курсор
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Отслеживание движения мыши
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Плавное следование курсора за мышью
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Эффект при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, input[type="range"]');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Скрытие курсора при выходе за пределы окна
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Запрет выделения текста и контекстного меню
function preventSelection() {
    // Запрет контекстного меню
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Запрет выделения через клавиатуру
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Запрет перетаскивания
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Запрет копирования через клавиатуру
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Запрет выделения через двойной клик
    document.addEventListener('mousedown', (e) => {
        if (e.detail > 1) {
            e.preventDefault();
            return false;
        }
    });
}

// Инициализация
createMatrix();
createDrops();
animateTrail();
initShineWave();
createParticles();
initButtonSparks();
initLogoEffects();
initCustomCursor();
styleIcons();
preventSelection();
createBackgroundDetails();

// Обновление матрицы при изменении размера окна
let matrixTimeout;
window.addEventListener('resize', () => {
    clearTimeout(matrixTimeout);
    matrixTimeout = setTimeout(() => {
        document.getElementById('matrix').innerHTML = '';
        createMatrix();
    }, 300);
});
