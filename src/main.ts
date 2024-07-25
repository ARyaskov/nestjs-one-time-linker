import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify"
import { ConfigService } from "@nestjs/config"
const fastifyCsrf = require("@fastify/csrf-protection")
const fastifySecureSession = require("@fastify/secure-session")
const helmet = require("@fastify/helmet")

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  const configService = app.get(ConfigService)
  app.enableCors()

  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`, "unpkg.com"],
        styleSrc: [
          `'self'`,
          `'unsafe-inline'`,
          "cdn.jsdelivr.net",
          "fonts.googleapis.com",
          "unpkg.com",
        ],
        fontSrc: [`'self'`, "fonts.gstatic.com", "data:"],
        imgSrc: [`'self'`, "data:", "cdn.jsdelivr.net"],
        scriptSrc: [
          `'self'`,
          `https: 'unsafe-inline'`,
          `cdn.jsdelivr.net`,
          `'unsafe-eval'`,
        ],
      },
    },
  })

  await app.register(fastifyCsrf)
  await app.register(fastifySecureSession, {
    secret: configService.get<string>("HTTP_SECURE_SESSION_SECRET"),
    salt: configService.get<string>("HTTP_SECURE_SESSION_SALT"),
  })

  const host = configService.get<string>("HOST") || "0.0.0.0"
  const port = configService.get<number>("PORT") || 3032

  await app.listen(port, host)
  console.log(`Running with HOST=${host} PORT=${port}`)
}
bootstrap()
