let pontos = 0;
let erros = 0;
let tempoRestante = 10;
let intervalo;
let jogoAcabou = true;
const corVerdeNeon = '#00FFA3';
const corVermelhoNeon = '#FF3D5C';
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const errorsDisplay = document.getElementById('errors');
const circle = document.getElementById('circle');
const resetButton = document.getElementById('resetButton');
const controlsContainer = document.getElementById('controlsContainer');
const menuRecord = document.getElementById('Recorde');
const circleSizeInput = document.getElementById('circleSize');
const previewCircle = document.getElementById('previewCircle');
const recordPontuacao = document.getElementById('recordPontuacao');
const recordErros = document.getElementById('recordErros');
const feedback = document.getElementById('feedback');

// Atualiza o tamanho da bolinha e do preview sempre que o usuário ajustar o slider
circleSizeInput.addEventListener('input', () => {
    const size = circleSizeInput.value + 'px';
    circle.style.width = size;
    circle.style.height = size;
    previewCircle.style.width = size;
    previewCircle.style.height = size;
});

// Função para gerar posição aleatória para o círculo
function moverCirculo() {
    const circleSize = circle.offsetWidth; // Captura o tamanho atual do círculo

    const x = Math.floor(Math.random() * (window.innerWidth - circleSize));
    const y = Math.floor(Math.random() * (window.innerHeight - circleSize));
    circle.style.left = x + 'px';
    circle.style.top = y + 'px';
}

// Função chamada quando o usuário erra o clique
function errouClick() {
    if (!jogoAcabou) { // Verifica se o jogo ainda está ativo
        erros++; // Aumenta o contador de erros
        errorsDisplay.textContent = 'Erros: ' + erros;

        // Temporariamente muda a cor do círculo para vermelho
        circle.style.backgroundColor = corVermelhoNeon;
        setTimeout(() => {
            circle.style.backgroundColor = corVerdeNeon; // Volta para a cor verde após 300 ms
        }, 300);
    }
}

// Quando o círculo é clicado
circle.addEventListener('click', () => {
    if (!jogoAcabou) { // Verifica se o jogo ainda está ativo
        pontos++; // Aumenta o placar
        scoreDisplay.textContent = 'Pontos: ' + pontos; // Atualiza o placar
        moverCirculo(); // Move o círculo para uma nova posição
    }
});

// Função para verificar cliques fora do círculo
function verificarCliqueFora(event) {
    if (event.target !== circle) {
        errouClick(); // Chama a função de erro
    }
}

// Temporizador do jogo
function iniciarJogo() {
    pontos = 0; // Reinicia a contagem de pontos
    erros = 0; // Reinicia a contagem de erros
    tempoRestante = 10; // Define o tempo restante para 10 segundos
    jogoAcabou = false; // Indica que o jogo ainda está ativo

    // Atualiza os displays de pontuação, erros e tempo
    scoreDisplay.textContent = 'Pontos: ' + pontos;
    errorsDisplay.textContent = 'Erros: ' + erros;
    timerDisplay.textContent = 'Tempo restante: ' + tempoRestante;

    // Mostra o círculo, oculta o botão de reinício e o menu de tamanho do círculo
    circle.style.display = 'block';
    resetButton.style.display = 'none';
    controlsContainer.style.display = 'none';
    menuRecord.style.display = 'none';
    feedback.style.display = 'none';




    // Limpa qualquer intervalo anterior que pode estar ativo
    clearInterval(intervalo);

    // Inicia um novo intervalo que decrementar o tempo restante a cada segundo
    intervalo = setInterval(() => {
        tempoRestante--; // Decrementa o tempo restante
        if (tempoRestante === 0) {
            jogoAcabou = true; // Marca o jogo como terminado
            clearInterval(intervalo); // Limpa o intervalo, parando a contagem do tempo
            circle.style.display = 'none'; // Oculta o círculo
            alert('Tempo esgotado! Pontuação final: ' + pontos + ' | Erros: ' + erros); // Mostra alerta com resultados
            resetButton.style.display = 'block'; // Exibe o botão de reinício
            controlsContainer.style.display = 'block'; // Exibe o menu de tamanho do círculo após o jogo
            menuRecord.style.display = 'block';
            feedback.style.display = 'block';


            // Remove o evento de clique para evitar contagem de erro após o fim do jogo
            document.removeEventListener('click', verificarCliqueFora);
            scoreDisplay.textContent = 'Pontos: ' + 0; // Atualiza o display 
            errorsDisplay.textContent = 'Erros: ' + 0; // Atualiza o display
            timerDisplay.textContent = 'Tempo restante: ' + 10; // Atualiza o display do tempo restante
            atualizaRecord(pontos, erros)

            exit();
        }
        timerDisplay.textContent = 'Tempo restante: ' + tempoRestante; // Atualiza o display do tempo restante
    }, 1000); // Executa a função a cada 1000 milissegundos (1 segundo)

    moverCirculo(); // Chama a função para mover o círculo para uma nova posição

    // Adiciona o evento de clique para verificar erros apenas quando o jogo começa
    document.addEventListener('click', verificarCliqueFora);
}

// Evento de clique no botão "Jogar Novamente"
resetButton.addEventListener('click', (event) => {
    // Remove o evento de clique para evitar contagem de erro
    document.removeEventListener('click', verificarCliqueFora);
    event.stopPropagation(); // Impede a propagação do clique
    iniciarJogo(); // Inicia um novo jogo
});

function atualizaRecord(pontos, erros) {
    const recordeAtualPontuacao = parseInt(recordPontuacao.textContent.split(": ")[1]) || 0;
    const recordeAtualErros = parseInt(recordErros.textContent.split(": ")[1]) || Infinity;

    if (recordeAtualPontuacao < pontos && recordeAtualErros > erros) {
        recordPontuacao.textContent = 'Recorde Pontuação: ' + pontos;
        recordErros.textContent = 'Recorde Erros: ' + erros;
    }
}