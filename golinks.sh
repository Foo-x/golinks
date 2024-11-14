#!/usr/bin/env sh

docker run --rm -d \
  -u "$(id -u):$(id -g)" \
  -v ./src:/golinks/src \
  -p 80:80 \
  oven/bun \
  bun /golinks/src/index.ts | xargs docker logs
