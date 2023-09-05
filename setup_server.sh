#!/bin/bash

# Install nginx
apt-get update
apt-get install -y nginx

# Enable firewall for nginx and ssh
ufw allow 'Nginx HTTP'
ufw allow ssh
yes | ufw enable

# Install git
apt-get install -y git

# Install redis
apt-get install -y redis-server

# Install nodejs 18
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
apt-get install -y nodejs

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
source /root/.bashrc

# Install pm2
pnpm add -g pm2
