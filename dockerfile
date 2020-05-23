FROM hayd/alpine-deno:1.0.1

ENV PORT 8080

EXPOSE $PORT

WORKDIR /app

# Prefer not to run as root.
USER deno

# Cache the dependencies as a layer
COPY src/deps.ts .
RUN deno cache deps.ts

# do not add tests folder
ADD src .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "main.ts"]