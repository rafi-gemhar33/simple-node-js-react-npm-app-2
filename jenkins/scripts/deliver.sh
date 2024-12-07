#!/usr/bin/env sh

echo "Building production bundle in /var/jenkins_home/workspace/simple-node-js-react-app..."
set -x
npm run build
set +x

echo "Starting development server..."
echo "Note: Running as background process to prevent CI/CD pipeline blocking"
set -x
npm start &
sleep 1
echo $! > .pidfile
set +x

echo 'App running at http://localhost:3000' in dev http://20.187.54.124:3000
echo 'Port 3000 must be exposed in Jenkins Pipeline configuration'
