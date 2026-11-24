document.addEventListener('DOMContentLoaded', () => {
    
    // --- ЛОГИКА КВИЗА ---
    const quizForm = document.getElementById('career-quiz');
    const questions = quizForm.querySelectorAll('.question');
    const nextBtn = document.getElementById('next-btn');
    const resultDiv = document.getElementById('quiz-result');
    
    let currentQuestionIndex = 0;
    let score = 0;

    nextBtn.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        const selectedOption = currentQuestion.querySelector('input[type="radio"]:checked');
        
        if (!selectedOption) { 
            alert("Пожалуйста, выберите вариант ответа!"); 
            return; 
        }

        if (currentQuestionIndex === 0 && selectedOption.value === 'yes') score++;
        if (currentQuestionIndex === 1 && selectedOption.value === 'yes') score++;
        if (currentQuestionIndex === 2 && selectedOption.value === 'no') score++;

        questions[currentQuestionIndex].classList.remove('active');
        questions[currentQuestionIndex].classList.add('hidden');
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            questions[currentQuestionIndex].classList.remove('hidden');
            questions[currentQuestionIndex].classList.add('active');
            if (currentQuestionIndex === questions.length - 1) {
                nextBtn.textContent = "Узнать результат";
            }
        } else {
            showResult();
        }
    });

    function showResult() {
        quizForm.style.display = 'none';
        resultDiv.classList.remove('hidden');
        if (score >= 2) {
            resultDiv.innerHTML = "Отлично! Эта специальность идеально тебе подходит. Ждем тебя среди наших студентов!";
            resultDiv.style.color = "#28a745";
        } else {
            resultDiv.innerHTML = "Возможно, стоит рассмотреть другие направления, но попробовать всё равно можно!";
            resultDiv.style.color = "#dc3545";
        }
    }

    // --- ЛОГИКА ИГРЫ 1: КАБЕЛИ ---
    window.checkCable = function(el, type) {
        const success = document.getElementById('cable-success');
        const error = document.getElementById('cable-error');
        const errorText = document.getElementById('cable-error-text');

        if (type === 'rj45-correct') {
            el.classList.add('cable-correct');
            success.classList.add('show');
            error.classList.remove('show');
            document.querySelectorAll('.cable').forEach(c => c.style.pointerEvents = 'none');
        } else {
            el.classList.remove('shake'); 
            void el.offsetWidth; // Сброс анимации
            el.classList.add('shake');
            
            error.classList.add('show');
            success.classList.remove('show');
            
            if (type === 'rj11') errorText.textContent = 'Это телефонный кабель — он слишком тонкий для Ethernet.';
            else if (type === 'vga' || type === 'hdmi') errorText.textContent = 'Это кабели для видеосигнала, а не для интернета.';
            else errorText.textContent = 'Неправильно, попробуй ещё раз.';
        }
    };

    // --- ЛОГИКА ИГРЫ 2: СЕРВЕР (ВЕНТИЛЯТОРЫ) ---
    window.checkFan = function(el) {
        const success = document.getElementById('fan-success');
        const error = document.getElementById('fan-error');
        const errorText = document.getElementById('fan-error-text');
        const fanNumber = el.dataset.fan;

        // Сброс предыдущих анимаций перед новой проверкой
        el.classList.remove('fan-wrong', 'fan-correct');
        void el.offsetWidth; 

        if (fanNumber === '2') {
            // Вентилятор 2 - правильный
            el.classList.add('fan-correct');
            success.classList.add('show');
            error.classList.remove('show');
            // Блокируем дальнейшие клики после правильного ответа
            document.querySelectorAll('.fan-zone').forEach(z => z.style.pointerEvents = 'none');
        } else {
            // Вентилятор 1 или 3 - ошибка
            el.classList.add('fan-wrong');
            errorText.textContent = `Вентилятор ${fanNumber} исправен. Ищи источник шума в другом месте!`;
            error.classList.add('show');
            success.classList.remove('show');
        }
    };
});