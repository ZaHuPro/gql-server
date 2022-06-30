# !/bin/bash

echo "Deploying to ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_URL}"
ssh ${DEPLOY_SERVER_USER}@${DEPLOY_SERVER_URL} 'bash' < ./scripts/shell/deploy.sh