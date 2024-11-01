FROM oven/bun AS build

WORKDIR /app

COPY bun.lockb .
COPY package.json .
COPY tsconfig.json .
RUN bun install --frozen-lockfile

COPY src ./src

ENV NODE_ENV=production
RUN bun build ./src/server.ts --compile --outfile cli

# Install frontend node modules
COPY --link frontend/bun.lockb frontend/package.json ./frontend/
RUN cd frontend && bun install --ci

# Copy application code
COPY --link . .

# Change to frontend directory and build the frontend app
WORKDIR /app/frontend
RUN bun run build
# Remove all files in frontend except for the dist folder
RUN find .- mindepth 1 !- regex '^./dist\(/ .* \)?'-delete

FROM ubuntu:latest

WORKDIR /app
# copy the compiled binary from the build image
COPY --from=build /app/cli /app/cli
COPY --from=build /app/frontend/dist /app/frontend/dist
EXPOSE 8080
ENTRYPOINT ["/app/cli"]