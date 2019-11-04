# Materiallista och<br>Instruktioner för att installera relän:

[Tillbaka till README](../README.md#behovsboboxen)  

## Detta behöver du


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

[Tillbaka till README](../README.md#behovsboboxen)  