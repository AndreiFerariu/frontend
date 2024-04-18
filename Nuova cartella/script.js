document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "http://127.0.0.1:8000/products";
    const productList = document.getElementById("productList");
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));

    if (!productList) {
        console.error("Error: productList element not found");
        return;
    }

    // Funzione per ottenere la lista dei prodotti dal server
    function getProducts() {
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error fetching products: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                productList.innerHTML = ""; // Pulisce la lista prima di aggiungere i nuovi elementi

                // Verifica se l'oggetto JSON restituito contiene la proprietà 'data' e se 'data' è un array
                if (data && Array.isArray(data.data)) {
                    data.data.forEach(product => {
                        // Costruisce la riga della tabella per ogni prodotto
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${product.id}</td>
                            <td>${product.attributes.marca}</td>
                            <td>${product.attributes.nome}</td>
                            <td>${product.attributes.prezzo}</td>
                            <td>
                                <button class="btn btn-primary" onclick="showProductDetails(${product.id})">Show</button>
                                <button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                            </td>
                        `;
                        productList.appendChild(row);
                    });
                } else {
                    console.error("Error fetching products: Invalid data format");
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }

    // Aggiunge un evento al click del bottone "Crea"
    const createButton = document.getElementById("createButton");
    createButton.addEventListener("click", openCreateModal);

    // Funzione per aprire il modal per la creazione di un nuovo prodotto
    function openCreateModal() {
        const modalContent = document.querySelector("#productModal .modal-content");
        modalContent.innerHTML = ""; // Pulisce il contenuto attuale del modal
    
        // Costruisce il form per la creazione del prodotto
        const formHTML = `
            <div class="modal-header">
                <h5 class="modal-title" id="productModalLabel">Create Product</h5>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeX">X</button>
            </div>
            <div class="modal-body">
                <form id="createForm">
                    <div class="mb-3">
                        <label for="marca" class="form-label">Marca</label>
                        <input type="text" class="form-control" id="marca">
                    </div>
                    <div class="mb-3">
                        <label for="modello" class="form-label">Modello</label>
                        <input type="text" class="form-control" id="modello">
                    </div>
                    <div class="mb-3">
                        <label for="prezzo" class="form-label">Prezzo</label>
                        <input type="text" class="form-control" id="prezzo">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancelButton">Cancel</button>
                <button type="button" class="btn btn-primary" id="saveButtonPost">Save</button>
            </div>
        `;
        modalContent.innerHTML = formHTML;
    
        // Visualizza il modal
        productModal.show();
    
        // Aggiunge un evento al click del bottone "Cancel" e del pulsante "X" per chiudere il modal
        const cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function() {
            clearFormInputs(); // Pulisce i campi del form
            productModal.hide(); // Chiude il modal
        });
    
        const closeButtonX = document.getElementById("closeX");
        closeButtonX.addEventListener("click", function() {
            clearFormInputs(); // Pulisce i campi del form
            productModal.hide(); // Chiude il modal
        });
    
        // Aggiunge un evento al click del bottone "Save"
        const saveButton = document.getElementById("saveButtonPost");
        saveButton.addEventListener("click", saveProduct);
    }
    
    // Funzione per pulire i campi del form
    function clearFormInputs() {
        document.getElementById("marca").value = "";
        document.getElementById("modello").value = "";
        document.getElementById("prezzo").value = "";
    }
    
    // Funzione per salvare un nuovo prodotto
    function saveProduct() {
        const marcaInput = document.getElementById("marca").value;
        const modelloInput = document.getElementById("modello").value;
        const prezzoInput = document.getElementById("prezzo").value;

        // Crea un oggetto con i dati del nuovo prodotto
        const productData = {
            marca: marcaInput,
            nome: modelloInput,
            prezzo: prezzoInput
        };

        // Effettua una richiesta POST al server per salvare il nuovo prodotto
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { attributes: productData }})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error saving product: " + response.statusText);
            }
            console.log("Product saved successfully");
            getProducts(); // Aggiorna la lista dei prodotti
            productModal.hide(); // Chiude il modal
            clearFormInputs(); // Pulisce i campi del form
        })
        .catch(error => {
            console.error("Error saving product:", error);
        });
    }

    // Funzione per visualizzare i dettagli di un prodotto
    window.showProductDetails = function(productId) {
        // Effettuiamo una richiesta GET per ottenere i dettagli del prodotto
        fetch(apiUrl + "/" + productId)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error fetching product details: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Popoliamo il modulo modale con i dettagli del prodotto
                const productDetails = data.data;
                const modalContent = document.querySelector("#productModal .modal-content");
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">Product Details</h5>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeX">X</button>
                        </div>
                    <div class="modal-body">
                        <form id="showForm" disabled>
                            <div class="mb-3">
                                <label for="marca" class="form-label">Marca</label>
                                <input type="text" class="form-control" id="marca" value="${productDetails.attributes.marca}" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="modello" class="form-label">Modello</label>
                                <input type="text" class="form-control" id="modello" value="${productDetails.attributes.nome}" disabled>
                            </div>
                            <div class="mb-3">
                                <label for="prezzo" class="form-label">Prezzo</label>
                                <input type="text" class="form-control" id="prezzo" value="${productDetails.attributes.prezzo}" disabled>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancelButton">Cancel</button>
                    </div>
                `;
                // Visualizziamo il modulo modale per mostrare i dettagli del prodotto
                productModal.show();
                // Aggiunge un evento al click del bottone "Cancel" e del pulsante "X" per chiudere il modal
        const cancelButton = document.getElementById("cancelButton");
        cancelButton.addEventListener("click", function() {
            clearFormInputs(); // Pulisce i campi del form
            productModal.hide(); // Chiude il modal
        });
    
        const closeButtonX = document.getElementById("closeX");
        closeButtonX.addEventListener("click", function() {
            clearFormInputs(); // Pulisce i campi del form
            productModal.hide(); // Chiude il modal
        });
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    };

    // Funzione per modificare un prodotto
    window.editProduct = function(productId) {
        fetch(apiUrl + "/" + productId)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error fetching product details: " + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const productDetails = data.data;
                const modalContent = document.querySelector("#productModal .modal-content");
                modalContent.innerHTML = `
                    <div class="modal-header">
                        <h5 class="modal-title" id="productModalLabel">Edit Product</h5>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeX">X</button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm">
                            <div class="mb-3">
                                <label for="marca" class="form-label">Marca</label>
                                <input type="text" class="form-control" id="marca" value="${productDetails.attributes.marca}">
                            </div>
                            <div class="mb-3">
                                <label for="modello" class="form-label">Modello</label>
                                <input type="text" class="form-control" id="modello" value="${productDetails.attributes.nome}">
                            </div>
                            <div class="mb-3">
                                <label for="prezzo" class="form-label">Prezzo</label>
                                <input type="text" class="form-control" id="prezzo" value="${productDetails.attributes.prezzo}">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="cancelButton">Cancel</button>
                        <button type="button" class="btn btn-primary" id="saveButton">Save</button>
                    </div>
                `;
                productModal.show();
                
                // Aggiunge un evento al click del bottone "Cancel" e del pulsante "X" per chiudere il modal
                const cancelButton = document.getElementById("cancelButton");
                cancelButton.addEventListener("click", function() {
                    clearFormInputs(); // Pulisce i campi del form
                    productModal.hide(); // Chiude il modal
                });
    
                const closeButtonX = document.getElementById("closeX");
                closeButtonX.addEventListener("click", function() {
                    clearFormInputs(); // Pulisce i campi del form
                    productModal.hide(); // Chiude il modal
                });
    
                // Aggiunge un evento al click del bottone "Save"
                const saveButton = document.getElementById("saveButton");
                saveButton.addEventListener("click", function() {
                    UpProduct(productId); // Passa l'ID del prodotto a saveProduct
                });
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    };
    
    function clearFormInputs() {
        document.getElementById("marca").value = "";
        document.getElementById("modello").value = "";
        document.getElementById("prezzo").value = "";
    }
    
    function UpProduct(productId) {
        const marcaInput = document.getElementById("marca").value;
        const modelloInput = document.getElementById("modello").value;
        const prezzoInput = document.getElementById("prezzo").value;
    
        const updatedProductData = {
            marca: marcaInput,
            nome: modelloInput,
            prezzo: prezzoInput
        };
    
        editProductDetails(productId, updatedProductData); // Passa l'ID del prodotto e i dati aggiornati a editProductDetails
    }
    
    function editProductDetails(productId, updatedProductData) {
        fetch(apiUrl + "/" + productId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: { attributes: updatedProductData }})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error updating product: " + response.statusText);
            }
            console.log("Product updated successfully:", productId);
            // Aggiorniamo la lista dei prodotti dopo la modifica
            getProducts();
            productModal.hide(); // Chiude il modal
        })
        .catch(error => {
            console.error("Error updating product:", error);
        });
    }
    
    
    
    

    // Funzione per eliminare un prodotto
    window.deleteProduct = function(productId) {
        // Effettua una richiesta DELETE al server per eliminare il prodotto con l'ID specificato
        fetch(apiUrl + "/" + productId, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error deleting product: " + response.statusText);
            }
            getProducts(); // Aggiorna la lista dei prodotti dopo l'eliminazione
        })
        .catch(error => {
            console.error("Error deleting product:", error);
        });
    };

    // Chiama la funzione per ottenere la lista dei prodotti al caricamento della pagina
    getProducts();
});
