var jogador = 1;
var empate = 0; 

var resultado = document.querySelector('div#resultado');
var jogador1 = document.querySelector('div#jogador1');
var jogador2 = document.querySelector('div#jogador2');
var jogo = document.querySelector('div#jogo');
var botaoReiniciar = document.querySelector('button#reiniciar');

//Casos horizontais
casoH1 = [1, 2, 3];
casoH2 = [4, 5, 6];
casoH3 = [7, 8, 9];

//Casos verticais
casoV1 = [1, 4, 7];
casoV2 = [2, 5, 8];
casoV3 = [3, 6, 9];

//Casos diagonais
casoD1 = [1, 5, 9];
casoD2 = [3, 5, 7];

jogo.addEventListener('click', main);

pontuacao1 = Number(localStorage.getItem('jogador1'));
pontuacao2 = Number(localStorage.getItem('jogador2'));

jogador1.innerHTML = `${pontuacao1} pontos`;
jogador2.innerHTML = `${pontuacao2} pontos`;

function main(e) {
  var casa = e.target;

  if(e.target.id != 'jogo') {
    var bg = casa.style.background;

    if(bg === '' || bg === 'none') {
    casa.style.background = (jogador == 1 ? 'url(assets/bola.svg) no-repeat center':'url(assets/xis.svg) no-repeat center');

    verificaTabuleiro();
    
    jogador = (jogador == 1 ? 2 : 1);

    verificaEmpate();
    }
  }
}


function verificaTabuleiro () {
  
  // if (verificaCasas(casoH1) ||
  //     verificaCasas(casoH2) ||
  //     verificaCasas(casoH3) ||

  //     verificaCasas(casoV1) ||
  //     verificaCasas(casoV2) ||
  //     verificaCasas(casoV3) ||

  //     verificaCasas(casoD1) ||
  //     verificaCasas(casoD2)
  // ) {
  //   return true;
  // }

  // return false;

  const resposta = [
    casoH1, casoH2, casoH3,
    casoV1, casoV2, casoV3,
    casoD1, casoD2
  ].some(element => verificaCasas(element));

  if (resposta) {
    return true;
  }

  return false;
}

function verificaCasas(caso) {
  var casa1 = document.querySelector('div#casa'+caso[0]);
  var casa2 = document.querySelector('div#casa'+caso[1]);
  var casa3 = document.querySelector('div#casa'+caso[2]);

  var background1 = casa1.style.background;
  var background2 = casa2.style.background;
  var background3 = casa3.style.background;

  if((background1 == background2 && background2 == background3) && background1 !== '') {
    resultado.innerHTML = `O jogador ${jogador} venceu`;

    pontuacao = Number(localStorage.getItem(`jogador${jogador}`));

    localStorage.setItem(`jogador${jogador}`, pontuacao + 1);

    if (jogador === 1) {
      jogador1.innerHTML = `${pontuacao + 1} pontos`;
    } else {
      jogador2.innerHTML = `${pontuacao + 1} pontos`;
    }

    jogo.removeEventListener('click', main);

    botaoReiniciar.disabled = false;

    return true;
  }
}

function reiniciar () {
  empate = 0;
  jogador = 1;
  resultado.innerHTML = ``;

  for (var i = 1; i < 10; i++) {
    const casa = document.querySelector('div#casa'+i);

    casa.style.background = '';
  }

  botaoReiniciar.disabled = true;

  jogo.addEventListener('click', main);
}

function verificaEmpate() {
  empate++;
  if(empate == 9 && !verificaTabuleiro()) {

    resultado.innerHTML = `Empate`;

    jogo.removeEventListener('click', main);

    botaoReiniciar.disabled = false;
  }
}

function reiniciarPlacar() {
  localStorage.setItem('jogador1', 0);
  localStorage.setItem('jogador2', 0);
  
  jogador1.innerHTML = 0 + ` pontos`;
  jogador2.innerHTML = 0 + ` pontos`;
}