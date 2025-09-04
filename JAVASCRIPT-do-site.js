document.addEventListener("DOMContentLoaded", function () {
  // =========================
  // Modo Acessível
  // =========================
  const botao = document.getElementById("acessibilidadeToggle");

  const salvo = localStorage.getItem("modoAcessivel") === "true";
  if (salvo) {
    document.body.setAttribute("data-acessivel", "true");
  }

  if (botao) {
    botao.addEventListener("click", () => {
      const atual = document.body.getAttribute("data-acessivel") === "true";
      document.body.setAttribute("data-acessivel", !atual);
      localStorage.setItem("modoAcessivel", String(!atual));
    });
  }

  // =========================
// Mapa Leaflet centralizado em Jardim Elvira e arredores
// =========================
const mapaElemento = document.getElementById("mapaGoogle");
if (mapaElemento) {
  const map = L.map("mapaGoogle").setView([-23.5200, -46.8000], 14); // Centralizado em uma área mais abrangente

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // =========================
  // Pontos de Reciclagem Precisos
  // =========================
  const pontosReciclagem = [
    {
      lat: -23.5056746,
      lng: -46.7978832,
      nome: "Praça Pastor José Maria da Silva",
      endereco: "R. Pastor José Maria da Silva, 33 - Jardim Elvira, Osasco - SP, 06243-320",
      telefone: "(11) 3699-9999",
      imagem: "imagens/praca_pastor_jose_maria.jpg",
    },
    {
      lat: -23.4965623,
      lng: -46.8014549,
      nome: "EcoPonto Jardim Elvira",
      endereco: "Av. João de Andrade, 500 - Jardim Elvira, Osasco - SP, 06243-000",
      telefone: "(11) 3688-8888",
      imagem: "imagens/ecoponto_jardim_elvira.jpg",
    },
    {
      lat: -23.528789,
      lng: -46.795321,
      nome: "Reciclagem Central",
      endereco: "R. Central, 120 - Jardim Elvira, Osasco - SP, 06243-200",
      telefone: "(11) 3677-7777",
      imagem: "imagens/reciclagem_central.jpg",
    },
    {
      lat: -23.530456,
      lng: -46.798654,
      nome: "Ponto Verde Jardim Elvira",
      endereco: "R. Verde, 45 - Jardim Elvira, Osasco - SP, 06243-150",
      telefone: "(11) 3666-6666",
      imagem: "imagens/ponto_verde.jpg",
    },
  ];

  pontosReciclagem.forEach((ponto) => {
    const conteudoPopup = `
      <div>
        <h5>♻️ ${ponto.nome}</h5>
        <p><strong>Endereço:</strong> ${ponto.endereco}</p>
        <p><strong>Telefone:</strong> ${ponto.telefone}</p>
        ${
          ponto.imagem
            ? `<img src="${ponto.imagem}" alt="${ponto.nome}" style="width:100px;height:auto;">`
            : ""
        }
      </div>
    `;
    L.marker([ponto.lat, ponto.lng]).addTo(map).bindPopup(conteudoPopup);
  });

  // =========================
  // Localização do usuário (ou fallback manual)
  // =========================
  const posicaoUsuario = { lat: -23.5200, lng: -46.8000 }; // Ponto central ajustado
  L.marker([posicaoUsuario.lat, posicaoUsuario.lng])
    .addTo(map)
    .bindPopup("📍 Ponto central de Jardim Elvira e arredores")
    .openPopup();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        map.setView([lat, lng], 15);

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("📍 Você está aqui!")
          .openPopup();
      },
      function (error) {
        console.error("Erro ao obter localização: ", error);
      }
    );
  }
} else {
  console.error('Elemento com id "mapaGoogle" não encontrado.');
}
});
