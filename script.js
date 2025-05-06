let setores = [];
let angulos = [];

document.getElementById("gerarBtn").addEventListener("click", gerarRoleta);
document.getElementById("girarBtn").addEventListener("click", girarRoleta);

function gerarRoleta() {
  const quantidade = parseInt(document.getElementById("quantidade").value);
  if (quantidade < 2) {
    alert("Escolha pelo menos 2 opções.");
    return;
  }

  setores = Array.from({ length: quantidade }, (_, i) => i + 1);
  desenharRoleta();
  document.getElementById("resultado").innerText = "";
}

function desenharRoleta() {
  const canvas = document.getElementById("roleta");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const raio = w / 2;
  const anguloPorSetor = (2 * Math.PI) / setores.length;

  ctx.clearRect(0, 0, w, h);
  angulos = [];

  setores.forEach((num, i) => {
    const inicio = i * anguloPorSetor;
    const fim = inicio + anguloPorSetor;
    angulos.push({ inicio, fim });
  
    ctx.beginPath();
    ctx.moveTo(raio, raio);
    ctx.arc(raio, raio, raio, inicio, fim);
    ctx.fillStyle = `hsl(${(i * 360) / setores.length}, 80%, 70%)`;
    ctx.fill();
  
    const anguloTexto = inicio + anguloPorSetor / 2;
    const x = raio + Math.cos(anguloTexto) * (raio - 15);
    const y = raio + Math.sin(anguloTexto) * (raio - 15);
  
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(anguloTexto);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.font = "bold 14px Poppins";
    ctx.fillText(num, 0, 0);
    ctx.restore();
  });


  ctx.beginPath();
  ctx.moveTo(raio, 0);
  ctx.lineTo(raio - 10, -20);
  ctx.lineTo(raio + 10, -20);
  ctx.closePath();
  ctx.fillStyle = "#444";
  ctx.translate(0, 0);
}

function girarRoleta() {
  const canvas = document.getElementById("roleta");
  const ctx = canvas.getContext("2d");
  const raio = canvas.width / 2;

  let anguloAtual = 0;
  let velocidade = Math.random() * 0.1 + 0.3;
  const desaceleracao = 0.985;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(raio, raio);
    ctx.rotate(anguloAtual);
    ctx.translate(-raio, -raio);
    desenharRoleta();
    ctx.restore();

    anguloAtual += velocidade;
    velocidade *= desaceleracao;

    if (velocidade > 0.002) {
      requestAnimationFrame(animar);
    } else {
      // const anguloFinal = anguloAtual % (2 * Math.PI);
      // const setorIndex = angulos.findIndex(a => anguloFinal >= a.inicio && anguloFinal < a.fim);
      // const resultado = setores[setorIndex >= 0 ? setorIndex : setores.length - 1];
      // document.getElementById("resultado").innerText = `Número sorteado: ${resultado}`;
    }
  }

  animar();
}
