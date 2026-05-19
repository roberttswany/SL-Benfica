document.addEventListener("DOMContentLoaded", function () {
  // Ex. 48 — Mensagem de boas-vindas
  if (!localStorage.getItem("jaVisitou")) {
    alert("Bem-vindo ao site oficial do SL Benfica!");
    localStorage.setItem("jaVisitou", "sim");
  }

  // Ex. 49 — Loading screen
  const loadingScreen = document.getElementById("loading-screen");
  setTimeout(function () {
    loadingScreen.classList.add("escondido");
    setTimeout(function () {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000);

  // Ex. 40 — Filtro de notícias
  const botoes = document.querySelectorAll(".filtro-botao");
  const noticias = document.querySelectorAll(".card-noticia");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const categoria = botao.getAttribute("data-categoria");
      noticias.forEach((noticia) => {
        const catNoticia = noticia.getAttribute("data-categoria");
        if (categoria === "todas" || categoria === catNoticia) {
          noticia.classList.remove("oculto");
        } else {
          noticia.classList.add("oculto");
        }
      });
    });
  });

  // Ex. 41 — Modal jogadores
  const modal = document.querySelector(".modal");
  const modalConteudo = document.querySelector(".modal-conteudo");
  const modalFechar = document.querySelector(".modal-fechar");
  const modalNome = document.getElementById("modal-nome");
  const modalNumero = document.getElementById("modal-numero");
  const modalPosicao = document.getElementById("modal-posicao");
  const modalPais = document.getElementById("modal-pais");
  const modalIdade = document.getElementById("modal-idade");
  const modalBio = document.getElementById("modal-bio");

  function abrirModal(card) {
    modalNome.textContent = card.dataset.nome;
    modalNumero.textContent = "Nº " + card.dataset.numero;
    modalPosicao.textContent = card.dataset.posicao;
    modalPais.textContent = card.dataset.pais;
    modalIdade.textContent = card.dataset.idade + " anos";
    modalBio.textContent = card.dataset.bio;
    modal.classList.add("aberto");
  }

  function fecharModal() {
    modal.classList.remove("aberto");
  }

  document.querySelectorAll(".card-jogador").forEach(function (card) {
    card.addEventListener("click", function () {
      abrirModal(card);
    });
  });

  modalFechar.addEventListener("click", fecharModal);

  modal.addEventListener("click", function (e) {
    if (!modalConteudo.contains(e.target)) {
      fecharModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      fecharModal();
    }
  });

  // Ex. 43 — Contador
  const proximoJogo = new Date("2026-04-27T20:30:00").getTime();

  function atualizarContador() {
    const agora = new Date().getTime();
    const diferenca = proximoJogo - agora;

    if (diferenca <= 0) {
      document.getElementById("dias").textContent = "00";
      document.getElementById("horas").textContent = "00";
      document.getElementById("minutos").textContent = "00";
      document.getElementById("segundos").textContent = "00";
      return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    document.getElementById("dias").textContent = String(dias).padStart(2, "0");
    document.getElementById("horas").textContent = String(horas).padStart(
      2,
      "0",
    );
    document.getElementById("minutos").textContent = String(minutos).padStart(
      2,
      "0",
    );
    document.getElementById("segundos").textContent = String(segundos).padStart(
      2,
      "0",
    );
  }

  atualizarContador();
  setInterval(atualizarContador, 1000);

  // Ex. 44 — Timeline Intersection Observer
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visivel");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });

  // Ex. 45 — Botão voltar ao topo
  const btnTopo = document.getElementById("btn-topo");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      btnTopo.classList.add("visivel");
    } else {
      btnTopo.classList.remove("visivel");
    }
  });

  btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Ex. 46 — Smooth scroll na navegação
  const linksNav = document.querySelectorAll(".link-nav");

  linksNav.forEach((link) => {
    link.addEventListener("click", function (evento) {
      evento.preventDefault();
      const alvo = document.querySelector(this.getAttribute("href"));
      if (alvo) {
        window.scrollTo({
          top: alvo.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Ex. 47 — Destacar link ativo
  const seccoes = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollY = window.pageYOffset;

    seccoes.forEach((seccao) => {
      const topo = seccao.offsetTop - 100;
      const altura = seccao.offsetHeight;
      const id = seccao.getAttribute("id");

      if (scrollY >= topo && scrollY < topo + altura) {
        linksNav.forEach((link) => link.classList.remove("ativo"));
        const linkAtivo = document.querySelector(`.link-nav[href="#${id}"]`);
        if (linkAtivo) linkAtivo.classList.add("ativo");
      }
    });
  });
});
