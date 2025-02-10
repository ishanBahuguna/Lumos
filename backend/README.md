# 1 . setup cloudflare workers

# 2 . setup a hono server

# 3 . get the database url and prisma accelerate url

# 4 . in cloud flare the env variables are picked up from wrangle.toml file under vars section

# 5 . Command to generate prisma client with serverless backend -->
    npx prisma generate --no-engine


# 6. Add prisma accelerate extension ->
    npm install @prisma/extension-accelerate

learn how to get the env var in cloudflare in global context


## For me --> check the JWT_SECRET in cloudflare dashboard and match it with wrangler.toml


