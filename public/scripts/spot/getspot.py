#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
Downloads spotprice.sdv and adds the file in /home/pi
2018-08-19
"""
import datetime
from ftplib import FTP

SOURCE = FTP('ftp.nordpoolspot.com')
SOURCE.login('spot', 'spo1245t')
SOURCE.retrbinary('RETR spotprice.sdv', open('/home/pi/bbbnode/public/scripts/spot/spotprice.sdv', 'wb').write)

def file_get_contents(filename):
    """Fetches textfile"""
    with open(filename) as file:
        return file.read()

TEXT = file_get_contents('/home/pi/bbbnode/public/scripts/spot/spotprice.sdv')

TFILE = "/home/pi/bbbnode/public/scripts/spot/spotprice2.txt"
FHANDLE = open(TFILE, "w")
FHANDLE.write(TEXT)
FHANDLE.close()
