#!/bin/sh
#2019-09-18

curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register
/usr/bin/python3 /home/pi/bbbnode/public/scripts/spot/checkfile.py
curl http://localhost:1337/find
/usr/bin/python3 /home/pi/bbbnode/public/scripts/spot/movefiles.py
curl http://localhost:1337/init
curl http://localhost:1337/spotcal
curl http://localhost:1337/tempupdate
curl http://localhost:1337/controlupdate
curl http://localhost:1337/hourcontrol
