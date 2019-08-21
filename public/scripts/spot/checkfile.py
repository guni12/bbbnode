#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
Move tomorrow-file to today at midnight
2018-08-19
"""
import datetime
import os
from ftplib import FTP

def file_get_contents(filename):
    """textfile fetch"""
    with open(filename) as file:
        return file.read()

NEWFILE = '/home/pi/bbbnode/public/scripts/spot/spotprice2.txt'
CHECKFILE = '/home/pi/bbbnode/public/scripts/spot/check.txt'
ACTUALTIME = datetime.datetime.now()
TESTTEXT = 'OK: ' + str(ACTUALTIME)

if os.path.isfile(NEWFILE):

    FHANDLE = open(CHECKFILE, "w")
    FHANDLE.write(TESTTEXT)
    FHANDLE.close()
else:
    SOURCE = FTP('ftp.nordpoolspot.com')
    SOURCE.login('spot', 'spo1245t')
    SOURCE.retrbinary('RETR spotprice.sdv', open('/home/pi/bbbnode/public/scripts/spot/spotprice.sdv', 'wb').write)
    TEXT = file_get_contents('/home/pi/bbbnode/public/scripts/spot/spotprice.sdv')

    TFILE = "/home/pi/bbbnode/public/scripts/spot/spotprice2.txt"
    FHANDLE = open(TFILE, "w")
    FHANDLE.write(TEXT)
    FHANDLE.close()
