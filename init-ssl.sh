#!/bin/bash
# Generate self-signed SSL certificate for development/testing
# Browsers will show a security warning — click "Advanced" > "Proceed" to bypass

CERT_DIR="./ssl"
mkdir -p "$CERT_DIR"

if [ -f "$CERT_DIR/cert.pem" ] && [ -f "$CERT_DIR/key.pem" ]; then
    echo "SSL certificates already exist in $CERT_DIR/"
    echo "Delete them and re-run this script to regenerate."
    exit 0
fi

openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout "$CERT_DIR/key.pem" \
    -out "$CERT_DIR/cert.pem" \
    -subj "/C=US/ST=Dev/L=Dev/O=DevCanvas/CN=devcanvas.local" \
    -addext "subjectAltName=IP:159.65.149.115,DNS:localhost"

echo "Self-signed SSL certificates generated in $CERT_DIR/"
echo "  - cert.pem (certificate)"
echo "  - key.pem  (private key)"
echo ""
echo "NOTE: Browsers will show a warning. Click 'Advanced' > 'Proceed' to continue."
