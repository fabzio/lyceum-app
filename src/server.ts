import App from './app'
import { IndexRoute } from './routes'

const app = new App([new IndexRoute()])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
