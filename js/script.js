window.addEventListener('scroll', function () {
  const voltarTopoBtn = document.querySelector('.voltarTopo');
  if (window.scrollY > 50) {
    voltarTopoBtn.classList.add('scrolled');
  } else {
    voltarTopoBtn.classList.remove('scrolled');
  }
});

const slides = [
  {
    img: "./assets/slide-dentista1.png",
    paragrafo: `"Após aplicar a metodologia DHT, meu faturamento triplicou em apenas 30 dias. 
            A transformação foi incrível – consegui aumentar meus valores de forma consistente e estruturada.
            Agora trabalho com menos pacientes, mas com casos de maior valor agregado..."`,
    nome: "Dr. Andressa Matos"
  },
  {
    img: "./assets/slide-dentista2.png",
    paragrafo: `"De R$30k para R$120k mensais com a metodologia DHT. 
            Consegui escalar minha clínica de forma previsível e sustentável."`,
    nome: "Dr. Alberto Ferreira"
  },
  {
    img: "./assets/slide-dentista3.png",
    paragrafo: `"Como aumentei meu faturamento em 300% em 6 meses, atendendo menos pacientes e 
            focando em qualidade de atendimento."`,
    nome: "Dr. Clara Santos"
  }
];

let currentSlide = 0;

const imgEl = document.getElementById("slide-img");
const paragrafoEl = document.getElementById("slide-paragrafo");
const nomeEl = document.getElementById("slide-nome");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  currentSlide = index;

  imgEl.src = slides[index].img;
  paragrafoEl.textContent = slides[index].paragrafo;
  nomeEl.textContent = slides[index].nome;

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

document.querySelector(".btn-next").addEventListener("click", () => {
  let next = (currentSlide + 1) % slides.length;
  showSlide(next);
});

document.querySelector(".btn-prev").addEventListener("click", () => {
  let prev = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(prev);
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

showSlide(0);

let etapaAtual = 1;
const totalEtapas = 4;

function validarEtapa() {
  if (etapaAtual === 1) {
    const nome = document.getElementById("nome").value.trim();
    if (!nome.includes(" ")) {
      alert("Por favor, insira seu nome completo.");
      return false;
    }
  }
  if (etapaAtual === 2) {
    const email = document.getElementById("email").value.trim();
    if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, insira um e-mail válido.");
      return false;
    }
  }
  if (etapaAtual === 3) {
    const telefone = document.getElementById("telefone").value.trim();
    const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!regexTelefone.test(telefone)) {
      alert("Por favor, insira um número de WhatsApp válido. Ex: (11) 98888-7777");
      return false;
    }
  }
  return true;
}

function proximaEtapa() {
  if (!validarEtapa()) return;

  if (etapaAtual < totalEtapas) {
    document.querySelector(`.etapa[data-etapa="${etapaAtual}"]`).classList.add("hidden");
    etapaAtual++;
    document.querySelector(`.etapa[data-etapa="${etapaAtual}"]`).classList.remove("hidden");
    atualizarProgresso();
  }
}

function voltarEtapa() {
  if (etapaAtual > 1) {
    document.querySelector(`.etapa[data-etapa="${etapaAtual}"]`).classList.add("hidden");
    etapaAtual--;
    document.querySelector(`.etapa[data-etapa="${etapaAtual}"]`).classList.remove("hidden");
    atualizarProgresso();
  }
}

function atualizarProgresso() {
  document.getElementById("etapaAtual").textContent = etapaAtual;
  let porcentagem = (etapaAtual / totalEtapas) * 100;
  document.getElementById("progressoPorcentagem").textContent = porcentagem + "%";
  document.getElementById("progress").style.width = porcentagem + "%";
}

document.getElementById("multiForm").addEventListener("submit", function (e) {
  e.preventDefault();
  fetch(this.action, {
    method: this.method,
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      alert("Formulário enviado com sucesso!");
      this.reset();
      etapaAtual = 1;
      document.querySelectorAll(".etapa").forEach(e => e.classList.add("hidden"));
      document.querySelector('.etapa[data-etapa="1"]').classList.remove("hidden");
      atualizarProgresso();
    } else {
      alert("Erro ao enviar. Tente novamente.");
    }
  });
});

function trocarImagemMobile() {
  const passosImg = document.querySelector('.sobre__img');

  if (!passosImg) {
    console.error("Elemento .sobre__img não encontrado!");
    return;
  }

  const larguraTela = window.innerWidth;
  passosImg.src = (larguraTela <= 480)
    ? "./assets/passos-mobile.png"
    : "./assets/passos-desktop.png";
}

// dispara assim que o HTML estiver pronto
document.addEventListener('DOMContentLoaded', trocarImagemMobile);

// dispara ao redimensionar
window.addEventListener('resize', trocarImagemMobile);
