function telaMenu(){
        console.log("bugasso");
        fonteTema();
        var canvas = document.getElementById("telaDoJogo");
            canvas.width = document.documentElement.clientWidth - 10;
        var contexto = canvas.getContext("2d");
            contexto.clearRect(0,0,canvas.width,canvas.height);
        contexto.font = "100px VT323";
        contexto.fillStyle = "white";
        contexto.textAlign="center"; 
        contexto.fillText("FATEC ISOLATION", canvas.width/2, 100);
        
        contexto.font = "20px VT323";
        contexto.fillStyle = "white";
        contexto.textAlign="center"; 
        contexto.fillText("PRESSIONE ENTER PARA INICIAR", canvas.width/2, 200);
         var controles = new Image();
            controles.src = img.controles;
        
        contexto.drawImage(controles, ((canvas.width/2) - 287), 300);
        window.addEventListener("keyup", function(tecla){
            tecla.keyCode == 13 ? main() : null;
        });
    }