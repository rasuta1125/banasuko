#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory="/home/user/webapp/deploy", **kwargs)
    
    def log_message(self, format, *args):
        sys.stdout.write(f"{self.log_date_time_string()} - {format%args}\n")
        sys.stdout.flush()

if __name__ == "__main__":
    PORT = 8080
    os.chdir("/home/user/webapp/deploy")
    
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving at http://0.0.0.0:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
