document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-quiz');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const nextButton = document.getElementById('next-button');
    const restartButton = document.getElementById('restart-button');
    const progressBar = document.getElementById('progress');
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const scoreDisplay = document.getElementById('score');
    const feedbackDisplay = document.getElementById('feedback');
    const optionsContainer = document.getElementById('options');

    let currentQuestion = 0;
    let score = 0;

    // Função para obter uma questão e suas opções
    function getQuestion(index) {
        const questionData = [
            {
                question: "Quando foi lançado o Clash of Clans?",
                options: ["2 de março de 2016", "15 de junho de 2017", "2 de agosto de 2012", "1 de setembro de 2006"],
                correctAnswer: 2
            },
            {
                question: "Qual é o nível máximo do Centro da Vila atualmente? (23/03/2025)",
                options: ["CV11", "CV17", "CV12", "CV14"],
                correctAnswer: 1
            },
            {
                question: "Qual a liga mais alta que se pode alcançar do jogo?",
                options: ["Bronze", "Campeão", "Cristal", "Lendária"],
                correctAnswer: 3
            },
            {
                question: "Qual era o nível máximo do Centro da Vila no lançamento?",
                options: ["CV8", "CV6", "CV10", "CV11"],
                correctAnswer: 0
            },
            {
                question: "Qual destes jogos não pertence ao universo do Clash of Clans?",
                options: ["Clash Royale", "Boom Beach", "Brawl Stars", "Squad Busters"],
                correctAnswer: 1
            },
            {
                question: "Qual destas tropas não existe no Clash of Clans?",
                options: ["Dragão Infernal", "Arqueira", "Sparky", "Lenhador"],
                correctAnswer: 3
            },
            {
                question: "Quando foi lançada a Base do Construtor?",
                options: ["Agosto de 2021", "Dezembro de 2016", "Maio de 2017", "Janeiro de 2013"],
                correctAnswer: 2
            },
            {
                question: "Quem são os inimigos principais do Clash of Clans?",
                options: ["Esqueletos", "Orcs", "Trolls", "Goblins"],
                correctAnswer: 3
            },
            {
                question: "Qual o máximo de estrelas que dá pra conseguir ao atacar uma vila?",
                options: ["3 Estrelas", "5 Estrelas", "1 Estrelas", "6 Estrelas"],
                correctAnswer: 0
            },
            {
                question: "Entre as moedas do jogo, qual é a mais recente?",
                options: ["Ouro", "Elixir Negro", "Elixir", "Gemas"],
                correctAnswer: 1
            }
        ];

        return questionData[index];
    }

    // Função para mostrar a questão atual
    function showQuestion() {
        const question = getQuestion(currentQuestion);

        // Atualiza o número da pergunta e o texto da questão
        questionNumber.textContent = `Pergunta ${currentQuestion + 1}`;
        questionText.textContent = question.question;

        // Atualiza as opções de resposta
        updateOptions(question.options);
        progressBar.style.width = `${(currentQuestion / 10) * 100}%`;
        nextButton.classList.add('hidden');
    }

    // Função para atualizar as opções de resposta
    function updateOptions(options) {
        optionsContainer.innerHTML = options.map((option, index) => {
            return `<li><button class="option-button" data-index="${index}">${option}</button></li>`;
        }).join('');
    }

    // Função para lidar com o clique nas opções
    function handleOptionClick(button) {
        const selectedIndex = parseInt(button.getAttribute('data-index'));
        const correctIndex = getQuestion(currentQuestion).correctAnswer;

        // Alterando a cor dos botões
        Array.from(optionsContainer.querySelectorAll('.option-button')).forEach((btn, index) => {
            if (index === correctIndex) {
                btn.style.backgroundColor = '#4CAF50'; // Resposta correta
            } else {
                btn.style.backgroundColor = '#F44336'; // Resposta errada
            }
            btn.disabled = true; // Desabilita os botões
        });

        // Aumenta a pontuação se a opção correta for escolhida
        if (selectedIndex === correctIndex) {
            score++;
        }

        nextButton.classList.remove('hidden');
    }

    // Função para avançar para a próxima pergunta ou mostrar o resultado
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < 10) {
            showQuestion();
        } else {
            showResult();
        }
    }

    // Função para mostrar o resultado
    function showResult() {
        quizSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        scoreDisplay.textContent = `${score}/10 acertos`;
        feedbackDisplay.textContent = score >= 7 ? 'Bom trabalho!' : 'Tente novamente!';
        progressBar.style.width = '100%';
    }

    // Função para reiniciar o quiz
    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        progressBar.style.width = '0%';
        resultSection.classList.add('hidden');
        startButton.classList.remove('hidden');
    }

    // Event listeners para iniciar, avançar e reiniciar o quiz
    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        quizSection.classList.remove('hidden');
        showQuestion();
    });

    nextButton.addEventListener('click', nextQuestion);

    restartButton.addEventListener('click', restartQuiz);

    optionsContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('option-button')) {
            handleOptionClick(e.target);
        }
    });
});