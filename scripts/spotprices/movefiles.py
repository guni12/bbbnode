#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
Move tomorrow-file to today at midnight
2018-08-19
"""
import datetime
import os

def file_get_contents(filename):
    """Fetches textfile"""
    with open(filename) as file:
        return file.read()

FROMFILE = "/home/pi/bbbnode/public/scripts/spot/spotprice2.txt"
TOFILE = "/home/pi/bbbnode/public/scripts/spot/spotprice.txt"

if os.path.isfile(FROMFILE)¨:
    FHANDLE = open(TOFILE, "w")
    FHANDLE.write(TEXT)
    FHANDLE.close()

    os.remove(FROMFILE)
else:
    print("Filen finns inte")
