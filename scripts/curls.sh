#!/bin/sh
#2019-09-18

curl -d "column=din@email.se&value=hemlig" -X POST http://localhost:1337/register
curl http://localhost:1337/find
curl http://localhost:1337/init
curl http://localhost:1337/spotcal
curl http://localhost:1337/tempupdate
curl http://localhost:1337/controlupdate
curl http://localhost:1337/hourcontrol