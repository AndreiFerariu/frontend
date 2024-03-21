// Funzione per eseguire una richiesta GET al server
function getResponseFromServer() {
  fetch('http://localhost:8888/products')
      .then(response => response.json())
      .then(data => {
          // Aggiorna la tabella nel DOM con i dati ricevuti dal server
          const tableBody = document.querySelector('tbody');

          // Rimuovi le righe esistenti dalla tabella
          tableBody.innerHTML = '';

          // Itera sui dati ricevuti e crea una riga per ogni record
          data.forEach(product => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${product.id}</td>
                  <td>${product.marca}</td>
                  <td>${product.nome}</td>
                  <td>${product.prezzo}</td>
                  <td>
                      <a href="#" data-toggle="modal" data-target="#showModal" data-id="${product.id}">Show</a>
                      <a href="#" data-toggle="modal" data-target="#editModal">Edit</a>
                      <a href="#" data-toggle="modal" data-target="#deleteModal">Delete</a>
                  </td>
              `;
              tableBody.appendChild(row);
          });
      }).catch(error => console.error('Errore:', error));
}

// Esegui la richiesta GET al caricamento della pagina
window.onload = getResponseFromServer;

