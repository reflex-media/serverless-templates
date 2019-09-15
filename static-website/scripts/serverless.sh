#!/bin/bash

###############################################################################
#                                                                             #
# INITIALIZE EVERYTHING                                                       #
#                                                                             #
###############################################################################

usage="$(basename "$0") [-s=] [-a=] [-nc] -- script to deploy static website to S3 bucket

where:
    -s      deploy to a specific stage/environment (e.g; development, staging, production)
    -n      determine if to run without confirmation prompt.
    -h      show this help text"

# arg options
STAGE='dev';  # deploy specific stage/environment
NOCONFIRM=0;  # deploy without confirmation prompt

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

# include parse_yaml function
. ./scripts/parse-yaml.sh;

# read yaml file
eval $(parse_yaml ./config/environments/.env.${STAGE} "ENV_");

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
mv ./.env.development.local ./.env.development.local.bak
cp ./config/environments/.env.${STAGE} ./.env

echo "Bundling website"
yarn build

echo "Resetting website env file"
mv ./.env.development.bak ./.env.development.local

echo "Deploying website"
if [ ${NOCONFIRM} -eq 1 ]; then
    sls client deploy --stage ${STAGE} --env ${STAGE} --no-confirm
else
    sls client deploy --stage ${STAGE} --env ${STAGE}
fi

echo "Invalidating CloudFront Distribution"
aws cloudfront create-invalidation --profile ${AWSPROFILE} --distribution-id ${AWSCLIENTCFID} --paths "/*"