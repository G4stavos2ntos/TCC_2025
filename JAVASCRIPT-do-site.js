document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // MODO ACESSÍVEL
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
  // MAPA
  // =========================
  const mapaElemento = document.getElementById("mapaGoogle");
  if (mapaElemento) {
    const map = L.map("mapaGoogle").setView([-23.5200, -46.8000], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const pontosReciclagem = [
      { lat: -23.5056746, lng: -46.7978832, nome: "Praça Pastor José Maria da Silva", endereco: "R. Pastor José Maria da Silva, 33 - Jardim Elvira, Osasco - SP" },
      { lat: -23.4993286, lng: -46.8152642, nome: "EcoPonto Jardim Elvira", endereco: "Av. João de Andrade, 500 - Jardim Elvira, Osasco - SP" },
    ];

    pontosReciclagem.forEach((ponto) => {
      L.marker([ponto.lat, ponto.lng])
        .addTo(map)
        .bindPopup(`<b>${ponto.nome}</b><br>${ponto.endereco}`);
    });

    // Se o mapa estiver dentro de um container que pode estar escondido inicialmente
    setTimeout(() => {
      map.invalidateSize();
    }, 200); // pequeno delay para garantir que o container está renderizado
  }

});
