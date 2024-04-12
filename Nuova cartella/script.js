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
btnShow.onclick = function() {
    // Aggiungi qui il codice da eseguire quando viene cliccato il pulsante "Show"
};

var btnModifica = document.createElement("button");
btnModifica.textContent = "Modifica";
btnModifica.classList.add("btn", "btn-info", "btn-sm", "me-1");
btnModifica.onclick = function() {
    // Aggiungi qui il codice da eseguire quando viene cliccato il pulsante "Modifica"
};

var btnElimina = document.createElement("button");
btnElimina.textContent = "Elimina";
btnElimina.classList.add("btn", "btn-danger", "btn-sm");
btnElimina.onclick = function() {
    // Aggiungi qui il codice da eseguire quando viene cliccato il pulsante "Elimina"
};


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

        // Aggiungi un gestore di eventi per il click sul pulsante "Show"
        var btnShowElements = document.getElementsByClassName("btn-show");
        for (var i = 0; i < btnShowElements.length; i++) {
            btnShowElements[i].addEventListener("click", function() {
                // Recupera l'id del prodotto associato al pulsante cliccato
                var productId = this.getAttribute("data-product-id");
                
                // Recupera le informazioni del prodotto corrispondente
                var product = datiTabella.find(function(item) {
                    return item.id == productId;
                });

                // Popola il form modale con le informazioni del prodotto
                document.getElementById("showModalTitle").innerText = "Dettagli Prodotto";
                document.getElementById("showMarca").innerText = "Marca: " + product.attributes.marca;
                document.getElementById("showNome").innerText = "Nome: " + product.attributes.nome;
                document.getElementById("showPrezzo").innerText = "Prezzo: " + product.attributes.prezzo;

                // Visualizza il form modale
                var modal = new bootstrap.Modal(document.getElementById("showModal"));
                modal.show();
            });
        }
    } catch (error) {
        console.error("Errore durante il popolamento della tabella:", error);
    }
}


function FetchAll() {
    const option = {
        method: 'GET'
    };

    fetch('http://localhost:8888/products', option)
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
