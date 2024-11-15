#!/usr/bin/env sh

docker run --rm -d \
  -u "$(id -u):$(id -g)" \
  -v $PWD/routes:/golinks/routes \
  -p 80:80 \
  golinks | xargs docker logs
