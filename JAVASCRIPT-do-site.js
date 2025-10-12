document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // MODO ACESSÍVEL
  // =========================
  const botao = document.getElementById("acessibilidadeToggle");
  const body = document.body;

  function atualizarBotao() {
    const ativo = body.getAttribute("data-acessivel") === "true";
    if (ativo) botao.classList.add("ativo");
    else botao.classList.remove("ativo");
  }

  const salvo = localStorage.getItem("modoAcessivel") === "true";
  if (salvo) body.setAttribute("data-acessivel", "true");
  else body.removeAttribute("data-acessivel");
  atualizarBotao();

  if (botao) {
    botao.addEventListener("click", () => {
      const ativo = body.getAttribute("data-acessivel") === "true";
      if (ativo) {
        body.removeAttribute("data-acessivel");
        localStorage.setItem("modoAcessivel", "false");
      } else {
        body.setAttribute("data-acessivel", "true");
        localStorage.setItem("modoAcessivel", "true");
      }
      atualizarBotao();
    });
  }

  // =========================
  // MAPA
  // =========================
  var map = L.map("mapid").setView([-23.52, -46.8], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  var userMarker = null;

  // =========================
  // Arrays de pontos fixos
  // =========================
  const pontosReciclagem = [
    {
      lat: -23.508101,
      lng: -46.784338,
      nome: "Ecoponto Jardim Mutinga",
      endereco: "Avenida Ônix, nº 783, Jardim Ayrosa, Osasco/SP",
      CEP: "06280-030",
    },
    {
      lat: -23.564634,
      lng: -46.794282,
      nome: "Ecoponto Novo Osasco",
      endereco:
        "Rua Theodoro de Souza Brandão, nº 1020, Novo Osasco, Osasco/SP",
      CEP: "06045-150",
    },
    {
      lat: -23.498848,
      lng: -46.784705,
      nome: "Ecoponto Baronesa",
      endereco:
        "Rua Duke Elington, nº 360, ao lado da Academia de Lutas, Osasco/SP",
      CEP: "06268-140",
    },
    {
      lat: -23.540736,
      lng: -46.801626,
      nome: "Ecoponto Vila Pestana",
      endereco: "Rua José Antônio Augusto, nº 55, Osasco/SP",
      CEP: "06170-170",
    },
    {
      lat: -23.499121,
      lng: -46.799076,
      nome: "Ecoponto Helena Maria",
      endereco:
        "Avenida Walt Disney, esquina com Rua Belmiro Alves da Silva, Jardim Elvira, Osasco/SP",
      CEP: "06253-060",
    },
    {
      lat: -23.56073,
      lng: -46.788969,
      nome: "Ecoponto Jaguaribe",
      endereco: "Rua Fernando Miolin Filho, nº 150, Jaguaribe, Osasco/SP",
      CEP: "06050-330",
    },
    {
      lat: -23.57053,
      lng: -46.807022,
      nome: "Ecoponto Veloso",
      endereco:
        "Rua Dr. Armando Anjo Corrêa Filho, nº 195 (esquina com Rua Alberto Lameu), Osasco/SP",
      CEP: "06150-500",
    },
    {
      lat: -23.540979,
      lng: -46.809095,
      nome: "Ecoponto Cidade das Flores",
      endereco: "Avenida Ipê, nº 527, ao lado da CEMEI Zaíra Colino, Osasco/SP",
      CEP: "06184-170",
    },
  ];

  const pontosDoacao = [
    {
      lat: -23.534632,
      lng: -46.774939,
      nome: "Fundo Social de Solidariedade – Prefeitura de Osasco",
      endereco:
        "Avenida Lázaro de Mello Brandão, 140 – Vila Campesina, Osasco/SP",
      telefone: "(11) 3652-9400",
    },
    {
      lat: -23.50153,
      lng: -46.774911,
      nome: "Bazar Beneficente Mercatudo – Casas André Luiz (Osasco)",
      endereco: "Avenida Presidente Médice, 1365 – Jardim Mutinga, Osasco/SP",
      telefones: "(11) 2459-7000 / (11) 2457-7733 / (11) 95427-3700",
    },
    {
      lat: -23.521151,
      lng: -46.780386,
      nome: "Lar “Jesus entre as Crianças”",
      endereco: "Rua João Kaufmann, 437 – Rochdale, Osasco/SP – CEP 06220-060",
      telefone: "(11) 3687-8261",
    },
  ];

  // =========================
  // Função para mostrar pontos no mapa
  // =========================
  function mostrarPontos(pontos) {
    pontos.forEach((ponto) => {
      L.marker([ponto.lat, ponto.lng])
        .addTo(map)
        .bindPopup(`<b>${ponto.nome}</b><br>${ponto.endereco || ""}`);
    });
  }

  // =========================
  // Mostrar pontos fixos primeiro
  // =========================
  const pagina = window.location.pathname.split("/").pop();
  if (pagina === "RECICLAGEM.html") mostrarPontos(pontosReciclagem);
  else if (pagina === "DOACAO.html") mostrarPontos(pontosDoacao);

  // =========================
  // Carregar pontos do banco via PHP
  // =========================
  let tipo =
    pagina === "RECICLAGEM.html"
      ? "reciclagem"
      : pagina === "DOACAO.html"
      ? "doacao"
      : "";

  if (tipo) {
    fetch(`db.php?tipo=${tipo}`)
      .then((res) => res.json())
      .then((dados) => {
        console.log("✅ Pontos do banco carregados:", dados);
        mostrarPontos(dados);
      })
      .catch((erro) =>
        console.error("❌ Erro ao carregar pontos do banco:", erro)
      );
  }

  // =========================
  // Geolocalização do usuário
  // =========================
  function success(pos) {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    if (!userMarker) {
      userMarker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup("📍 Você está aqui!")
        .openPopup();
      map.setView([lat, lng], 15);
    } else userMarker.setLatLng([lat, lng]);
  }

  function error(err) {
    console.warn("Erro ao obter localização:", err);
  }

  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
  });

  //PHP
  fetch("api/index.php?categoria=reciclagem")
    .then((r) => r.json())
    .then((data) => console.log(data));
});
