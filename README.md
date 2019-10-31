# BehovsBoBoxen
[![Build Status](https://travis-ci.org/guni12/bbbnode.svg?branch=master)](https://travis-ci.org/guni12/bbbnode) 
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/?branch=master) 
[![Build Status](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/build.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/build-status/master) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b293df61900a45f5afae54b63d759876)](https://www.codacy.com/app/guni12/bbbnode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guni12/bbbnode&amp;utm_campaign=Badge_Grade) 
[![Coverage Status](https://coveralls.io/repos/github/guni12/bbbnode/badge.png?branch=master)](https://coveralls.io/github/guni12/bbbnode?branch=master) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d358e99378a19a9ec839/maintainability)](https://codeclimate.com/github/guni12/bbbnode/maintainability)
![detta behöver du](http://www.behovsbo.se/themes/images/bbbmaterial.jpg)
## Styr effekt i hemmet
| Bom | Antal    | Materiallista                     |
| --- | ---------|---------------------------------- |
| 1   | 1        | Raspberry pi 3 modell B           |
| 2   | &#8805;2 | ds18b20 (1-wire eller dallas)     |
| 3   | 1        | micro SD kort, gärna minst 32GB   |
| 4   | 1        | reläkort med 8 relän              |
| 5   | 1        | 5V 2,1A USB laddare               |
| 6   | 1        | kopplingsdäck                     |
| 7   | 1        | knippe kopplingssladdar hane-hane |
| 8   | 1        | knippe kopplingssladdar hona-hona |
| 9   | 1        | Ethernetsladd                     |

Mjukvaran för styrsystemet är byggt med Node.js, Express, React och Sqlite3.

## Gör så här

Konfigurera sd-kortet, installera raspbian och konfigurera till svenska förhållanden.  
`https://www.raspberrypi.org/documentation/installation/noobs.md`  
Aktivera ssh.  
Byt lösenord!!!  
Aktivera 1-Wire  
Aktivera spi  
Installera sensorer, mer info följer om detta...  
Hämta BehovsBoBoxen med:  
```sh
git clone https://github.com/guni12/bbbnode
```
Öppna filen `/home/pi/bbbnode/scripts/install.sh` och ändra *LååångtLösenord* till ditt eget val (rad 47)  
Öppna en terminal och kör följande kommando - (det kan ta en stund, sqlite ger många varningar, men fungerar):  
```sh
sh /home/pi/bbbnode/scripts/install.sh
```
Efter att filen körts klart och gjort en reboot, ändra i filen `/home/pi/bbbnode/scripts/curls.sh` *din@email.se* och *hemlig* till dina val.  
Kör igång API-servern och låt den rulla:
```sh
cd bbbnode
npm run dev
```
Öppna en ny terminal och kör filen:
```sh
cd bbbnode
sh /home/pi/bbbnode/scripts/curls.sh
```
Det som händer här är att alla installerade sensorer hittas av systemet.  
En lista med alla relän initieras.  
Aktuellt spotpris hämtas.  
Temperaturerna uppdateras.  
Samt styrning enligt default inställningar räknas ut.  

Det finns två alternativa portnummer till gränssnittet. `:8787` har inloggning och då ska du bara skriva dina nyskapade användaruppgifter (det sparas automatiskt).  

Gå till hemsidan utan inloggning `http://ditt.ip.n.r:8686`.  

Börja med att ge namn till dina sensorer (sidan *Sensorer*) allteftersom du identifierar dem. (Det enklaste är att värma sensorerna i handen och använda `http://ditt.ip.n.r:1337/tempupdate` för att uppdatera värdena.)  
På sidan *Rum* kan man lägga till de sensorer som man vill ska styra relän. Namnge rummet och välj sensor, respektive relä i varsin dropdown-lista. Här ställer du också in önskade temperaturer.  

När du är nöjd med ovanstående är det dags att installera några kommandon som körs regelbundet via cron. Om du vill ändra hur ofta uppdateringar körs, är det här du ska gå in och ändra (med `sudo crontab -e`).
```sh
sudo crontab -l -u root |  cat /home/pi/bbbnode/scripts/cron.txt | sudo crontab -u root -
```
Det är också bra att avsluta development-server-processen (ctrl + c) och starta en pm2 process som sedan startar om automatiskt vid reboot eller strömavbrott.

```sh
cd bbbnode
sudo fuser -k 1337/tcp
pm2 start npm -- start
```

För att läsa temperaturerna direkt i terminalen, skriv:
```sh
ds18b20 -a -d 2
```
För att använda hemsidan från fjärr behövs port forwarding och det är två portar som behöver öppnas, både port 1337 och antingen 8686 (utan inloggning) eller 8787 (med inloggning).

Användbara kommandon för att se eller döda processer
```sh
sudo lsof -i -P -n | grep LISTEN
sudo lsof -i :1337
sudo fuser -k 1337/tcp
```
För att se pm2 respektive döda den installerade processen och starta om.  
Även en process som startar om vid förändring i koden (för den som själv utvecklar koden)
```sh
pm2 log
pm2 delete npm
pm2 show npm
pm2 start npm -- start
pm2 start npm -- start --watch --ignore-watch="node_modules"
```
## API 
### `http://ditt.ip.n.r:1337`

| Sökväg                | Uträttar                                              |
|-----------------------|-------------------------------------------------------|
| (GET)                 |                                                       |
| /                     | Testsida                                              |
| /savesensors          | Hittar och sparar nya sensorer till databasen         |
| /showsensors          | Visar de sparade senorerna med ev alias               |
| /showsensors/id(int)  | Visar sensor med id                                   |
| /deletesensor/id(int) | Tar bort sensor med id                                |
| /initgpios            | Initierar gpio-pinnarna till databasen                |
| /showgpios            | Visar de sparade gpio-pinnarna från databasen         |
| /showgpios/id(int)    | Visar gpio-pinne med id                               |
| /settings             | Visar inställda värden                                |
| /spotcal              | Plockar ut dagens spotpriser enligt settings          |
| /spotcal/2            | Plockar ut morgondagens spotpriser, om efter kl.16    |
| /today                | Visar dagens utvunna spotprislista enligt settings    |
| /today2               | Visar morgondagens utvunna spotprislista              |
| /addroom              | Lägger till rum om kopplad sensor finns               |
| /rooms                | Visar info om tillagda rum                            |
| /rooms/id(int)        | Visar info om rum (id)                                |
| /deleteroom/id(int)   | Tar bort rum med id                                   |
| /roomssensors         | Visar all rum med kopplad sensor                      |
| /roomssensors/id(int) | Visar rum med kopplad sensor (rum-id)                 |
| /controlupdate        | Räknar ut styrning enligt spotpris                    |
| /controls             | Visar kontroll-inställningarna                        |
| /hourcontrol          | Ställer in styrning, inställd att köras var 10e minut |
| /tempupdate           | Läser av gpio-sensorerna och uppdaterar zonerna       |
| (POST)                |                                                       |
| /login                | Inloggning som skapar en tidsbegränsad token          |
| /register             | Skapa ny medlem (email, password) i tabell *'user'*   |
| /editroom             | Uppdatera *'room'* med ett nytt värde                 |
| /editsettings         | Uppdatera *'settings'* med ett nytt värde             |
| /editgpio             | Uppdatera *'gpios'* med (mode, status)                |
| /editsensor           | Uppdatera *'sensors'* med (namn, temp, gpio, rum)     |