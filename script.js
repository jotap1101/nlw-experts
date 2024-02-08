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
        pergunta: "Qual é a função do operador '===' em JavaScript?",
        respostas: [
            "A) Comparação estrita de igualdade",
            "B) Atribuição",
            "C) Comparação solta de igualdade"
        ],
        correta: 0
    },
    {
        pergunta: "O que o método 'querySelector()' faz em JavaScript?",
        respostas: [
            "A) Seleciona o primeiro elemento do documento que corresponde a um seletor específico",
            "B) Modifica o conteúdo de um elemento HTML",
            "C) Cria um novo elemento HTML"
        ],
        correta: 0
    },
    {
        pergunta: "O que é um array em JavaScript?",
        respostas: [
            "A) Uma variável que armazena uma única peça de dados",
            "B) Um objeto que armazena coleções de dados",
            "C) Um método para iterar sobre objetos em JavaScript"
        ],
        correta: 1
    },
    {
        pergunta: "Como você declara uma variável em JavaScript?",
        respostas: [
            "A) let myVar = 5;",
            "B) const myVar = 5;",
            "C) var myVar = 5;"
        ],
        correta: 2
    },
    {
        pergunta: "Qual é a sintaxe correta para um comentário de linha em JavaScript?",
        respostas: [
            "A) // Este é um comentário de linha",
            "B) <!-- Este é um comentário de linha -->",
            "C) /* Este é um comentário de linha */"
        ],
        correta: 0
    },
    {
        pergunta: "O que o método 'addEventListener()' faz em JavaScript?",
        respostas: [
            "A) Adiciona um evento a um elemento HTML",
            "B) Remove um evento de um elemento HTML",
            "C) Modifica o estilo de um elemento HTML"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a diferença entre 'null' e 'undefined' em JavaScript?",
        respostas: [
            "A) 'null' é um valor atribuído explicitamente para indicar a ausência de valor, enquanto 'undefined' é o valor padrão atribuído a uma variável não inicializada.",
            "B) 'null' indica que uma variável está vazia, enquanto 'undefined' indica que uma variável não existe.",
            "C) 'null' e 'undefined' são usados ​​intercambiavelmente em JavaScript."
        ],
        correta: 0
    },
    {
        pergunta: "O que o método 'forEach()' faz em um array JavaScript?",
        respostas: [
            "A) Executa uma função uma vez para cada elemento do array",
            "B) Retorna o primeiro elemento do array",
            "C) Remove o último elemento do array"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é o operador lógico 'OU' em JavaScript?",
        respostas: [
            "A) ||",
            "B) &&",
            "C) !"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a função do método 'parseInt()' em JavaScript?",
        respostas: [
            "A) Converte uma string em um número inteiro",
            "B) Retorna a parte fracionária de um número",
            "C) Retorna um número arredondado para o número inteiro mais próximo"
        ],
        correta: 0
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