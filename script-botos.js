// --- 1. A Lista de Perguntas (O Conteúdo do Jogo) ---
// AS RESPOSTAS FORAM AJUSTADAS PARA CORRESPONDER AO TEXTO DE ESTUDO
const quiz = [
    {
        question: "Qual característica do Boto Cor-de-Rosa (Inia geoffrensis) permite maior capacidade de manobra para caçar em florestas alagadas (igapós)?",
        options: ["Sua barbatana dorsal triangular", "Suas vértebras cervicais não fundidas", "Sua coloração rosa intensa", "Seu corpo aerodinâmico e veloz"],
        answer: 1, // Resposta: "Suas vértebras cervicais não fundidas"
    },
    {
        question: "Qual boto fluvial é geneticamente mais próximo dos golfinhos oceânicos (família Delphinidae) e possui uma barbatana dorsal triangular definida?",
        options: ["O Boto Cor-de-Rosa (Inia)", "O Boto Tucuxi (Sotalia)", "O Cachalote Fluvial", "A Toninha"],
        answer: 1, // Resposta: "O Boto Tucuxi (Sotalia)"
    },
    {
        question: "A principal ameaça antrópica mencionada no texto que afeta a saúde reprodutiva e neurológica dos botos é:",
        options: ["Ataques de piranhas", "A construção de pontes e estradas", "Contaminação por mercúrio de mineração", "O aumento da população de jacarés"],
        answer: 2, // Resposta: "Contaminação por mercúrio de mineração"
    },
    {
        question: "Por que o Boto Cor-de-Rosa tem prioridade na manobrabilidade em detrimento da velocidade, como citado no texto de estudo?",
        options: ["Ele é muito velho para ser rápido", "Porque ele caça em águas abertas e canais rápidos", "Devido à necessidade de se mover em águas rasas, turvas e cheias de obstáculos", "Sua dieta consiste apenas em peixes grandes e lentos"],
        answer: 2, // Resposta: "Devido à necessidade de se mover em águas rasas, turvas e cheias de obstáculos"
    }
];

// --- 2. Variáveis e Conexão com o HTML ---
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const resultElement = document.getElementById('result'); 
const statusElement = document.getElementById('game-status'); 

// --- 3. FUNÇÃO: Carregar a Próxima Pergunta (Com a) b) c) d)) ---
function loadQuestion() {
    answered = false;
    optionsContainer.innerHTML = ''; 
    resultElement.innerHTML = ''; 

    if (currentQuestionIndex >= quiz.length) {
        showResults(); 
        return;
    }

    const currentQuestion = quiz[currentQuestionIndex];
    
    questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;

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
    
    updateStatusDisplay(); 
}

// --- 4. FUNÇÃO: Atualizar o Placar Fixo ---
function updateStatusDisplay() {
    const scoreMessage = `Status: Questão ${currentQuestionIndex + 1} de ${quiz.length} | Pontuação Atual: ${score}`;
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
        resultFeedback = '✅ Resposta Correta! (Pontos: +1)';
        selectedButton.classList.add('correct');
    } else {
        resultFeedback = '❌ Resposta Incorreta!';
        selectedButton.classList.add('wrong');
        // Mostra qual seria a correta
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }
    
    resultElement.innerHTML = `<p style="font-size: 1.3em; font-weight: 600;">${resultFeedback}</p>`;
    updateStatusDisplay(); 

    // Avança para a próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000); 
}

// --- 6. FUNÇÃO: Exibir Resultados Finais (Game Over) e Reiniciar ---
function showResults() {
    questionElement.textContent = '🎉 QUIZ CONCLUÍDO! 🎉';
    optionsContainer.innerHTML = '';
    
    statusElement.textContent = `Resultado Final: ${score} de ${quiz.length} Questões.`; 
    
    resultElement.innerHTML = `
        <p style="font-size: 1.5em; color: #1a237e;">Parabéns! Sua pontuação foi: <strong>${score} de ${quiz.length}</strong>.</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Inicia o quiz
document.addEventListener('DOMContentLoaded', () => {
    // Isso garante que o status inicial seja exibido corretamente
    if (document.getElementById('start-quiz-btn')) {
        statusElement.textContent = `Status: Aguardando Início | Total de Questões: ${quiz.length}`;
    } else {
        loadQuestion();
    }
});
