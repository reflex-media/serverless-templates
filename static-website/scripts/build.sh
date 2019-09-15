#!/bin/bash

###############################################################################
#                                                                             #
# INITIALIZE EVERYTHING                                                       #
#                                                                             #
###############################################################################

usage="$(basename "$0") [-s=] [-h] -- script to build website

where:
    -s      build specific stage/environment (e.g; development, staging, production)
    -h      show this help text"

# arg options
STAGE='development';  # deploy specific stage/environment

# parse the options
while getopts "s:nh" OPT ; do
  case ${OPT} in
    s) STAGE=${OPTARG} ;;
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

echo -e "Configuring website env file"
cp ./config/environments/.env.${STAGE} ./.env.${STAGE}.local

echo "Bundling website"
react-scripts build

echo "Remove build env file"
rm ./.env.${STAGE}.local
