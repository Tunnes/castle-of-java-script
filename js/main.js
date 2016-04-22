var bloco;

function iniciarGame() {
        telaPrincipal.comecar();
        bloco = new criarComponentes(30, 30, "red", 10, 120);
}
//  Objeto telaPrincipal  
var telaPrincipal = {
    canvas : document.createElement("canvas"),
    // Começar recebe uma função anônima
    // Em POO podemos chamar que os elementos deste objeto
    // são como métodos, isso é idiota mais exemplifica melhor.
    //
    comecar : function() {
        //--Uso o this pois preciso acessar de outros lugares.
            this.canvas.width  = 480;
            this.canvas.height = 270;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        //--Para controlar os 'Frames' do game vou usar o setInterval
            this.interval = setInterval(atualizaTelaPrincipal, 20);
            
        //--Movimentos pelo teclado
            window.addEventListener('keydown',function(x){
                telaPrincipal.key = x.keyCode;
            })
            window.addEventListener('keyup',function(x){
                telaPrincipal.key = x.keyCode;
            })
    },
    limpar : function(){
        //--Isso vai limpar o mapaPrincipal
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

function criarComponentes(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.atualiza = function(){
        var ctx = telaPrincipal.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
            
    };
    this.nova
}
function atualizaTelaPrincipal(){
    telaPrincipal.limpar();
    bloco.x += 1;
    bloco.atualiza();
};
