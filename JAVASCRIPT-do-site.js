document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // MODO ACESSÍVEL
  // =========================
  const botao = document.getElementById("acessibilidadeToggle");
  const body = document.body;

  // Função para atualizar o estilo do botão
  function atualizarBotao() {
    const ativo = body.getAttribute("data-acessivel") === "true";
    if (ativo) {
      botao.classList.add("ativo");
    } else {
      botao.classList.remove("ativo");
    }
  }

  // Carrega o estado salvo no localStorage
  const salvo = localStorage.getItem("modoAcessivel") === "true";
  if (salvo) {
    body.setAttribute("data-acessivel", "true");
  } else {
    body.setAttribute("data-acessivel", "false");
  }
  atualizarBotao();

  // Escuta o clique no botão
  if (botao) {
    botao.addEventListener("click", () => {
      const atual = body.getAttribute("data-acessivel") === "true";
      body.setAttribute("data-acessivel", !atual);
      localStorage.setItem("modoAcessivel", String(!atual));
      atualizarBotao();
    });
  }



  // =========================
  // MAPA
  // =========================

  // Inicializa o mapa vazio em uma posição padrão
  var map = L.map("mapid").setView([-23.52, -46.8], 13);

  // Camada base do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Variável para armazenar o marcador do usuário
  var userMarker = null;

  // Arrays de pontos
  const pontosReciclagem = [
    {
      lat: -23.49903,
      lng: -46.798947,
      nome: "Praça Pastor José Maria da Silva",
      endereco:
        "R. Pastor José Maria da Silva, 33 - Jardim Elvira, Osasco - SP",
    },
    {
      lat: -23.4993286,
      lng: -46.8152642,
      nome: "EcoPonto Jardim Elvira",
      endereco: "Av. João de Andrade, 500 - Jardim Elvira, Osasco - SP",
    },
  ];

  const pontosDoacao = [
    {
      lat: -23.510123,
      lng: -46.800456,
      nome: "ONG Exemplo 1",
      endereco: "R. Exemplo, 100 - Osasco, SP",
    },
    {
      lat: -23.515789,
      lng: -46.810123,
      nome: "ONG Exemplo 2",
      endereco: "Av. Exemplo, 200 - Osasco, SP",
    },
  ];

  // Função para mostrar pontos no mapa
  function mostrarPontos(pontos) {
    pontos.forEach((ponto) => {
      L.marker([ponto.lat, ponto.lng])
        .addTo(map)
        .bindPopup(`<b>${ponto.nome}</b><br>${ponto.endereco}`);
    });
  }

  // Função chamada quando a posição é encontrada
  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    console.log("Localização atual:", lat, lng);

    if (!userMarker) {
      userMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 Você está aqui!")
        .openPopup();

      map.setView([lat, lng], 15);
    } else {
      userMarker.setLatLng([lat, lng]);
    }
  }

  // Função chamada se der erro
  function error(err) {
    console.warn("Erro ao obter localização:", err);
  }

  // Ativa o rastreamento em tempo real
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  });

  // Detecta qual página está aberta e mostra os pontos correspondentes
  const pagina = window.location.pathname.split("/").pop(); // pega o nome do HTML
  if (pagina === "RECICLAGEM.html") {
    mostrarPontos(pontosReciclagem);
  } else if (pagina === "DOACAO.html") {
    mostrarPontos(pontosDoacao);
  }
});
