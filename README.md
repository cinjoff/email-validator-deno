## About
Simple email validator service

- Implemented using [Deno](https://deno.land/) 1.0
- 1 external dependency
- ~28 MB final docker image

## Build (only needed if starting locally)
`docker build -t app .`

## Run
Local: `docker run -it -p 8080:8080 -e PORT=8080 app`

Remote: `docker run -it -p 8080:8080 -e PORT=8080 cinjoff/email-validator-deno:v0.1`

NOTE: port defaults to 8000 unless PORT environment variable is specified

## Use

```
curl -X POST \
  http://localhost:8080/email/validate \
  -H 'Content-Type: application/json' \
  -d '{
	"email": "hello@gmail.com"
}'
```

### Supported domains: gmail.com, yahoo.com, abv.bg, rekki.com
### SMTP validator failure can be simulated by providing email with more than 25 char length

