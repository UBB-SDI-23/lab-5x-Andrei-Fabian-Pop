#!/bin/bash

current_dir=$(pwd)

for file in "$current_dir"/emailtoevent/*.sql
do
  echo "$file"
  psql -U andrew -d master -a -f "$file"
done
