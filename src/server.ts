import App from './app'
import Security from './security'

const app = new App([new Security()])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
