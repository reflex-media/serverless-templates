#!/bin/bash

###############################################################################
#                                                                             #
# INITIALIZE EVERYTHING                                                       #
#                                                                             #
###############################################################################

usage="$(basename "$0") [-s=] [-n] [-h] -- script to deploy static website to S3 bucket

where:
    -s      deploy to a specific stage/environment (e.g; dev, stage, prod)
    -n      determine if to run without confirmation prompt.
    -h      show this help text"

# arg options
STAGE='dev';  # deploy specific stage/environment
NOCONFIRM=0;          # deploy without confirmation prompt

# parse the options
while getopts "s:nh" OPT ; do
  case ${OPT} in
    s) STAGE=${OPTARG} ;;
    n) NOCONFIRM=1 ;;
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

# Set envfile
ENVFILE=${STAGE}

# rewrite stage names
if [ ${STAGE} == "production" ]; then
    STAGE="prod"
elif [ ${STAGE} == "prod" ]; then
    ENVFILE="production"
elif [ ${STAGE} == "staging" ]; then
    STAGE="stage"
elif [ ${STAGE} == "stage" ]; then
    ENVFILE="staging"
elif [ ${STAGE} == "development" ]; then
    STAGE="dev"
elif [ ${STAGE} == "dev" ]; then
    ENVFILE="development"
fi

# Check if local env file exists
FILE=config/environments/.env.${ENVFILE}.local
if [ -f "$FILE" ]; then
    ENVFILE=${ENVFILE}.local
fi

# include parse_yaml function
. ./scripts/parse-yaml.sh;

# read yaml file
eval $(parse_yaml ./config/environments/.env.${ENVFILE} "ENV_");

# access yaml content
var=ENV_CLIENT_CF_ID;
AWSCLIENTCFID=${!var};
var2=ENV_AWS_ACCOUNT_PROFILE;
AWSPROFILE=${!var2};

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
cp ./config/environments/.env.${ENVFILE} ./.env.local

echo "Bundling website"
yarn build

echo "Removing website env file"
rm ./.env.local

echo "Deploying website"
if [ ${NOCONFIRM} -eq 1 ]; then
    sls client deploy --stage ${STAGE} --env ${ENVFILE} --no-confirm
else
    sls client deploy --stage ${STAGE} --env ${ENVFILE}
fi

echo "Invalidating CloudFront Distribution"
aws cloudfront create-invalidation --profile ${AWSPROFILE} --distribution-id ${AWSCLIENTCFID} --paths "/*"
