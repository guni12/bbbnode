#!/bin/sh
#2019-09-16

sudo sed -i '/deb-src/s/^#//g' /etc/apt/sources.list.d/raspi.list

sudo apt-get update -y
#gets Raspian updates

sudo apt-get dist-upgrade -y
#installs Raspian updates

curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs nginx build-essential g++ node-gyp

sudo apt-get install unattended-upgrades -y

sudo apt-get install sqlite3 -y
sudo apt-get install libsqlite3-dev

sqlite3 -batch texts.sqlite "DROP TABLE IF EXISTS users;"
sqlite3 -batch texts.sqlite "DROP TABLE IF EXISTS settings;"
sqlite3 -batch texts.sqlite "DROP TABLE IF EXISTS zones;"
sqlite3 -batch texts.sqlite "CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    UNIQUE(email)
);"
sqlite3 -batch texts.sqlite "CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    area VARCHAR(20) NOT NULL,
    currency VARCHAR(20)NOT NULL,
    dsmon INTEGER NOT NULL,
    percenton INTEGER NOT NULL,
    percent INTEGER NOT NULL,
    awayfrom DATETIME,
    awayto DATETIME
);"
sqlite3 -batch texts.sqlite "CREATE TABLE IF NOT EXISTS zones (
    id INTEGER PRIMARY KEY,
    sensorid VARCHAR(50) NOT NULL,
    zone VARCHAR(30) NOT NULL,
    gpio INTEGER,
    away INTEGER,
    dsm INTEGER,
    tempis REAL,
    isoff INTEGER,
    ison INTEGER,
    max INTEGER,
    min INTEGER,
    should INTEGER,
    name VARCHAR(50),
    measured VARCHAR(50)
);"

sqlite3 -batch texts.sqlite "INSERT INTO settings(area,currency,percent,dsmon,percenton) VALUES('SE1', 'SEK', 2, 0, 1);"

sudo apt-get install lsof -y

sudo cp /home/pi/bbbnode/scripts/etc/nginx/sites-available/react /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/react /etc/nginx/sites-enabled/react

sudo apt-get install gcc-4.8 -y

echo 'SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"' | sudo tee -a /etc/udev/rules.d/20-gpiomem.rules > /dev/null

grep -q -F "dtoverlay=w1-gpio,gpiopin=4" /boot/config.txt || sudo bash -c "echo 'dtoverlay=w1-gpio,gpiopin=4' >> /boot/config.txt"
sudo chown -R pi:www-data /var/www

sudo mkdir /var/www/react
sudo cp -R /home/pi/bbbnode/scripts/var/www/react/html /var/www/react

sudo nginx

echo 'export JWT_SECRET="LååångtLösenord"' | sudo tee -a /home/pi/.profile > /dev/null

sudo crontab -l -u root |  cat /home/pi/bbbnode/scripts/cron.txt | sudo crontab -u root -

sudo python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
sudo python3 /home/pi/bbbnode/public/scripts/spot/movefiles.py

npm install –g pm2
sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
npm install -g ds18b20-raspi
cd /home/pi/bbbnode
npm install
pm2 start app.js --name="bbbnode"

curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register
curl http://localhost:1337/find
curl http://localhost:1337/init
curl http://localhost:1337/spotcal
curl http://localhost:1337/tempupdate
curl http://localhost:1337/controlupdate
curl http://localhost:1337/hourcontrol

echo "installation ok, the system will restart" | sudo tee -a /boot/config.txt
sudo reboot
