# agrinho-projeto-p5
🎯 Objetivo do Jogo
O objetivo é coletar 40 frutas (maçãs) usando uma cesta antes que o tempo acabe (60 segundos). O jogador move a cesta com as setas ← e → do teclado e precisa pegar as frutas que caem do topo da tela. Se alcançar a pontuação de 40 a tempo, vence o jogo. Caso contrário, é exibida uma mensagem de "Game Over".

🧠 Lógica e funcionamento do código
1. Elementos principais
basket: representa a cesta controlada pelo jogador.

fruits: é uma lista que armazena todas as frutas caindo.

score: registra a pontuação (frutas coletadas).

timeLeft: controla o tempo restante da partida.

gameStarted, gameOver, victory: controlam os estados do jogo.

startButton: botão que inicia o jogo.

2. Fases do jogo
Tela inicial: aparece o botão “🎮 Começar” e orientações básicas.

Tela de instruções: antes de o jogo começar, mostra instruções e aguarda que o jogador aperte a tecla ESPAÇO.

Jogo ativo: as frutas começam a cair, o jogador movimenta a cesta e tenta pegá-las.

Fim de jogo:

Se pegar 40 frutas → 🎉 Você venceu!

Se o tempo acabar antes → ⏱️ GAME OVER!!

3. Principais funções do código
setup()
Cria a tela do jogo e exibe o botão de início.

draw()
Atualiza o jogo a cada quadro:

Mostra a cesta, frutas e pontuação.

Verifica se o jogador venceu ou perdeu.

startGame()
Reseta as variáveis e ativa a tela de instruções.

startTimerAndGame()
Inicia o cronômetro de 60 segundos somente depois que o jogador aperta ESPAÇO.

Basket (classe da cesta)
Define a posição, movimentação e visual da cesta.

Fruit (classe da fruta)
Cria frutas aleatórias que caem, mostra elas na tela e detecta se foram pegas pela cesta.

4. Controles do jogador
Seta Esquerda (←): move a cesta para a esquerda.

Seta Direita (→): move a cesta para a direita.

Barra de Espaço: começa o jogo após a tela de instruções.

🌟 Conexão com o Agrinho
Este jogo pode representar valores como alimentação saudável, colheita de alimentos ou a importância da agricultura na vida das pessoas. A brincadeira de coletar frutas incentiva de forma lúdica a valorização da produção agrícola e da natureza.


Para jogar clique no link:https://vitinho1604.github.io/agrinho-projeto-p5/
