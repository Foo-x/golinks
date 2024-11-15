FROM oven/bun:slim

COPY src/ /golinks/src/

WORKDIR /golinks/src

RUN mkdir /golinks/routes

CMD ["bun", "index.ts"]
