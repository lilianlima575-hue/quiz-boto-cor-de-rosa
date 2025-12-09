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
const statusElement = document.getElementById('game-status'); // NOVO ELEMENTO PLACAR

// --- 3. FUNÇÃO: Carregar a Próxima Pergunta (Com a) b) c) d)) ---
function loadQuestion() {
    answered = false;
    optionsContainer.innerHTML = ''; 
    resultElement.innerHTML = ''; // Limpa o feedback de acerto/erro

    if (currentQuestionIndex >= quiz.length) {
        showResults(); 
        return;
    }

    const currentQuestion = quiz[currentQuestionIndex];
    
    questionElement.textContent = `>>> Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;

    // Array com as letras para prefixar as opções
    const letters = ['a)', 'b)', 'c)', 'd)'];
    
    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        
        // Adiciona a letra da opção (a) b) c) d))
        button.textContent = `${letters[index]} ${optionText}`;
        
        button.classList.add('option-button');
        button.id = 'option-' + index; 
        
        button.onclick = () => checkAnswer(index, currentQuestion.answer); 
        
        optionsContainer.appendChild(button);
    });
    
    updateStatusDisplay(); // Sempre chama para manter o placar atualizado
}

// --- 4. FUNÇÃO: Atualizar o Placar Fixo ---
function updateStatusDisplay() {
     // Apenas atualiza o placar fixo
    const scoreMessage = `[STATUS] PERGUNTA ${currentQuestionIndex + 1}/${quiz.length} | SCORE: ${score} PONTOS`;
    statusElement.textContent = scoreMessage;
}


// --- 5. FUNÇÃO: Verificar a Resposta (Feedback Imediato de Jogo) ---
function checkAnswer(selectedIndex, correctAnswerIndex) {
    if (answered) return; 
    answered = true;

    const selectedButton = document.getElementById('option-' + selectedIndex);
    
    let resultFeedback = '';

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultFeedback = '>> [AÇÃO CONCLUÍDA] ACERTOU! +1 Ponto!';
        selectedButton.classList.add('correct');
    } else {
        resultFeedback = '>> [AÇÃO FALHOU] ERROU! Resposta Incorreta.';
        selectedButton.classList.add('wrong');
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }
    
    // Feedback de Jogo (no elemento #result)
    resultElement.innerHTML = `<p><strong>${resultFeedback}</strong></p>`;
    updateStatusDisplay(); // Atualiza o placar fixo imediatamente

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000); 
}

// --- 6. FUNÇÃO: Exibir Resultados Finais (Game Over) e Reiniciar ---
function showResults() {
    questionElement.textContent = '>> [FIM DO PROGRAMA] ANÁLISE CONCLUÍDA.';
    optionsContainer.innerHTML = '';
    
    // O status final vai para o elemento #result, e o #game-status é limpo
    statusElement.textContent = '[STATUS] PROGRAMA FINALIZADO. VERIFICANDO PONTUAÇÃO...'; 
    
    resultElement.innerHTML = `
        <p style="font-size: 1.5em;">>> PONTUAÇÃO FINAL: ${score} DE ${quiz.length}.</p>
        <button class="option-button" onclick="restartQuiz()">REINICIAR PROGRAMA (RESTART)</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Inicia o quiz ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Isso garante que o status inicial seja exibido corretamente
    if (document.getElementById('start-quiz-btn')) {
        // Inicializa o game-status para a primeira jogada
        statusElement.textContent = `[STATUS] AGUARDANDO COMANDO. PERGUNTAS DISPONÍVEIS: ${quiz.length}`;
    } else {
        // Se o quiz começar automaticamente (sem botão iniciar), carrega a 1ª pergunta
        loadQuestion();
    }
});
