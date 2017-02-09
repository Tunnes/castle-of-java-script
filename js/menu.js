function telaMenu(){
        fonteTema();
        var canvas = document.getElementById("telaDoJogo");
            canvas.width = document.documentElement.clientWidth - 10;
        var contexto = canvas.getContext("2d");
            contexto.clearRect(0,0,canvas.width,canvas.height);
       
         // teste com a imagem maneira.
       
        // var background = new Image();
        //     background = img.menu_background;
        //     contexto.drawImage(background, ((canvas.width/2) - 287), 300);

        function exibirCamada01(){    
            // contexto.font = "100px VT323";
            // contexto.fillStyle = "white";
            // contexto.textAlign="center"; 
            // contexto.fillText("FATEC ISOLATION", canvas.width/2, 100);
            
            contexto.font = "20px VT323";
            contexto.fillStyle = "white";
            contexto.textAlign="center"; 
            contexto.fillText("PRESSIONE ENTER PARA INICIAR", canvas.width/2, 400);
        }
        
         var controles = new Image();
            controles.src = img.controles;
            // var centro =  (canvas.width/ - 400):
            contexto.drawImage(controles, ((canvas.width/2) - 420), 40);
        // contexto.drawImage(controles, ((canvas.width/2) - 287), 300);
        window.addEventListener("keyup", function(tecla){
            document.getElementById('teste').style.display = "none"
            tecla.keyCode == 13 ? main() : null;
        });
       
        
        exibirCamada01();
    }