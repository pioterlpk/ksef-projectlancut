let invoices = {}; // załadujemy faktury z JSON

// Załaduj JSON z fakturami
fetch("data/invoices.json")
  .then(response => response.json())
  .then(data => invoices = data)
  .catch(err => console.error("Błąd ładowania faktur:", err));

// Funkcja przełączania zakładek
function showTab(unit) {
    const container = document.getElementById("content");
    container.innerHTML = "";

    if(!invoices[unit] || invoices[unit].length === 0) {
        container.innerHTML = "<p>Brak faktur dla tej jednostki.</p>";
        return;
    }

    invoices[unit].forEach(faktura => {
        const div = document.createElement("div");
        div.classList.add("invoice");
        div.innerHTML = `
            <h3>Faktura: ${faktura.nr}</h3>
            <p>Data: ${faktura.data}</p>
            <p>Kwota: ${faktura.kwota} PLN</p>
            <p>Opis: ${faktura.opis}</p>
        `;
        container.appendChild(div);
    });
}