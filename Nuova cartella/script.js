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

///// POST
function modaleCrea()
{
    document.getElementById('aggiungiProdottoForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita il comportamento di default del form
    
    // Ottieni i valori dei campi del form
    var marca = document.getElementById('marca').value;
    var nome = document.getElementById('nome').value;
    var prezzo = document.getElementById('prezzo').value;
  
    // Crea un oggetto con i dati del nuovo prodotto
    var nuovoProdotto = {
      marca: marca,
      nome: nome,
      prezzo: prezzo
    };
  
    // Esegui una chiamata POST al server per aggiungere il nuovo prodotto
    fetch('http://localhost:8881/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuovoProdotto)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta API');
      }
      return response.json();
    })
    .then(data => {
      // Aggiorna la tabella con i nuovi dati
      FetchAll(); // Ricarica i dati della tabella dopo l'aggiunta del prodotto
      $('#aggiungiProdottoModal').modal('hide'); // Chiudi il modal dopo l'aggiunta del prodotto
    })
    .catch(error => {
      console.error("Errore durante l'aggiunta del prodotto:", error);
    });
  });
  
  document.getElementById('aggiungiProdottoForm').addEventListener('click', function() {
    $('#aggiungiProdottoModal').modal('show'); // Mostra il modal per aggiungere un prodotto
});

}
/////Post
function FetchAll() {
    const option = {
        method: 'GET'
    };

    fetch('http://localhost:8881/products', option)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta API');
            }
            return response.text();
        })
        .then((t) => { 
            popolaTabella(t);
            modaleCrea(); 
        })
        .catch(error => {
            console.error("Errore durante la richiesta API:", error);
        });


}

FetchAll();

