#!/bin/bash

###############################################################################
#                                                                             #
# INITIALIZE EVERYTHING                                                       #
#                                                                             #
###############################################################################

usage="$(basename "$0") [-h] -- script to start local

where:
    -h      show this help text"

# parse the options
while getopts "s:nh" OPT ; do
  case ${OPT} in
    h)
        echo "${usage}"
        exit 0
        ;;
    *)
        echo "${usage}"
        exit 1
        ;;
  esac
done

# Check if local env file exists
FILE=config/environments/.env.local
if [ -f "$FILE" ]; then
  ENVFILE=.env.local
else 
  ENVFILE=.env
fi

# color codes
RED='\033[0;31m';
GREEN='\033[0;32m';
ORANGE='\033[0;33m';
BLUE='\033[0;34m';
PURPLE='\033[0;35m';
CYAN='\033[0;36m';
YELLOW='\033[1;33m';
WHITE='\033[1;37m';
NC='\033[0m';

#################################################################################
#
# RUN STUFF
#
#################################################################################

echo -e "${PURPLE}Starting command...${NC}"

echo -e "Configuring website env file from config/environments/${ENVFILE}"
cp ./config/environments/${ENVFILE} ./.env.local

echo "Start website"
react-scripts start
