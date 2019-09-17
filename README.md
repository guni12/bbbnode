[![Build Status](https://travis-ci.org/guni12/bbbnode.svg?branch=master)](https://travis-ci.org/guni12/bbbnode) 
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/?branch=master) 
[![Build Status](https://scrutinizer-ci.com/g/guni12/bbbnode/badges/build.png?b=master)](https://scrutinizer-ci.com/g/guni12/bbbnode/build-status/master) 
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b293df61900a45f5afae54b63d759876)](https://www.codacy.com/app/guni12/bbbnode?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=guni12/bbbnode&amp;utm_campaign=Badge_Grade) 
[![Coverage Status](https://coveralls.io/repos/github/guni12/bbbnode/badge.png?branch=master)](https://coveralls.io/github/guni12/bbbnode?branch=master) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d358e99378a19a9ec839/maintainability)](https://codeclimate.com/github/guni12/bbbnode/maintainability)

# BehovsBoBoxen
## Ett styrsystem för att spara energi (effekt) i hemmet

![detta behöver du](http://www.behovsbo.se/themes/images/bbbmaterial.jpg)

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

-   Konfigurera sd-kortet, installera raspbian och konfigurera till svenska förhållanden.
-   `https://www.raspberrypi.org/documentation/installation/noobs.md`
-   Aktivera ssh.
-   Byt lösenord!!!
-   Aktivera 1-Wire
-   Aktivera spi
-   Installera sensorer, mer info följer om detta...
-   Hämta BehovsBoBoxen med:
```sh
git clone https://github.com/guni12/bbbnode
```
-   Öppna filen `/home/pi/bbbnode/scripts/install.sh` och ändra *LååångtLösenord* till ditt eget val (rad 75)
-   Ändra också *din@email.se* och *hemlig* till dina val (rad 88)
-   Öppna en terminal och kör följande kommando - (det kan ta en stund, sqlite ger många varningar, men fungerar):
```sh
sh /home/pi/bbbnode/scripts/install.sh
```
-   När det finns installerade sensorer:
-   Gå till hemsidan `http://ditt.ip.n.r:8787`
-   Logga in med ditt nyskapade användarkonto (bara att skriva, sparas efter 1.5 sek)
-   Klicka på fliken 'Zoner'
-   Ändra namn på zonerna
-   Klicka på filen 'Rpio'
-   Koppla aktiva relän till respektive zon, via dropdown-listan

-   port forwarding...
-   För att läsa temperaturerna direkt i terminalen:
```sh
ds18b20 -a -d 2
```
## API


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
| /controls      | Visar kontroll-inställningarna                        |
| /hourcontrol   | Ställer in styrning, inställd att köras var 10e minut |
| /tempupdate    | Läser av gpio-sensorerna och uppdaterar zonerna       |
| (POST)         |                                                       |
| /login         | Inloggning som skapar en tidsbegränsad token          |
| /register      | Skapa ny medlem                                       |
| /editzone      | Uppdatera zon med ett nytt värde                      |
| /rpio          | Uppdatera gpio-sensor med inställning                 |
| /addzone       | Lägga till zon (görs i /init)                         |
| /editsettings  | Uppdatera settings med ett nytt värde                 |