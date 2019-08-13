#!/bin/sh
$(> ./db/test.sqlite)
< ./db/migrate2.sql sqlite3 ./db/test.sqlite