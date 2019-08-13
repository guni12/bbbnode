#!/bin/sh
$(> ./db/test.sqlite)
< ./db/migrate.sql sqlite3 ./db/test.sqlite
