// chart.js
const ctx = document.getElementById('myChart');

new Chart(ctx, {
type: 'bar',
data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
    }]
},
options: {
    scales: {
    y: {
        beginAtZero: true
    }
    }
}
});

function classifyText() {
  const text = document.getElementById("inputText").value.trim();
  const resultDiv = document.getElementById("result");
  const resultText = document.getElementById("predictionText");

  if (!text) {
    alert("Masukkan teks terlebih dahulu!");
    return;
  }

  // Tampilkan loading sementara
  resultDiv.style.display = "block";
  resultText.innerHTML = "⏳ Memproses...";

  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text_input: text })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultText.innerHTML = `❌ ${data.error}`;
      } else {
        resultText.innerHTML = `<strong>${data.prediction}</strong>`;
      }
    })
    .catch(err => {
      resultText.innerHTML = `⚠️ Terjadi kesalahan: ${err}`;
    });
}
