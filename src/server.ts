import App from './app'
import FAQ from './faq'
import Course from './courses'
import Security from './security'

const app = new App([new Security(),new FAQ(), new Course()])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
