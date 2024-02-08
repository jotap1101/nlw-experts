// 'const' é uma palavra reservada para criar uma variável imutável.
// 'document' é um objeto que representa o documento HTML.
// 'querySelector()' é um método que retorna o primeiro elemento que corresponde a um seletor específico.
// for...of é uma declaração que cria um loop que itera sobre valores iteráveis (arrays, strings, objetos, etc).
// 'cloneNode()' é um método que clona um nó do DOM.
// 'textContent' é uma propriedade que define ou retorna o conteúdo de texto de um nó e de seus descendentes.
// 'appendChild()' é um método que adiciona um nó ao final da lista de filhos de um nó pai especificado.
// 'remove()' é um método que remove o nó do DOM.



// Array de objetos contendo perguntas, respostas e a resposta correta
const perguntas = [
    {
        pergunta: "Quem é o verdadeiro Gossip Girl?",
        respostas: [
            "A) Dan Humphrey",
            "B) Blair Waldorf",
            "C) Serena van der Woodsen"
        ],
        correta: 0
    },
    {
        pergunta: "Qual personagem começou o relacionamento com um professor da faculdade?",
        respostas: [
            "A) Serena van der Woodsen",
            "B) Blair Waldorf",
            "C) Jenny Humphrey"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é o sobrenome completo de Blair?",
        respostas: [
            "A) Blair Vanderbilt",
            "B) Blair Bass",
            "C) Blair Waldorf"
        ],
        correta: 2
    },
    {
        pergunta: "Qual é o verdadeiro nome de Chuck Bass?",
        respostas: [
            "A) Charles Bass",
            "B) Chuck Archibald",
            "C) Chuck Vanderbilt"
        ],
        correta: 0
    },
    {
        pergunta: "Qual o motivo pelo qual Blair perde a coroa como rainha do baile de formatura?",
        respostas: [
            "A) Ela é desqualificada por trapaça",
            "B) Ela voluntariamente renuncia ao título",
            "C) Ela é substituída por Jenny Humphrey"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é o verdadeiro nome de Lily van der Woodsen?",
        respostas: [
            "A) Lily Archibald",
            "B) Lily Humphrey",
            "C) Lily Rhodes"
        ],
        correta: 2
    },
    {
        pergunta: "Quem é o pai biológico de Chuck Bass?",
        respostas: [
            "A) William van der Woodsen",
            "B) Bart Bass",
            "C) Rufus Humphrey"
        ],
        correta: 0
    },
    {
        pergunta: "Qual personagem finge ser Gossip Girl para proteger o verdadeiro?",
        respostas: [
            "A) Serena van der Woodsen",
            "B) Dan Humphrey",
            "C) Nate Archibald"
        ],
        correta: 1
    },
    {
        pergunta: "Qual é o apelido dado ao grupo de Blair, Serena, Nate, Chuck e Jenny?",
        respostas: [
            "A) Upper East Siders",
            "B) Manhattan Elite",
            "C) Gossip Group"
        ],
        correta: 0
    },
    {
        pergunta: "Quem é o último a se tornar um membro oficial do grupo?",
        respostas: [
            "A) Serena van der Woodsen",
            "B) Chuck Bass",
            "C) Dan Humphrey"
        ],
        correta: 2
    }
];

// Seleciona o elemento HTML com o id 'quiz'
const quiz = document.querySelector('#quiz');

// Seleciona o elemento HTML com a tag 'template'
const template = document.querySelector('template');

const corretas = new Set();

const totalDePerguntas = perguntas.length;

const mostrarTotal = document.querySelector('#acertos span');

mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas;

// Itera sobre o array de objetos 'perguntas' e cria um novo elemento HTML para cada pergunta
for (const pergunta of perguntas) {
    // Clona o conteúdo do template para criar um novo item de quiz
    const quizItem = template.content.cloneNode(true);

    // Define o texto da pergunta dentro do item do quiz
    quizItem.querySelector('h3').textContent = pergunta.pergunta;

    // Itera sobre cada resposta da pergunta
    for (const resposta of pergunta.respostas) {
        // Clona o elemento <dt> que contém uma resposta
        const dt = quizItem.querySelector('dl dt').cloneNode(true);

        // Define o texto da resposta dentro do elemento <span>
        dt.querySelector('span').textContent = resposta;

        // Define o atributo 'name' do input para 'pergunta-' + o índice da pergunta
        dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(pergunta));

        // Define o valor do input para o índice da resposta
        dt.querySelector('input').value = pergunta.respostas.indexOf(resposta);

        // Adiciona um evento 'change' ao input
        dt.querySelector('input').onchange = () => {
            // Verifica se a resposta está correta
            const estaCorreta = event.target.value == pergunta.correta;

            // Remove a pergunta do Set de respostas corretas se já estiver lá
            corretas.delete(pergunta);

            // Adiciona a pergunta ao Set de respostas corretas se a resposta estiver correta
            if (estaCorreta) {
                corretas.add(pergunta);
            }

            // Atualiza o texto do elemento HTML com id 'acertos'
            mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas;
        };

        // Adiciona a resposta ao item do quiz
        quizItem.querySelector('dl').appendChild(dt);
    }

    // Remove o primeiro <dt> que foi usado como modelo
    quizItem.querySelector('dl dt').remove();

    // Adiciona o item do quiz ao elemento HTML com id 'quiz'
    quiz.appendChild(quizItem);
}