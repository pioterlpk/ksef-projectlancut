let invoices = {};

// Załaduj faktury z JSON
fetch("data/invoices.json")
  .then(res => res.json())
  .then(data => invoices = data)
  .catch(err => console.error("Błąd ładowania faktur:", err));

// Pokaż listę faktur danej jednostki
function showTab(unit) {
    const container = document.getElementById("content");
    container.innerHTML = "";

    if(!invoices[unit] || invoices[unit].length === 0) {
        container.innerHTML = "<p>Brak faktur dla tej jednostki.</p>";
        return;
    }

    invoices[unit].forEach((faktura, index) => {
        const div = document.createElement("div");
        div.classList.add("invoice-item");
        div.innerHTML = `<button onclick="showInvoice('${unit}', ${index})">${faktura.nr}</button>`;
        container.appendChild(div);
    });
}

// Pokaż pełną fakturę
function showInvoice(unit, index) {
    const container = document.getElementById("content");
    const f = invoices[unit][index];

    container.innerHTML = `
        <button onclick="showTab('${unit}')">← Powrót do listy</button>
        <div class="invoice-full">
            <img src="assets/logo.png" class="invoice-logo">
            <h2>Faktura VAT nr: ${f.nr}</h2>
            <p><strong>Data wystawienia:</strong> ${f.data_wystawienia}</p>
            <p><strong>Data sprzedaży:</strong> ${f.data_sprzedazy}</p>

            <h3>Sprzedawca:</h3>
            <p>${f.sprzedawca.nazwa}</p>
            <p>${f.sprzedawca.adres}</p>
            <p>NIP: ${f.sprzedawca.nip}</p>

            <h3>Nabywca:</h3>
            <p>${f.nabywca.nazwa}</p>
            <p>${f.nabywca.adres}</p>
            <p>NIP: ${f.nabywca.nip}</p>

            <table>
                <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Nazwa towaru/usługi</th>
                        <th>Ilość</th>
                        <th>Jedn.</th>
                        <th>Cena jedn.</th>
                        <th>Wartość</th>
                    </tr>
                </thead>
                <tbody>
                    ${f.pozycje.map((p, i) => `
                        <tr>
                            <td>${i+1}</td>
                            <td>${p.nazwa}</td>
                            <td>${p.ilosc}</td>
                            <td>${p.jednostka}</td>
                            <td>${p.cena_jedn}</td>
                            <td>${p.wartosc}</td>
                        </tr>`).join('')}
                </tbody>
            </table>

            <p><strong>Suma netto:</strong> ${f.suma_netto} PLN</p>
            <p><strong>VAT:</strong> ${f.vat} PLN</p>
            <p><strong>Suma brutto:</strong> ${f.suma_brutto} PLN</p>
            <p><strong>Uwagi:</strong> ${f.uwagi}</p>
            <p><strong>Forma płatności:</strong> ${f.forma_platnosci}</p>
        </div>
    `;
}