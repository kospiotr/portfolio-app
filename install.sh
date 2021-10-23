echo "PWD: '${PWD}'"
docker run -t --rm --name my-app-install -w "/" node:alpine ls -alt && pwd