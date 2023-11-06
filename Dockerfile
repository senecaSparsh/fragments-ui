# Dockerfile

# Use node version 20.9.0
FROM node:20.9.0 AS dependencies

LABEL maintainer="Sparsh Agarwal <sagarwal9@myseneca.ca>"
LABEL description="Fragments node.js microservice"

# We default to use port 8080 in our service
ENV NODE_ENV=production​

# Use /app as our working directory
WORKDIR /app

# Copy src to /app/src/
COPY ./src ./src

# Option 3: explicit filenames - Copy the package.json and package-lock.json
# files into the working dir (/app), using full paths and multiple source
# files.  All of the files will be copied into the working dir `./app`
COPY package.json package-lock.json ./

# Install node dependencies defined in package-lock.json
RUN npm ci

# Start the container by running our server
FROM node:20.9.0-alpine3.17 AS builder

WORKDIR /app
COPY --from=dependencies /app /app

# Copy source code into the image
COPY . .
RUN npm run build

FROM nginx:stable-alpine@sha256:74694f2de64c44787a81f0554aa45b281e468c0c58b8665fafceda624d31e556 AS deploy
COPY --from=builder /app/dist/ /usr/share/nginx/html/
ENV PORT=80

EXPOSE 80

HEALTHCHECK --interval=15s --start-period=5s --retries=3 --timeout=30s\
    CMD curl –-fail http://localhost:${PORT}/ || exit 1​
