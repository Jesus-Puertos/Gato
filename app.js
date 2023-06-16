const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const platformCanvas = document.getElementById("platform-canvas");
const platformCtx = platformCanvas.getContext("2d");

canvas.width = 350;
canvas.height = 720;

const gravity = 0.5;

let puntaje = 1;

let limite = 0;

let meta;

let pause = false;

var audioPlayer = document.getElementById("audioPlayer");

function pausar() {
  if (pause) {
    pause = false;
  } else pause = true;
}

// Variables para los controles táctiles
let touchStartX = 0;
let touchMoveX = 0;

// Funciones de control táctil
function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchMoveX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const touchDistance = touchMoveX - touchStartX;

  if (touchDistance > 0) {
    // Mover hacia la derecha
    x += 12;
  } else if (touchDistance < 0) {
    // Mover hacia la izquierda
    x -= 12;
  }

  if (x > 300) x = 0;
  if (x < 0) x = 300;

  touchStartX = 0;
  touchMoveX = 0;
}

// Asignar eventos táctiles a los controles del juego
canvas.addEventListener("touchstart", handleTouchStart);
canvas.addEventListener("touchmove", handleTouchMove);
canvas.addEventListener("touchend", handleTouchEnd);

function pedirDineroAhorrar() {
  Swal.fire({
    title: "¿Cuánto dinero quieres ahorrar?",
    input: "text",
    inputLabel: "Ingresa el dinero a ahorrar : ",
    inputPlaceholder: "Ejemplo: 500",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Aceptar",
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value || isNaN(parseFloat(value)) || parseFloat(value) === 1) {
        return "Ingresa un número válido diferente de 1";
      }
      if (!value || parseFloat(value) === 0) {
        return "Ingresa un número que no sea 0";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      meta = parseFloat(result.value);
      iniciarJuego();
    }
  });
}
function iniciarJuego() {
  class Estrella {
    constructor(x, y, v, ctx) {
      this.x = x;
      this.y = y;
      this.v = v;
      this.ctx = ctx;
    }

    imprimir() {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.drawImage(dinero, this.x, this.y);
      ctx.closePath();
      ctx.fill();
      if (pause) return;

      if (this.y >= 600) {
        this.y = 0;
        this.x = this.getNewXPosition(); // Obtener una nueva posición x
      }

      this.y = this.y + this.v;
      if (this.y >= 600) limite++;
    }

    getNewXPosition() {
      const minDistance = 50; // Distancia mínima entre estrellas en el eje x
      let newX = Math.random() * 350;

      // Verificar la distancia mínima con las estrellas existentes
      while (Math.abs(newX - this.x) < minDistance) {
        newX = Math.random() * 350;
      }

      return newX;
    }
  }

  class Moneda {
    constructor(x, y, v, ctx) {
      this.x = x;
      this.y = y;
      this.v = v;
      this.ctx = ctx;
    }

    imprimir() {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.drawImage(moneda1, this.x, this.y);
      ctx.closePath();
      ctx.fill();
      if (pause) return;
      // Hara que la estrella caiga infinitamente en la posicion x con Math.random
      if (this.y >= 600) {
        this.y = 0;
        this.x = Math.random() * 350;
      }
      this.y = this.y + this.v;
      if (this.y >= 600) limite++;
    }
  }

  class Bolsa {
    constructor(x, y, v, ctx) {
      this.x = x;
      this.y = y;
      this.v = v;
      this.ctx = ctx;
    }

    imprimir() {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.drawImage(bolsa, this.x, this.y);
      ctx.closePath();
      ctx.fill();
      if (pause) return;
      // Hara que la estrella caiga infinitamente en la posicion x con Math.random
      if (this.y >= 600) {
        this.y = 0;
        this.x = Math.random() * 350;
      }
      this.y = this.y + this.v;
      if (this.y >= 600) limite++;
    }
  }

  class Gasto {
    constructor(x, y, v, ctx) {
      this.x = x;
      this.y = y;
      this.v = v;
      this.ctx = ctx;
    }

    imprimir() {
      // ctx.fillStyle = "red";
      ctx.beginPath();
      //ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
      ctx.drawImage(papas, this.x, this.y);
      ctx.closePath();
      ctx.fill();
      if (pause) return;

      // Hara que los objetos de gasto caigan infinitamente en la posicion x con Math.random
      if (this.y >= 600) {
        this.y = 0;
        this.x = Math.random() * 350;
      }
      this.y = this.y + this.v;
      if (this.y >= 600) return 0;
    }
  }

  var estrella = new Estrella(0, 0, 1.8, ctx);
  var moneda = new Moneda(10, 0, 1.2, ctx);
  //var bolsa1 = new Bolsa(275, 0, 3, ctx);
  var gasto = new Gasto(150, 0, 1.5, ctx);
  var gasto2 = new Gasto(325, 0, 1.8, ctx);

  const papas = new Image();
  papas.src = "/img/mandado.png";

  const bolsa = new Image();
  bolsa.src = "/img/bolsa20.png";

  const moneda1 = new Image();
  moneda1.src = "/img/moneda.png";

  const dinero = new Image();
  dinero.src = "/img/yoshi.png";

  var imagen = new Image();
  imagen.src = "/img/gato.png";

  var imagen2 = new Image();
  imagen2.src = "/img/gallina.png";

  // Cargar imagen de fondo
  var fondo = new Image();
  fondo.onload = function () {
    ctx.drawImage(fondo, 0, 0);
  };
  fondo.src = "../img/fondo de paint 2.jpg";

  var x = 120;
  var y = 500;

  var x2 = 180;
  var y2 = 500;

  var direccion = 0;

  animar();

  function animar() {
    // Dibujar imagen de fondo
    ctx.drawImage(fondo, 0, 0);

    estrella.imprimir();
    moneda.imprimir();
    //bolsa1.imprimir();
    gasto.imprimir();
    gasto2.imprimir();
    ctx.drawImage(imagen, x, y);
    audioPlayer.play();

    //ctx.drawImage(imagen2, x2, y2);
    // Dibujar las plataformas
    //ctx.drawImage(platformCanvas, 0, 0);

    // Verificar colisiones entre la estrella y los jugadores
    if (
      (x < estrella.x + 20 &&
        x + 54 > estrella.x &&
        y < estrella.y + 20 &&
        y + 54 > estrella.y) ||
      (x2 < estrella.x + 20 &&
        x2 + 54 > estrella.x &&
        y2 < estrella.y + 20 &&
        y2 + 54 > estrella.y)
    ) {
      puntaje += 10;
      estrella.x = Math.random() * 350;
      estrella.y = 0;
    }

    if (
      (x < moneda.x + 10 &&
        x + 64 > moneda.x &&
        y < moneda.y + 10 &&
        y + 64 > moneda.y) ||
      (x2 < moneda.x + 10 &&
        x2 + 64 > moneda.x &&
        y2 < moneda.y + 10 &&
        y2 + 64 > moneda.y)
    ) {
      puntaje += 1;
      moneda.x = Math.random() * 350;
      moneda.y = 0;
    }
    /*
    if (
      (x < bolsa1.x + 10 &&
        x + 64 > bolsa1.x &&
        y < bolsa1.y + 10 &&
        y + 64 > bolsa1.y) ||
      (x2 < bolsa1.x + 10 &&
        x2 + 64 > bolsa1.x &&
        y2 < bolsa1.y + 10 &&
        y2 + 64 > bolsa1.y)
    ) {
      puntaje += 20;
      bolsa1.x = Math.random() * 350;
      bolsa1.y = 0;
    }*/

    //Verifica si jugador toma objetos
    if (
      x < gasto.x + 10 &&
      x + 64 > gasto.x &&
      y < gasto.y + 10 &&
      y + 64 > gasto.y
    ) {
      puntaje -= 1;
      gasto.x = Math.random() * 350;
      gasto.y = 0;
    }

    if (
      x < gasto2.x + 10 &&
      x + 64 > gasto2.x &&
      y < gasto2.y + 10 &&
      y + 64 > gasto2.y
    ) {
      puntaje -= 1;
      gasto2.x = Math.random() * 350;
      gasto2.y = 0;
    }

    if (puntaje < 1) {
      ctx.globalAlpha = 0.5; // Transparencia del rectángulo negro
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1; // Restaurar la transparencia
      ctx.font = "15px Poppins";
      ctx.fillStyle = "white";
      ctx.textAlign = "center"; // Centrar horizontalmente
      ctx.textBaseline = "middle"; // Centrar verticalmente
      ctx.fillText(
        "Has perdido todos tus ahorros :(",
        canvas.width / 2,
        canvas.height / 2
      );
      // Detener el audio
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      return;
    }

    //checa el limite de monedas tiradas
    if (limite >= 8) {
      ctx.globalAlpha = 0.5; // Transparencia del rectángulo negro
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1; // Restaurar la transparencia
      ctx.font = "25px Poppins";
      ctx.fillStyle = "white";
      ctx.textAlign = "center"; // Centrar horizontalmente
      ctx.textBaseline = "middle"; // Centrar verticalmente
      ctx.fillText(
        "Tiraste muchas monedas",
        canvas.width / 2,
        canvas.height / 2
      );
      // Detener el audio
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      return;
    }

    //checa si ganaste
    if (puntaje >= meta) {
      Swal.fire({
        title: "¡Alcanzaste tu meta propuesta!",
        text: "¿Jugar de nuevo?",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          // Reiniciar la página
          location.reload();
        }
      });

      ctx.globalAlpha = 0.5; // Transparencia del rectángulo negro
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Detener el audio
      audioPlayer.pause();
      audioPlayer.currentTime = 0;

      return;
    }

    ctx.font = "15px Poppins";
    ctx.fillStyle = "black";
    ctx.textAlign = "rigth"; // Centrar horizontalmente

    ctx.fillText("Dinero ahorrado: " + puntaje + " / " + meta, 30, 20);

    ctx.font = "15px Poppins";
    ctx.fillStyle = "red";
    ctx.fillText("Dinero tirado: " + limite + " / 8", 30, 40);

    animationId = requestAnimationFrame(animar); // Volver a solicitar la animación
  }

  let KEY_CODE = {
    LEFT: 37,
    RIGHT: 39,
  };

  window.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
      case KEY_CODE.LEFT:
        x = x - 12;
        break;
      case KEY_CODE.RIGHT:
        x = x + 12;
        break;

      default:
        break;
    }

    if (x > 300) x = 0;
    if (x < 0) x = 300;

    /*switch (event.key) {
      case "a":
        x2 = x2 - 10;
        break;
      case "d":
        x2 = x2 + 10;
        break;
      default:
        break;
    }*/
  });
}
pedirDineroAhorrar();
