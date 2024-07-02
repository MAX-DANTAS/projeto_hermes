//#region Abrir ou fechar lateral responsivo
const menu = document.querySelector('.menu');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
  menu.classList.toggle('ativo');
  NavMenu.classList.toggle('ativo');
});
//#endregion

document.addEventListener('DOMContentLoaded', () => {

  //#region Card aparecer gradativamente com fade in
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Para observar apenas uma vez
      }
    });
  }, {
    threshold: 0.1 // Quando 10% do elemento estiver visível
  });

  cards.forEach(card => {
    observer.observe(card);
  });
  //#endregion    
});

document.addEventListener('DOMContentLoaded', (event) => {
  const modal = document.getElementById('location-modal');
  const link = document.getElementById('localizacao-link');
  const closeBtn = document.querySelector('.close-btn');

  link.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});


//#region Seleção de elementos <h1> e criação de gráficos
const titulos = document.getElementsByTagName('h1');

for (let i = 0; i < titulos.length; i++) {
  const titulo = titulos[i];

  // Verifica o conteúdo de cada <h1> usando uma estrutura if
  if (titulo.textContent === 'Posicionador Digital FY400') {
    createChart('monitoringChart', 'line', ['psi'], 'Pressão (em psi)', 0, 160, 1000, 60, 120); // Intervalo de 0 a 160 psi
  } else if (titulo.textContent === 'Spira-trol') {
    createChart('monitoringChart', 'line', ['°C'], 'Temperatura (em C°)', 0, 120, 1000, 70, 100); // Intervalo de 20 a 100 °C
  } else if (titulo.textContent === 'FY301') {
    createChart('monitoringChart', 'line', ['m/s²'], 'Viscosidade (em m/s²)', 0, 2, 1000, 0.5, 0.8);
  } else if (titulo.textContent === 'ZJHPM') {
    createChart('monitoringChart', 'line', ['psi'], 'Pressão (em psi)', 0, 180, 1000, 50, 162);
  } else if (titulo.textContent === 'FM250') {
    createChart('monitoringChart', 'line', ['m/s³'], 'Vazão (em m/s³)', 0, 1000, 1000, 150, 300);
  } else if (titulo.textContent === 'LD301') {
    createChart('monitoringChart', 'line', ['°C'], 'Temperatura (em C°)', 0, 120, 1000, 70, 100);
  }
}

function createChart(chartId, type, labels, yAxisLabel, yAxisMin, yAxisMax, updateInterval, randomMin, randomMax) {
  const ctx = document.getElementById(chartId).getContext('2d');

  let monitoringChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'Valor Monitorado',
        data: [],
        borderColor: '#006cc5',
        borderWidth: 5,
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'Tempo'
          }
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel
          },
          min: yAxisMin,
          max: yAxisMax
        }
      }
    }
  });

  // Função para gerar um valor aleatório e atualizar o gráfico
  function updateChart() {
    const currentTime = new Date().toLocaleTimeString();
    const randomValue = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;

    monitoringChart.data.labels.push(currentTime);
    monitoringChart.data.datasets[0].data.push(randomValue);

    if (monitoringChart.data.labels.length > 10) {
      monitoringChart.data.labels.shift();
      monitoringChart.data.datasets[0].data.shift();
    }

    monitoringChart.update();
    document.querySelector('.resultado').innerHTML = randomValue + " " + yAxisLabel; // Atualiza o valor exibido
  }

  // Inicia o intervalo de atualização
  let intervalId = setInterval(updateChart, updateInterval);

  document.getElementById("atualizacao").addEventListener("change", function (e) {
    updateInterval = parseInt(e.target.value); // Captura o valor selecionado em milissegundos
    clearInterval(intervalId); // Limpa o intervalo anterior
    intervalId = setInterval(updateChart, updateInterval); // Define um novo intervalo de atualização
  });
}
//#endregion
