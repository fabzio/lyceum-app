#!/bin/bash

source .env

echo $AWS_ACCESS_KEY_ID $AWS_SECRET_ACCESS_KEY $AWS_SESSION_TOKEN $AWS_REGION $TF_VAR_elastic_ip_allocation_id

# Create infrastructure
terraform init
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN AWS_REGION=$AWS_REGION TF_VAR_elastic_ip_allocation_id=$TF_VAR_elastic_ip_allocation_id terraform apply

# Generate credentials file for application server configuration
IP=$(terraform output -raw instance_public_ip)

cat <<EOF > hosts.ini
[all]
app_server ansible_host=52.205.109.156 ansible_user=ubuntu ansible_ssh_private_key_file=./id_rsa
EOF

terraform output -raw private_key > id_rsa
chmod 0600 id_rsa

# Generate aws credentials files
mkdir -p .aws

cat <<EOF > .aws/config
[default]
region=${AWS_REGION}
EOF

cat <<EOF > .aws/credentials
[default]
aws_access_key_id=${AWS_ACCESS_KEY_ID}
aws_secret_access_key=${AWS_SECRET_ACCESS_KEY}
aws_session_token=${AWS_SESSION_TOKEN}
EOF

# Set AWS credentials as environment variables and log in to ECR
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
AWS_REGION=$AWS_REGION \
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPOSITORY_URL

# Build and push the backend Docker image
docker build -t ${ECR_REPOSITORY_URL}/lyceum-ecr:latest .
docker push ${ECR_REPOSITORY_URL}/lyceum-ecr:latest


# Generate application files
AWS_BUCKET_NAME=$(terraform output -raw objects_bucket_name)

cat <<EOF > docker-compose.yml
version: "3.8"

services:
  backend:
    image: ${ECR_REPOSITORY_URL}/lyceum-ecr:latest
    container_name: backend
    restart: always
    ports:
      - "8080:8080"
    environment:
      - DB_DATABASE=${DB_DATABASE}
      - DB_USERNAME=${DB_USERNAME}
      - DB_PASSWORD=${DB_PASSWORD}
      - DB_PORT=${DB_PORT}
      - DB_SCHEMA=${DB_SCHEMA}
      - DB_HOST=${DB_HOST}
      - SECRET_KEY=${SECRET_KEY}
      - G_CLIENT_ID=${G_CLIENT_ID}
      - G_CLIENT_SECRET=${G_CLIENT_SECRET}
      - BUCKET_NAME=${BUCKET_NAME}
      - BUCKET_REGION=${BUCKET_REGION}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
      - AWS_SESSION_TOKEN=${AWS_SESSION_TOKEN}
      - AWS_REGION=${AWS_REGION}
      - PORT=${PORT}
    networks:
      - app_network

  watchtower:
    image: containrrr/watchtower:latest
    container_name: watchtower
    restart: always
    environment:
      - WATCHTOWER_CLEANUP=true
      - WATCHTOWER_POLL_INTERVAL=60
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /home/ubuntu/.docker/config.json:/config.json:ro

networks:
  app_network:
    driver: bridge
EOF
 
cat <<EOF > nginx.conf
# Redirección de HTTP
# Bloque para manejar HTTP
server {
  server_name lyceum.inf.pucp.edu.pe;
  # Proxy para que todo el tráfico sea manejado por el backend en localhost:8080
  location / {
    proxy_pass http://localhost:8080;
    proxy_http_version 1.1;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host \$host;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_cache_bypass \$http_upgrade;
  }
}
EOF


# Configure application server
AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
AWS_SESSION_TOKEN=$AWS_SESSION_TOKEN \
AWS_REGION=$AWS_REGION \
ECR_REPOSITORY_URL=$ECR_REPOSITORY_URL \
DOMAIN=$DOMAIN \
EMAIL_ADDRESS=$EMAIL_ADDRESS \
ansible-playbook  -i hosts.ini playbook.yml