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
    // Mapa Leaflet
    // =========================
    const map = L.map("mapaGoogle").setView([-23.5329, -46.7915], 13);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  
    // =========================
    // Pontos de Coleta Reais
    // =========================
    const pontosReciclagem = [
      {
        lat: -23.5325,
        lng: -46.7915,
        nome: "Ecoponto Helena Maria",
        endereco: "Av. Walt Disney / R. Belmiro Alves da Silva, Jardim Elvira",
        telefone: "(11) 3699-9999",
        imagem: "imagens/ecoponto_helena_maria.jpg",
      },
      {
        lat: -23.5330,
        lng: -46.7920,
        nome: "GC Coletas de Óleos Vegetais",
        endereco: "Rua Frei Vicente Salvador, 65, Jardim Elvira",
        telefone: "(11) 3696-9993",
        imagem: "imagens/gc_coletas.jpg",
      },
      {
        lat: -23.5340,
        lng: -46.7930,
        nome: "Ecoponto Jaguaribe",
        endereco: "Rua Fernando Miolin Filho, nº 150, Jaguaribe",
        telefone: "(11) 3698-8888",
        imagem: "imagens/ecoponto_jaguaribe.jpg",
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
  
          // Centraliza no usuário
          map.setView([lat, lng], 15);
  
          // Marcador da sua localização
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
  