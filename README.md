# Simple email validator service
- Implemented using [Deno](https://deno.land/) 1.0
- 1 external dependency
- ~28 MB final docker image

# Build (only needed if starting locally)

# Run
Local: `docker run -it -p 8080:8080 -e PORT=8080 app`
Remote: `docker run -it -p 8080:8080 -e PORT=8080 cinjoff/email-validator-deno:v0.1`

NOTE: port defaults to 8000 unless PORT environment variable is specified
