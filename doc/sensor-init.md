# Materiallista och<br>Instruktioner för att installera relän:

[Tillbaka till README](../README.md#behovsboboxen)  

## Detta behöver du


| Bom | Antal    | Materiallista                       | Antal    | Materiallista                     |
|---- | -------- | ----------------------------------- | ---------|---------------------------------- |
|     |          | **BehovsBoBoxen 2019**              |          | **BehovsBoBoxen 2017**            |
| 1   | 1        | Raspberry pi 3 modell B             | 1        | Raspberry pi 3 modell B           |
| 2   | &#8805;2 | ds18b20 (1-wire eller dallas)       | &#8805;2 | ds18b20 (1-wire eller dallas)     |
| 3   | 1        | micro SD kort, gärna minst 32GB     | 1        | micro SD kort, gärna minst 32GB   |
| 4   | 1        | [påhängskort](#installera-sensorer) | 1        | reläkort med 8 relän              |
| 5   | 1        | 5V 3A USB laddare                   | 1        | 5V 3A USB laddare                 |
| 6   |          |                                     | 1        | knippe kopplingssladdar           |
| 7   | 1        | Ethernetsladd                       | 1        | Ethernetsladd                     |

![raspberry pi x 2](raspar2.jpg)

## Raspberry Pi

Konfigurera sd-kortet, installera raspbian och konfigurera till svenska förhållanden:  
[https://www.raspberrypi.org/documentation/installation/noobs.md](https://www.raspberrypi.org/documentation/installation/noobs.md)  
* Aktivera ssh.  
* Byt lösenord!!!  
* Aktivera 1-Wire  

#### Tips!
* Aktivera en 'JSON Viewer', för trevligare läsupplevelse av BehovsBoBoxens API.  
[https://chrome.google.com/webstore/search/json%20viewer](https://chrome.google.com/webstore/search/json%20viewer)  
* För att kunna läsa lokala md-filer, t.ex. denna readme-fil i raspbians webbläsare, aktivera chrome-tillägget 'Markdown Viewer':
[https://chrome.google.com/webstore/search/markdown%20viewer](https://chrome.google.com/webstore/search/markdown%20viewer)  
1. Gå sedan till `chrome://extensions`
2. Hitta Markdown Viewer and klicka på `info` knappen
3. Se till att `Tillåt åtkomst till webbadresser i filen` är på  


## Installera sensorer

### BehovsBoBoxen 2017 har ett löst reläkort som kopplas med så kallade dupontsladdar  
Koppla relä 1,2,3,4,5,6,7,8, från pinne 29,31,33,36,35,38,40,37.  
Koppla + från pinne 2 eller 4 och – från pinne 6, 9,14,25,30,34 eller 39.  
Koppla in ”dallasgivarna” till + och – samt signalen till pinne 7.  
På bilden ovan pekar den röda pilen på den vita sladden som är kopplad till pinne 37 och sedan kopplad till relä ?  
Identifiera relä och pinne enligt tabellen.

![relän](relan.png)

### För BehovsBoBoxen 2019 har vi valt att köpa ett påhängskort från Hi-tech chain  
[https://hitechchain.se/raspberry-pi/raspberry-pi-8-ch-relay-expansion-board](https://hitechchain.se/raspberry-pi/raspberry-pi-8-ch-relay-expansion-board)  
Koppla in dallasgivarna på skruvplintarna till + och – samt tryck eller löd fast signalen på hål P4.  


[Tillbaka till README](../README.md#behovsboboxen)  