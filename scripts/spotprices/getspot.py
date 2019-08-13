#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
Downloads spotprice.sdv and adds the file in /home/pi/bbbnode/public/scripts/spot/
2018-08-19
"""
import datetime
from ftplib import FTP

def file_get_contents(filename):
    """Fetches textfile"""
    with open(filename) as file:
        return file.read()

SDVFILE = '/home/pi/bbbnode/public/scripts/spot/spotprice.sdv'

SOURCE = FTP('ftp.nordpoolspot.com')
SOURCE.login('spot', 'spo1245t')
SOURCE.retrbinary('RETR spotprice.sdv', open(SDVFILE, 'wb').write)

TEXT = file_get_contents(SDVFILE)

TFILE = "/home/pi/bbbnode/public/scripts/spot/spotprice2.txt"
FHANDLE = open(TFILE, "w")
FHANDLE.write(TEXT)
FHANDLE.close()