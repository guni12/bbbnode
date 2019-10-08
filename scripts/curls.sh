#!/bin/sh
#2019-09-18

curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register
sudo python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
curl http://localhost:1337/savesensors
curl http://localhost:1337/initgpios
curl http://localhost:1337/spotcal
curl http://localhost:1337/spotcal/2
curl http://localhost:1337/tempupdate
curl http://localhost:1337/controlupdate
