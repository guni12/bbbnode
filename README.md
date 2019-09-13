[![Build Status](https://travis-ci.org/guni12/bbbnode.svg?branch=master)](https://travis-ci.org/guni12/bbbnode) 
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/?branch=master) 
[![Build Status](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/build.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/build-status/master) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b293df61900a45f5afae54b63d759876)](https://www.codacy.com/app/guni12/bbbnode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guni12/bbbnode&amp;utm_campaign=Badge_Grade) 
[![Coverage Status](https://coveralls.io/repos/github/guni12/bbbnode/badge.png?branch=master)](https://coveralls.io/github/guni12/bbbnode?branch=master) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d358e99378a19a9ec839/maintainability)](https://codeclimate.com/github/guni12/bbbnode/maintainability)

# BehovsBoBoxen är ett styrsystem för smarta hem baserad på Raspberry Pi

![detta behöver du](http://www.behovsbo.se/themes/images/bbbmaterial.jpg)

| Bom | Antal | Materiallista                     |
| --- | ------|---------------------------------- |
| 1   | 1     | Raspberry pi 3 modell B           |
| 2   | 9     | ds18b20 (1-wire eller dallas)     |
| 3   | 1     | micro SD kort, gärna minst 32GB   |
| 4   | 1     | reläkort med 8 relän              |
| 5   | 1     | 5V 2,1A USB laddare               |
| 6   | 1     | kopplingsdäck                     |
| 7   | 1     | knippe kopplingssladdar hane-hane |
| 8   | 1     | knippe kopplingssladdar hona-hona |
| 9   | 1     | Ethernetsladd                     |

Mjukvaran för styrsystemet är byggt med Node.js, Express, React och Sqlite3.

## Gör så här

-   Konfigurera sd-kortet, installera raspbian och konfigurera till svenska förhållanden.
-   `https://www.raspberrypi.org/documentation/installation/noobs.md`
-   Aktivera ssh.
-   Byt lösenord!!!
-   Aktivera 1-Wire
-   Aktivera spi
-   Hämta BehovsBoBoxen med:
```sh
git clone https://github.com/guni12/bbbnode
```
-   Öppna filen `/home/pi/bbbnode/scripts/pass.txt` och ändra lösenordet till ditt eget val
-   Därefter kopiera den ändrade raden (kommandot) och kör det i en terminal
-   Kör sedan
```sh
sudo sh /home/pi/bbbnode/scripts/install.sh
```
-   Efter reboot gå till boxens katalog:
-   `cd bbbnode`
-   Kör följande kommandon:

```sh
npm install
cd db
sqlite3 texts.sqlite
.read migrate.sql
.exit
```
-   Gå tillbaka:
-   `cd ..`
-   Öppna en terminal och kör igång servern (den ska alltid rulla):
```sh
npm run production
```
-   Skapa ditt användarkonto via terminalen, ändra *du@du.se* och *hemlig* till dina val:
```sh
curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register
```
-   Installera sensorer:
-   Gå in i webbläsaren med `http://localhost/find`
-   sedan `http://localhost/init`
-   sedan `http://ditt.ip.n.r:8787/zones`
-   Bestäm namn på zonerna
-   Koppla aktiva relän till zonerna via `http://ip.nr:8787/rpio`
-   hämta spotpriser genom ett pythonscript
```sh
python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
```
-   `http://localhost:1337/tempupdate`
-   `http://localhost:1337/hourcontrol`
-   öppna ny terminal:
```sh
sudo crontab -l -u root |  cat /home/pi/bbbnode/scripts/cron.txt | sudo crontab -u root -
```
-   om du vill se vilka processer som är aktiva:
```sh
sudo lsof -i -P -n | grep LISTEN
```
-   för att släcka server-process och göra omstart:
```sh
sudo fuser -k 1337/tcp
```
-   port forwarding...

-   för att läsa temperaturerna direkt
```sh
sudo npm install -g ds18b20-raspi
ds18b20 -a -d 2
```
# API


| Sökväg         | Uträttar                                              |
|----------------|-------------------------------------------------------|
| (GET)          |                                                       |
| /find          | Hittar gpio-sensorerna                                |
| /init          | Initierar gpio-sensorerna                             |
| /gpios         | Info om gpio-sensorerna                               |
| /settings      | Visar inställda värden                                |
| /spotcal       | Plockar ut dagens spotpriser enligt settings          |
| /today         | Visar dagens utvunna spotprislista enligt settings    |
| /zones         | Visar info om zonerna                                 |
| /zones/id(int) | Visar info om zon (id)                                |
| /controlupdate | Räknar ut styrning enligt spotpris                    |
| /control       | Visar kontroll-inställningarna                        |
| /hourcontrol   | Ställer in styrning, inställd att köras var 10e minut |
| /tempupdate    | Läser av gpio-sensorerna och uppdaterar zonerna       |
| (POST)         |                                                       |
| /login         | Inloggning som skapar en tidsbegränsad token          |
| /register      | Skapa ny medlem                                       |
| /editzone      | Uppdatera zon med ett nytt värde                      |
| /rpio          | Uppdatera gpio-sensor med inställning                 |
| /addzone       | Lägga till zon (görs i /init)                         |
| /editsettings  | Uppdatera settings med ett nytt värde                 |