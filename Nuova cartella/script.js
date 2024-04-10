function generaTabella(datiTabella) {
    var tabellaBody = document.getElementById("tableBody");
    tabellaBody.innerHTML = '';
    
    datiTabella.forEach(function (record) {
        var row = document.createElement("tr");

        var idCell = document.createElement("td");
        idCell.textContent = record.id;

        var marcaCell = document.createElement("td");
        marcaCell.textContent = record.attributes.marca;
        
        var nomeCell = document.createElement("td");
        nomeCell.textContent = record.attributes.nome;

        var prezzoCell = document.createElement("td");
        prezzoCell.textContent = record.attributes.prezzo;

        var azioniCell = document.createElement("td");

        var btnShow = document.createElement("button");
        btnShow.textContent = "Show";
        btnShow.classList.add("btn", "btn-info", "btn-sm", "me-1");

        var btnModifica = document.createElement("button");
        btnModifica.textContent = "Modifica";
        btnModifica.classList.add("btn", "btn-info", "btn-sm", "me-1");

        var btnElimina = document.createElement("button");
        btnElimina.textContent = "Elimina";
        btnElimina.classList.add("btn", "btn-danger", "btn-sm");

        row.appendChild(idCell);
        row.appendChild(marcaCell);
        row.appendChild(prezzoCell);
        row.appendChild(nomeCell)
        row.appendChild(azioniCell);

        tabellaBody.appendChild(row);
        azioniCell.appendChild(btnShow);
        azioniCell.appendChild(btnModifica);
        azioniCell.appendChild(btnElimina);
    });
}


function popolaTabella(jsonData) {
    try {
        var datiTabella = JSON.parse(jsonData)["data"];
        generaTabella(datiTabella);

        var btnAzioneGenerale = document.getElementById("tabella");
        btnAzioneGenerale.addEventListener("click", null);
    } catch (error) {
        console.error("Errore durante il popolamento della tabella:", error);
    }
}

function FetchAll() {
    const option = {
        method: 'GET'
    };

    fetch('http://localhost:8003/products', option)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.text();
        })
        .then((t) => { 
            popolaTabella(t); 
        })
        .catch(error => {
            console.error("Errore durante la richiesta API:", error);
        });


}

FetchAll();

