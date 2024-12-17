terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}

variable "elastic_ip_allocation_id" {
  description = "Allocation ID of the Elastic IP to associate with the instance"
  type        = string
}

resource "aws_security_group" "app_server_sg" {
  name        = "app-server-sg"
  description = "Security group for the app server"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "app-server-sg"
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0866a3c8686eaeeba"
  instance_type = "t2.medium"
  key_name      = aws_key_pair.app_server_key_pair.key_name

  vpc_security_group_ids = [aws_security_group.app_server_sg.id]

  tags = {
    Name = "main-lyceum-server"
  }
}

resource "aws_eip_association" "app_server_eip" {
  instance_id   = aws_instance.app_server.id
  allocation_id = var.elastic_ip_allocation_id
}

resource "aws_s3_bucket" "objects_bucket" {
  bucket = "lyceum-dev-bucket"

  tags = {
    Name = "Bucket for Objects"
  }
}

resource "aws_s3_bucket_public_access_block" "objects_policy" {
  bucket = aws_s3_bucket.objects_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_key_pair" "app_server_key_pair" {
  key_name   = "app-server-key"
  public_key = tls_private_key.app_server_private_key.public_key_openssh
}

resource "tls_private_key" "app_server_private_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

output "instance_public_ip" {
  value = aws_instance.app_server.public_ip
}

output "instance_public_dns" {
  value = aws_instance.app_server.public_dns
}

output "private_key" {
  value     = tls_private_key.app_server_private_key.private_key_pem
  sensitive = true
}

output "objects_bucket_name" {
  value = aws_s3_bucket.objects_bucket.bucket
}