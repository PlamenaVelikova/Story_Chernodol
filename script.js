// Изчакваме HTML документът да се зареди напълно
document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const totalPages = 3;

    // Взимаме бутоните и елементите от HTML
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("id-next"); // Трябва да съвпада с ID-то в HTML
    const pageIndicator = document.getElementById("page-indicator");

    function updateStoryPage() {
        // 1. Скриваме всички страници, като премахваме класа 'active'
        for (let i = 1; i <= totalPages; i++) {
            document.getElementById(`page-${i}`).classList.remove("active");
        }

        // 2. Показваме текущата страница, като ѝ добавяме класа 'active'
        document.getElementById(`page-${currentPage}`).classList.add("active");

        // 3. Обновяваме индикатора за страници (текста по средата)
        pageIndicator.textContent = `Част ${currentPage} от ${totalPages}`;

        // 4. Логика за заключване на бутоните
        if (currentPage === 1) {
            btnPrev.disabled = true; // На Част 1 не можем да ходим по-назад
        } else {
            btnPrev.disabled = false;
        }

        if (currentPage === totalPages) {
            btnNext.disabled = true; // На Част 3 не можем да ходим по-напред
        } else {
            btnNext.disabled = false;
        }

        // Автоматично скролира екрана до началото на разказа при смяна на страницата
        document.getElementById("story").scrollIntoView({ behavior: 'smooth' });
    }

    // Събитие при натискане на бутона "Следваща част"
    btnNext.addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            updateStoryPage();
        }
    });

    // Събитие при натискане на бутона "Предишна част"
    btnPrev.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            updateStoryPage();
        }
    });
});

// ОБНОВЕН ЕФЕКТ ЗА ЛОКАЛНО ФЕНЕРЧЕ
const storyContainer = document.querySelector('.story-container');
const localFlashlight = document.querySelector('.story-container .flashlight');

if (storyContainer && localFlashlight) {
    storyContainer.addEventListener('mousemove', function(e) {
        // Взимаме размерите и позицията на контейнера на екрана
        const rect = storyContainer.getBoundingClientRect();
        
        // Пресмятаме точната позиция на мишката ВЪТРЕ в самия контейнер
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Превръщаме координатите в проценти, за да работят перфектно с новия CSS
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Подаваме процентите към CSS
        localFlashlight.style.setProperty('--X', xPercent + '%');
        localFlashlight.style.setProperty('--Y', yPercent + '%');
    });
}

// ЕФЕКТ: СЪЗДАВАНЕ НА КЪРВАВИ СЛЕДИ ПРИ КЛИК
document.addEventListener('click', function(e) {
    // Създаваме нов празен div елемент в паметта
    const splatter = document.createElement('div');
    splatter.className = 'blood-splatter';

    // Задаваме му позицията спрямо мястото, където е кликнала мишката
    splatter.style.left = e.clientX + 'px';
    splatter.style.top = e.clientY + 'px';

    // Правим формата на всяко петно леко уникална, като я завъртаме на случаен градус
    const randomRotation = Math.random() * 360;
    splatter.style.transform = `translate(-50%, -50%) rotate(${randomRotation}deg)`;

    // Добавяме създаденото петно в сайта, за да се визуализира
    document.body.appendChild(splatter);

    // Изтриваме елемента от кода след 1.5 секунди (когато анимацията свърши),
    // за да не претоварваме паметта на браузъра с хиляди стари капки
    setTimeout(() => {
        splatter.remove();
    }, 1500);
});

// ЕФЕКТ: СЛУЧАЙНИ ГРЪМОТЕВИЦИ (LIGHTNING FLASH)
function triggerLightning() {
    const body = document.body;

    // Първо премигване (светкавица)
    body.classList.add('lightning-active');

    setTimeout(() => {
        body.classList.remove('lightning-active');
        
        // Кратка пауза между двете премигвания (0.05 секунди)
        setTimeout(() => {
            // Второ, по-дълго премигване
            body.classList.add('lightning-active');
            
            setTimeout(() => {
                body.classList.remove('lightning-active');
                // След като гръмотевицата премине, пресмятаме кога да е следващата
                scheduleNextLightning();
            }, 250); // Втората светкавица трае 0.25 секунди
            
        }, 50);
        
    }, 100); // Първата светкавица трае 0.1 секунди
}

function scheduleNextLightning() {
    // Генерираме случайно време между 6000ms (6 секунди) и 12000ms (12 секунди)
    const randomDelay = Math.floor(Math.random() * (12000 - 6000 + 1)) + 6000;
    
    // Стартираме таймера за следващата светкавица
    setTimeout(triggerLightning, randomDelay);
}

// Стартираме цикъла с гръмотевици 3 секунди след като сайтът се зареди
setTimeout(scheduleNextLightning, 3000);