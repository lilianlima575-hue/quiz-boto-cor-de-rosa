// --- 1. A Lista de Perguntas (O Conteúdo do Jogo) ---
const quiz = [
    {
        question: "Qual característica morfológica confere ao Boto Cor-de-Rosa maior capacidade de caça em ambientes de igapó?",
        options: ["Sua barbatana dorsal triangular", "Suas vértebras cervicais livres"],
        answer: 1, 
    },
    {
        question: "Qual dos botos é geneticamente mais próximo dos golfinhos oceânicos (família Delphinidae)?",
        options: ["O Boto Cor-de-Rosa (Inia)", "O Boto Tucuxi (Sotalia)"],
        answer: 1, 
    },
    {
        question: "A principal ameaça antrópica que afeta a saúde dos botos devido à degradação do habitat é:",
        options: ["Ataques de predadores naturais como onças", "Contaminação por mercúrio e fragmentação do habitat"],
        answer: 1, 
    },
    {
        question: "Qual é a estrutura morfológica da nadadeira dorsal do Boto Tucuxi?",
        options: ["Uma crista dorsal baixa", "Uma barbatana dorsal triangular e definida"],
        answer: 1, 
    },
    {
        question: "Onde o Boto Cor-de-Rosa é encontrado, indicando sua distribuição endêmica?",
        options: ["Em estuários costeiros e mar aberto", "Exclusivamente nas bacias hidrográficas do Amazonas e Orinoco"],
        answer: 1, 
    }
];

// --- 2. Variáveis e Conexão com o HTML ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const resultElement = document.getElementById('result'); 

// --- 3. FUNÇÃO: Carregar a Próxima Pergunta ---
function loadQuestion() {
    answered = false;
    optionsContainer.innerHTML = ''; 
    resultElement.innerHTML = ''; 

    if (currentQuestionIndex >= quiz.length) {
        showResults(); 
        return;
    }

    const currentQuestion = quiz[currentQuestionIndex];
    
    // Mostra o número da pergunta para dar a sensação de progresso no jogo
    questionElement.textContent = `Pergunta ${currentQuestionIndex + 1}/${quiz.length}: ${currentQuestion.question}`;

    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.id = 'option-' + index; 
        
        button.onclick = () => checkAnswer(index, currentQuestion.answer); 
        
        optionsContainer.appendChild(button);
    });
    
    updateScoreDisplay();
}

// --- 4. FUNÇÃO: Atualizar o Placar do Jogo ---
function updateScoreDisplay() {
    const scoreMessage = `Pontos: ${score} | Jogada: ${currentQuestionIndex}/${quiz.length}`;
    
    if (currentQuestionIndex < quiz.length) {
         // Exibe o placar no elemento de resultado temporariamente
         resultElement.innerHTML = `<p style="font-size: 1em; color: #1e8449;">${scoreMessage}</p>`;
    }
}


// --- 5. FUNÇÃO: Verificar a Resposta (Feedback Imediato de Jogo) ---
function checkAnswer(selectedIndex, correctAnswerIndex) {
    if (answered) return; 
    answered = true;

    const selectedButton = document.getElementById('option-' + selectedIndex);
    
    let resultFeedback = '';

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultFeedback = '🎉 ACERTOU! +1 Ponto!';
        selectedButton.classList.add('correct');
    } else {
        resultFeedback = '😔 ERROU...';
        selectedButton.classList.add('wrong');
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }
    
    // Feedback de Jogo
    resultElement.innerHTML = `<p style="font-size: 1.3em;"><strong>${resultFeedback}</strong></p>`;
    updateScoreDisplay(); // Atualiza o placar

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000); 
}

// --- 6. FUNÇÃO: Exibir Resultados Finais (Game Over) e Reiniciar ---
function showResults() {
    questionElement.textContent = '🏆 FIM DE JOGO! 🏆';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p style="font-size: 1.5em; color: #fe6860;">Pontuação Final: <strong>${score} de ${quiz.length}</strong>.</p>
        <button class="option-button" onclick="restartQuiz()">REINICIAR JOGO</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}
