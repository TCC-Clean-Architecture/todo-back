import app from '@/main/configs/express'
import init from '@/main/init'

void (async () => {
  console.log('Inicializando aplicação')
  await init()
  const serverInstance = app.listen(3000, () => {
    console.log('Running on port 3000')
  })

  function shutdownProcedure (): void {
    console.log('*** App is now closing ***')
    serverInstance.close()
    process.exit(0)
  }

  process.on('SIGINT', (signal) => {
    console.log('*** Signal received ****')
    console.log('*** App will be closed in 3 sec ****')
    setTimeout(shutdownProcedure, 3000)
  })
  process.on('SIGTERM', (signal) => {
    console.log('*** Signal received ****')
    console.log('*** App will be closed in 3 sec ****')
    setTimeout(shutdownProcedure, 3000)
  })
})()
