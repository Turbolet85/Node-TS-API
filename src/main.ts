import { App } from './app.js'

async function bootstrap (): Promise<void> {
  const app = new App()
  await app.init()
}

bootstrap().catch((err) => {
  console.log(err)
})
