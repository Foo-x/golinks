FROM oven/bun:slim

COPY src/ /golinks/src/

WORKDIR /golinks/src

CMD ["bun", "index.ts"]
