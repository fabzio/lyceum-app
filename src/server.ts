import App from './app'
import FAQ from './faq'
import Security from './security'

const app = new App([new Security(),new FAQ()])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
