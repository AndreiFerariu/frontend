$(document).ready(function() {
    $('#aggiungiProdottoForm').submit(function(event) {
      // Impedisci il comportamento predefinito del modulo
      event.preventDefault();
      
      // Ottieni i valori dai campi del modulo
      var marca = $('#marca').val();
      var nome = $('#nome').val();
      var prezzo = $('#prezzo').val();
  
      // Effettua una richiesta AJAX di tipo POST
      $.ajax({
        url: 'http://localhost:8888/products',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          "data": {
            "type": "products",
            "attributes": {
              "marca": marca,
              "nome": nome,
              "prezzo": prezzo
            }
          }
        }),
        success: function(response) {
          // Aggiungi il nuovo prodotto alla tabella
          generaTabella([response.data]);
  
          // Nascondi il modale dopo aver aggiunto il prodotto
          $('#aggiungiProdottoModal').modal('hide');
        },
        error: function(xhr, status, error) {
          console.error('Errore nella richiesta API:', error);
          // Gestisci eventuali errori qui
        }
      });
    });
});
function generaTabella(datiTabella) {
    var tabellaBody = $('#tableBody');
    
    datiTabella.forEach(function (record) {
        var row = $('<tr>');

        var idCell = $('<td>').text(record.id);
        var marcaCell = $('<td>').text(record.attributes.marca);
        var nomeCell = $('<td>').text(record.attributes.nome);
        var prezzoCell = $('<td>').text(record.attributes.prezzo);

        var azioniCell = $('<td>');

        var btnShow = $('<button>').text("Show").addClass("btn btn-info btn-sm me-1");
        var btnModifica = $('<button>').text("Modifica").addClass("btn btn-info btn-sm me-1");
        var btnElimina = $('<button>').text("Elimina").addClass("btn btn-danger btn-sm");

        row.append(idCell, marcaCell, nomeCell, prezzoCell, azioniCell);
        azioniCell.append(btnShow, btnModifica, btnElimina);

        tabellaBody.append(row);
    });
}

