# bbbnode
[![Build Status](https://travis-ci.org/guni12/bbbnode.svg?branch=master)](https://travis-ci.org/guni12/bbbnode) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/?branch=master) [![Build Status](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/build.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/build-status/master) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/b293df61900a45f5afae54b63d759876)](https://www.codacy.com/app/guni12/bbbnode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guni12/bbbnode&amp;utm_campaign=Badge_Grade)

# TODO

* Konfigurera sd-kort
* Ladda hem raspbian
* Enable ssh
* Andra configurationer som tangentbord etc
* Byt lösenord!!!
* Enable 1-Wire
* Enable spi
```sh
git clone https://github.com/guni12/bbbnode
```
* öppna `/home/pi/bbbnode/scripts/pass.txt` - ändra lösenordet till ditt eget val
* kopiera hela kommandot och kör i en terminal
```sh
sudo sh /home/pi/bbbnode/scripts/install.sh
```
* `cd bbbnode`

```sh
npm install
cd db
sqlite3 texts.sqlite
.read migrate.sqlite
.exit
```
* `cd ..`
öppna terminal och kör igång servern:
```sh
npm start
```
* gå in i webbläsaren med `http://localhost/find`
* sedan `http://localhost/init`
* sedan installera sensorer...
* sedan `http://ditt.ip.n.r:8787/zones`
* Bestäm namn på zonerna
* Koppla aktiva relän till zonerna via `http://ip.nr:8787/rpio`
* hämta spotpriser genom ett pythonscript
```sh
python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
```
* `http://localhost:1337/tempupdate`
* `http://localhost:1337/hourcontrol`
* öppna ny terminal:
```sh
sudo crontab -l -u root |  cat /home/pi/bbbnode/scripts/cron.txt | sudo crontab -u root -
```
* om du vill se vilka processer som är aktiva:
```sh
sudo lsof -i -P -n | grep LISTEN
```
* för att släcka server-process och göra omstart:
```sh
sudo fuser -k 1337/tcp
```
*
* port forwarding...
