FROM oven/bun AS build 

WORKDIR /app

COPY bun.lockb .
COPY package.json .
COPY tsconfig.json .
RUN bun install --frozen-lockfile

COPY src ./src

ENV NODE_ENV=production
RUN bun build ./src/server.ts --compile --outfile cli

FROM ubuntu:latest

WORKDIR /app
# copy the compiled binary from the build image
COPY --from=build /app/cli /app/cli
EXPOSE 8080
ENV PORT=8080
CMD ["/app/cli"]