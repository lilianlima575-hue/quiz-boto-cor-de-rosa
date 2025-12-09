const questions = [
    {
        q: "Onde o boto-cor-de-rosa vive?",
        a: ["Amazônia", "Antártida", "África"],
        c: 0
    },
    {
        q: "O boto é um:",
        a: ["Peixe", "Mamífero", "Réptil"],
        c: 1
    }
];

let index = 0;

function loadQuestion() {
    const q = questions[index];
    document.getElementById("question").innerText = q.q;

    const optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    q.a.forEach((op, i) => {
        const btn = document.createElement("button");
        btn.innerText = op;
        btn.onclick = () => checkAnswer(i);
        optDiv.appendChild(btn);
    });
}

function checkAnswer(i) {
    if (i === questions[index].c) {
        alert("Acertou!");
    } else {
        alert("Errou!");
    }
}

function nextQuestion() {
    index++;
    if (index >= questions.length) {
        alert("Fim do quiz!");
        index = 0;
    }
    loadQuestion();
}

loadQuestion();
