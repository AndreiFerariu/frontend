async function modaleCrea() {
  document.getElementById('aggiungiProdottoForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Evita il comportamento di default del form

      // Ottieni i valori dei campi del form
      var marca = document.getElementById('marca').value;
      var nome = document.getElementById('nome').value;
      var prezzo = document.getElementById('prezzo').value;

      // Crea un oggetto con i dati del nuovo prodotto
     
      // Esegui una chiamata POST al server per aggiungere il nuovo prodotto
      fetch('http://localhost:8003/products', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
        //  body: JSON.stringify(nuovoProdotto)
        body: JSON.stringify({"data": {"type": "products", "attributes": { "marca": marca, "nome" : nome, "prezzo": prezzo}}})
      })
      .then(response => {
        console.log(response);
          if (!response.ok) {
              throw new Error('Errore nella richiesta API');
          }
          return response.json();
      })
      document.getElementById('aggiungiProdottoModal').classList.remove('show');
      document.getElementById('aggiungiProdottoModal').classList.add('hide');
    
      /*.then(data => {
          // Chiudi il modal dopo l'aggiunta del prodotto
          var modal = document.getElementById('aggiungiProdottoModal');
          modal.style.display = 'none';
      })
      .catch(error => {
          console.error("Errore durante l'aggiunta del prodotto:", error);
      });*/
  });

  // Mostra il modal per aggiungere un prodotto
  var modal = document.getElementById('aggiungiProdottoModal');
  modal.style.display = 'block';
}

// Chiamata iniziale a modaleCrea() per mostrare il modale all'avvio
modaleCrea();
