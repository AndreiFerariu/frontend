from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class RESTfulAPIHandler(BaseHTTPRequestHandler):

    # Override del metodo do_GET per gestire richieste GET
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        response = {'message': 'Questa è una risposta dalla richiesta GET'}
        self.wfile.write(json.dumps(response).encode())

    # Override del metodo do_POST per gestire richieste POST
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data.decode())

        # Stampa il tipo di richiesta e i dati inviati
        print(f"Tipo di richiesta: {self.command}")
        print(f"Dati inviati: {post_data}")
        
        self.send_response(200)
        self.end_headers()
        response = {'message': 'Dati ricevuti correttamente'}
        self.wfile.write(json.dumps(response).encode())

    # Override del metodo do_PUT per gestire richieste PUT
    def do_PUT(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data.decode())

        # Stampa il tipo di richiesta e i dati inviati
        print(f"Tipo di richiesta: {self.command}")
        print(f"Dati inviati: {post_data}")
        
        self.send_response(200)
        self.end_headers()
        response = {'message': 'Dati ricevuti correttamente'}
        self.wfile.write(json.dumps(response).encode())

    # Override del metodo do_DELETE per gestire richieste DELETE
    def do_DELETE(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_data = json.loads(post_data.decode())

        # Stampa il tipo di richiesta e i dati inviati
        print(f"Tipo di richiesta: {self.command}")
        print(f"Dati inviati: {post_data}")
        
        self.send_response(200)
        self.end_headers()
        response = {'message': 'Dati eliminati correttamente'}
        self.wfile.write(json.dumps(response).encode())

# Funzione per avviare il server
def run(server_class=HTTPServer, handler_class=RESTfulAPIHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Server in esecuzione sulla porta {port}')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
