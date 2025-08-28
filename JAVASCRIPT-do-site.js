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
    // Mapa Leaflet centralizado em Jardim Elvira
    // =========================
    const map = L.map("mapaGoogle").setView([-23.5265, -46.7970], 15); // Coordenadas centrais do bairro
  
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
      
    ];
  
    pontosReciclagem.forEach((ponto) => {
      const conteudoPopup = `
        <div>
          <h5>♻️ ${ponto.nome}</h5>
          <p><strong>Endereço:</strong> ${ponto.endereco}</p>
          <p><strong>Telefone:</strong> ${ponto.telefone}</p>
          ${ponto.imagem ? `<img src="${ponto.imagem}" alt="${ponto.nome}" style="width:100px;height:auto;">` : ''}
        </div>
      `;
      L.marker([ponto.lat, ponto.lng])
        .addTo(map)
        .bindPopup(conteudoPopup);
    });
  
    // =========================
    // Sua Localização
    // =========================
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
    } else {
      console.log("Geolocalização não é suportada neste navegador.");
    }
  });
  
