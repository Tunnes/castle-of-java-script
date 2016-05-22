//  IMPORTANTE: 
//  Esta função que me deu mais dor de cabeça pois é a mais complexa e mesmo com o auxilio
//  de amigos, sites relacionados e outros eu só consegui entender e implementa-la pois 
//  segui a logica matematica de um video relativo a colisoes com Js, então a logica desta 
//  função não  é de total autoria minha, apenas a entendi e adaptei segundo as necessidade 
//  de construção do game, logo agradeço ao Desenvolvedor e Professor Gustavo Silveira.

//  Bom dentro desta "classe" estão as principais funções relativas ao acotencimento de colisões
//  no decorrer do game, para isso tive que relembrar o funcionamento basico de catetos e adaptar
//  minha "classe" de sprites para faciliar o calculo.

//  FUNCÃO BLOQUEIA =========================================================================================
    // A função bloqueia recebe dois elementos e faz com que o elemento01 seja efetivamente bloqueado 
    // pelo elemento02.
    
    function bloqueia(elemento01,elemento02){
        
        //  As variaveis "distanciaAtualX" e "distanciaAtualY" armazena a distancia entre os centros X e Y
        //  de ambos os elementos ou seja qual a distancia que um elemento esta do outro.
        var distanciaAtualX = elemento01.pontoCentralX() - elemento02.pontoCentralX();
        var distanciaAtualY = elemento01.pontoCentralY() - elemento02.pontoCentralY();
        
        // As variaveis "distanciaMinimaX" e "distanciaMinimaY" armazenam as distancias minima
        // que os elementos poram chegar sem se colidirem.
        var distanciaMinimaX = elemento01.metadeDaLargura() + elemento02.metadeDaLargura();
        var distanciaMinimaY = elemento01.metadeDaAltura()  + elemento02.metadeDaAltura();
        
        // Verifico se a distancia atual dos dois elementos é menor que a distancia minima permitida,
        // a função Math.abs ela retorna o parametro enviado como valor absoluto ou seja se estiver 
        // negativo vira positivo.
        
        if( Math.abs(distanciaAtualX) < distanciaMinimaX && Math.abs(distanciaAtualY) < distanciaMinimaY){
            
            // As variaveis ultrapassagemX e ultrapassagemY, elas recebem a quantidade de pixels que  
            // foram ultrapassadas no momento de colissão nos eixos x e y.
            var ultrapassagemX = distanciaMinimaX - Math.abs(distanciaAtualX);
            var ultrapassagemY = distanciaMinimaY - Math.abs(distanciaAtualY);
                    
            if(ultrapassagemX >= ultrapassagemY){
                if(distanciaAtualY > 0){ elemento01.pontoY += ultrapassagemY;}
                if(distanciaAtualY < 0){ elemento01.pontoY -= ultrapassagemY;}    
            }else{
                if(distanciaAtualX > 0){ elemento01.pontoX += ultrapassagemX;}
                if(distanciaAtualX < 0){ elemento01.pontoX -= ultrapassagemX;} 
            }
        }
    }
    
// PONTOS ----------------------------------------------------------------------------------------------------------------------
function mortos(elemento01,elemento02,vestijos,disparos){
    
    var distanciaAtualX  = elemento01.pontoCentralX()   - elemento02.pontoCentralX();
    var distanciaAtualY  = elemento01.pontoCentralY()   - elemento02.pontoCentralY();
    var distanciaMinimaX = elemento01.metadeDaLargura() + elemento02.metadeDaLargura();
    var distanciaMinimaY = elemento01.metadeDaAltura()  + elemento02.metadeDaAltura();
        
    if( Math.abs(distanciaAtualX) < distanciaMinimaX && Math.abs(distanciaAtualY) < distanciaMinimaY){
        var ultrapassagemX = distanciaMinimaX - Math.abs(distanciaAtualX);
        var ultrapassagemY = distanciaMinimaY - Math.abs(distanciaAtualY);
        if(elemento01.vida > 0){
            elemento01.vida -= 1;
            var vest = new Vestijo(elemento01.pontoCentralX(),elemento01.pontoCentralY(),10,10);
            vestijos.push(vest);
            //Remove os disparos da tela
            disparos.pop();
        }else{
           elemento01.vivo = false;
           console.log("Morri..")
        }
        
        
    }
}