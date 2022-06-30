# Pull code
cd /home/ubuntu/projects/gql-server

git checkout .

git pull

yarn

npm run clean

npm run build

pm2 restart gql-server

exit