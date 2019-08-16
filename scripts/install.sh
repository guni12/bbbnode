#!/bin/sh
#2019-07-22

sudo apt-get update -y
#gets Raspian updates

sudo apt-get dist-upgrade -y
#installs Raspian updates

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
# downloads newest version Node.js (kolla på nodejs.org - vi kan inte ha senaste pga dependencies)

sudo apt-get install -y nodejs
# installs it

sudo apt-get install unattended-upgrades -y

sudo apt-get install sqlite3 -y
sudo apt-get install libsqlite3-dev

#Fixa att läsa in migrate

sudo apt-get install lsof

sudo apt-get install nginx -y

sudo cp /home/pi/bbbnode/bbb /etc/nginx/sites-available/
sudo cp /home/pi/bbbnode/react /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/bbb /etc/nginx/sites-enabled/bbb
sudo ln -s /etc/nginx/sites-available/react /etc/nginx/sites-enabled/react

#Gå in i /etc/apt/sources.list.d/raspi.list och avkommentera sista raden
sudo apt-get install gcc-4.8 -y

cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF

#  npm install -g ds18b20-raspi - läsa av sensorer i terminalen

# Fixa cron

sudo chown -R pi:www-data /var/www

sudo nginx


sudo reboot

# Uppdatera cron vid reboot ?