// --- 1. A Lista de Perguntas (O SEU CONTEÚDO) ---
// Note que 'answer: 0' significa que a primeira opção (índice 0) é a correta.
const quiz = [
    {
        question: "Onde vive principalmente o Boto Cor-de-Rosa?",
        options: ["Nos rios da Amazônia e Orinoco", "Nos oceanos Atlântico e Pacífico"],
        answer: 0 
    },
    {
        question: "Qual dos botos é o tema da lenda que se transforma em homem?",
        options: ["O Boto Tucuxi", "O Boto Cor-de-Rosa"],
        answer: 1 
    },
    {
        question: "Qual dos dois botos é conhecido por ter o pescoço mais flexível, podendo virar a cabeça em quase 90 graus?",
        options: ["Boto Cor-de-Rosa (Inia)", "Boto Tucuxi (Sotalia)"],
        answer: 0 
    },
    {
        question: "O que o Boto Cor-de-Rosa costuma comer?",
        options: ["Frutas das árvores da floresta", "Peixes, crustáceos e pequenos animais aquáticos"],
        answer: 1 
    },
    {
        question: "Qual boto tem uma barbatana dorsal mais parecida com a de um golfinho marinho (triangular e definida)?",
        options: ["Boto Cor-de-Rosa", "Boto Tucuxi"],
        answer: 1 
    },
    {
        question: "Qual é a principal ameaça atual ao Boto Cor-de-Rosa e ao Tucuxi?",
        options: ["Falcões e predadores aéreos", "Poluição, desmatamento e pesca ilegal"],
        answer: 1 
    }
];

// --- 2. Variáveis de Controle ---
let currentQuestionIndex = 0; // Índice da pergunta atual (começa em 0)
let score = 0; // Pontuação
let answered = false; // Impede que o usuário clique duas vezes na mesma pergunta

// --- 3. Conexão com o HTML (Onde colocar o texto) ---
const questionElement = document.querySelector('.question');
const optionsContainer = document.querySelector('.options');
const resultElement = document.getElementById('result'); 

// --- 4. FUNÇÃO: Carregar a Próxima Pergunta ---
function loadQuestion() {
    answered = false;
    optionsContainer.innerHTML = ''; // Limpa os botões antigos
    resultElement.textContent = ''; // Limpa a mensagem 'Certo/Errado'

    if (currentQuestionIndex >= quiz.length) {
        showResults(); // Se acabaram as perguntas, mostra o resultado final
        return;
    }

    const currentQuestion = quiz[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question; // Exibe a nova pergunta

    // Loop para criar um botão para cada opção
    currentQuestion.options.forEach((optionText, index) => {
        const button = document.createElement('button');
        button.textContent = optionText;
        button.classList.add('option-button');
        button.id = 'option-' + index; 
        
        // Define que ao clicar, a função checkAnswer será chamada
        button.onclick = () => checkAnswer(index, currentQuestion.answer);
        
        optionsContainer.appendChild(button);
    });
}

// --- 5. FUNÇÃO: Verificar a Resposta ---
function checkAnswer(selectedIndex, correctAnswerIndex) {
    if (answered) return; // Se já respondeu, ignora cliques
    answered = true;

    const selectedButton = document.getElementById('option-' + selectedIndex);

    if (selectedIndex === correctAnswerIndex) {
        score++;
        resultElement.textContent = '✅ Resposta Correta! +1 Ponto';
        selectedButton.classList.add('correct'); // Aplica o estilo CSS de sucesso
    } else {
        resultElement.textContent = '❌ Resposta Errada.';
        selectedButton.classList.add('wrong'); // Aplica o estilo CSS de erro
        // Destaca a resposta certa
        document.getElementById('option-' + correctAnswerIndex).classList.add('correct');
    }

    // Espera 2 segundos antes de avançar para a próxima pergunta
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 2000);
}

// --- 6. FUNÇÃO: Exibir Resultados Finais ---
function showResults() {
    questionElement.textContent = '🐬 Quiz Concluído! 💖';
    optionsContainer.innerHTML = '';
    resultElement.innerHTML = `
        <p>Sua pontuação final é: <strong>${score} de ${quiz.length}</strong>.</p>
        <p>Parabéns por testar seus conhecimentos sobre os Botos da Amazônia!</p>
        <button class="option-button" onclick="restartQuiz()">Reiniciar Quiz</button>
    `;
}

// --- 7. FUNÇÃO: Reiniciar o Jogo ---
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Inicia o quiz assim que a página é carregada
document.addEventListener('DOMContentLoaded', loadQuestion);
