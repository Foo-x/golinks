#!/usr/bin/env sh

docker run --rm -d \
  -v $PWD/routes:/golinks/routes \
  -p 80:80 \
  ghcr.io/foo-x/golinks | xargs docker logs
