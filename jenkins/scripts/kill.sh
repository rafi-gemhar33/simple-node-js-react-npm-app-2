#!/usr/bin/env sh

echo "Terminating npm process using PID from .pidfile"
set -x
kill $(cat .pidfile)
