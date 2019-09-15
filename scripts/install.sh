#!/bin/sh
#2019-07-22

# Enable ssh
# Andra configurationer som tangentbord etc
# Byt lösenord!!!
# Enable 1-Wire
# Enable spi

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

sudo apt install build-essential -y

#Fixa att läsa in migrate

sudo apt-get install lsof -y

sudo apt-get install nginx -y

sudo cp /home/pi/bbbnode/scripts/etc/nginx/sites-available/react /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/react /etc/nginx/sites-enabled/react

#Gå in i /etc/apt/sources.list.d/raspi.list och avkommentera sista raden
sudo apt-get install gcc-4.8 -y

echo 'SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"' | sudo tee -a /etc/udev/rules.d/20-gpiomem.rules > /dev/null

grep -q -F "dtoverlay=w1-gpio,gpiopin=4" /boot/config.txt || sudo bash -c "echo 'dtoverlay=w1-gpio,gpiopin=4' >> /boot/config.txt"
sudo chown -R pi:www-data /var/www

sudo mkdir /var/www/react
sudo cp -R /home/pi/bbbnode/scripts/var/www/react/html /var/www/react

sudo nginx

echo 'export JWT_SECRET="LååångtLösenord"' | sudo tee -a /home/pi/.profile > /dev/null
#curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register

sudo npm install –g pm2
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
sudo npm install -g ds18b20-raspi

sudo crontab -l -u root |  cat /home/pi/bbbnode/scripts/cron.txt | sudo crontab -u root -

sudo python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py

echo "installation ok, the system will restart" | sudo tee -a /boot/config.txt
sudo reboot

# läs sqlite cd db ...
# Uppdatera cron vid reboot ?
