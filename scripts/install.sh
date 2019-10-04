#!/bin/sh
#2019-09-18

sudo sed -i '/deb-src/s/^#//g' /etc/apt/sources.list.d/raspi.list

sudo apt-get update -y
#gets Raspian updates

sudo apt-get dist-upgrade -y
#installs Raspian updates

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs nginx build-essential g++

sudo apt-get install unattended-upgrades -y

sudo apt-get install sqlite3 -y
sudo apt-get install libsqlite3-dev
sudo apt-get install lsof -y
sudo apt-get install gcc-4.8 -y # needed for node-rpio and its C++11 support

cd /home/pi/bbbnode/db

sqlite3 -batch texts.sqlite ".read migrate.sql"

sudo cp /home/pi/bbbnode/scripts/etc/nginx/sites-available/react /etc/nginx/sites-available/
sudo cp /home/pi/bbbnode/scripts/etc/nginx/sites-available/nologin /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/react /etc/nginx/sites-enabled/react
sudo ln -s /etc/nginx/sites-available/nologin /etc/nginx/sites-enabled/nologin

echo 'SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"' | sudo tee -a /etc/udev/rules.d/20-gpiomem.rules > /dev/null

grep -q -F "dtoverlay=w1-gpio,gpiopin=4" /boot/config.txt || sudo bash -c "echo 'dtoverlay=w1-gpio,gpiopin=4' >> /boot/config.txt"


sudo mkdir /var/www/react
sudo cp -R /home/pi/bbbnode/scripts/var/www/react/html /var/www/react
sudo chown -R pi:www-data /var/www/react

sudo mkdir /var/www/nologin
sudo cp -R /home/pi/bbbnode/scripts/var/www/nologin/html /var/www/nologin
sudo chown -R pi:www-data /var/www/nologin

sudo nginx

echo 'export JWT_SECRET="LååångtLösenord"' | sudo tee -a /home/pi/.profile > /dev/null

cd /home/pi/bbbnode
sudo python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
sudo python3 /home/pi/bbbnode/public/scripts/spot/movefiles.py

sudo npm install ds18b20-raspi -g
sudo npm install node-pre-gyp -g
sudo npm install node-gyp -g
sudo npm install pm2 -g
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
npm install --production # installs modules without devDependencies
npm install nodemon

echo "installation ok, the system will restart" | sudo tee -a /boot/config.txt
sudo reboot
