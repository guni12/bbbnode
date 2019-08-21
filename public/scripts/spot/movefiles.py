#!/usr/bin/python3
# -*- coding: utf-8 -*-
"""
Move tomorrow-file to today at midnight
2018-08-19
"""
import os

def file_get_contents(filename):
    """textfile fetch"""
    with open(filename) as file:
        return file.read()

FROMFILE = '/home/pi/bbbnode/public/scripts/spot/spotprice2.txt'

if os.path.isfile(FROMFILE):

    TEXT = file_get_contents(FROMFILE)
    TOFILE = '/home/pi/bbbnode/public/scripts/spot/spotprice.txt'
    FHANDLE = open(TOFILE, "w")
    FHANDLE.write(TEXT)
    FHANDLE.close()

    os.remove('/home/pi/bbbnode/public/scripts/spot/spotprice2.txt')
else:
    print("Filen finns inte")
