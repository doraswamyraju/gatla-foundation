#!/bin/bash
# VPS Deployment Script for Gatla Foundation
# Automatically configures Database, Nginx, PHP-FPM, and SSL

echo "===================================================="
echo "   Gatla Foundation Automated VPS Deployer"
echo "===================================================="

# 1. Check if running as root
if [ "$EUID" -ne 0 ]; then
  echo "Error: Please run this script as root (sudo)."
  exit 1
fi

# 2. Get the current directory (should be /var/www/gatla-foundation)
REPO_DIR="/var/www/gatla-foundation"
if [ ! -d "$REPO_DIR" ]; then
  echo "Cloning the repository to $REPO_DIR..."
  git clone https://github.com/doraswamyraju/gatla-foundation.git "$REPO_DIR"
fi
cd "$REPO_DIR" || exit 1

# 3. Prompt for MySQL Root Password to create the database
echo ""
read -sp "Enter your MySQL root password: " MYSQL_PASS
echo ""

# Run MySQL commands to create database and user
echo "Setting up MySQL database 'gatla_vps' and user 'gatla_user'..."
mysql -u root -p"$MYSQL_PASS" -e "
CREATE DATABASE IF NOT EXISTS gatla_vps;
CREATE USER IF NOT EXISTS 'gatla_user'@'localhost' IDENTIFIED BY 'Gatla@Foundation2026!';
GRANT ALL PRIVILEGES ON gatla_vps.* TO 'gatla_user'@'localhost';
FLUSH PRIVILEGES;
" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "[OK] MySQL database and user set up successfully."
else
  echo "[ERROR] MySQL setup failed. Please check your root password and try again."
  exit 1
fi

# 4. Create db_credentials.php if it doesn't exist
echo "Configuring database credentials..."
cat << 'EOF' > "$REPO_DIR/api/db_credentials.php"
<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'gatla_user');
define('DB_PASSWORD', 'Gatla@Foundation2026!');
define('DB_NAME', 'gatla_vps');
?>
EOF
echo "[OK] db_credentials.php created."

# 5. Run PHP Migrations to create tables
echo "Running database table migrations..."
php "$REPO_DIR/api/migrate_all.php"

# 6. Detect installed PHP-FPM socket
echo "Detecting PHP-FPM socket..."
PHP_FPM_SOCK=$(ls /var/run/php/php*-fpm.sock 2>/dev/null | head -n 1)

if [ -z "$PHP_FPM_SOCK" ]; then
  echo "[WARNING] No PHP-FPM socket found in /var/run/php/. Let's search systemctl..."
  PHP_SERVICE=$(systemctl list-units --type=service | grep -oE "php[0-9.]+-fpm" | head -n 1)
  if [ -n "$PHP_SERVICE" ]; then
    echo "Found PHP service: $PHP_SERVICE. Attempting to start/restart it..."
    systemctl restart "$PHP_SERVICE"
    PHP_FPM_SOCK=$(ls /var/run/php/php*-fpm.sock 2>/dev/null | head -n 1)
  fi
fi

if [ -z "$PHP_FPM_SOCK" ]; then
  echo "[ERROR] PHP-FPM socket not found. Please install PHP-FPM (e.g. apt install php-fpm)."
  exit 1
else
  echo "[OK] Detected PHP-FPM socket at: $PHP_FPM_SOCK"
fi

# 7. Create Nginx Site Configuration
echo "Configuring Nginx server block..."
cat << EOF > /etc/nginx/sites-available/gatlafoundation
server {
    listen 80;
    server_name gatlafoundation.org www.gatlafoundation.org;

    root $REPO_DIR/build;
    index index.html;

    # React Frontend Routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # PHP API Routing
    location ~ \.php\$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:$PHP_FPM_SOCK;
        fastcgi_param SCRIPT_FILENAME $REPO_DIR\$fastcgi_script_name;
        include fastcgi_params;
    }

    # Deny access to .git
    location ~ /\.git {
        deny all;
    }
}
EOF

# Enable the Nginx site
ln -sf /etc/nginx/sites-available/gatlafoundation /etc/nginx/sites-enabled/

# Test and reload Nginx
echo "Testing Nginx configuration..."
nginx -t
if [ $? -eq 0 ]; then
  echo "Reloading Nginx..."
  systemctl reload nginx
  echo "[OK] Nginx server block enabled."
else
  echo "[ERROR] Nginx configuration test failed. Reverting..."
  rm -f /etc/nginx/sites-enabled/gatlafoundation
  exit 1
fi

# 8. Run Certbot for SSL
echo ""
read -p "Would you like to install Let's Encrypt SSL now? (y/n): " RUN_SSL
if [[ "$RUN_SSL" =~ ^[Yy]$ ]]; then
  echo "Generating SSL certificate via Certbot..."
  certbot --nginx -d gatlafoundation.org -d www.gatlafoundation.org
  if [ $? -eq 0 ]; then
    echo "[OK] SSL Certificate configured successfully!"
  else
    echo "[WARNING] Certbot failed to generate SSL. Please verify domain DNS and run manually."
  fi
fi

echo ""
echo "===================================================="
echo "   Deployment Complete! Visit http://gatlafoundation.org"
echo "===================================================="
