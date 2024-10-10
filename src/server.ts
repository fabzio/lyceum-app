import App from './app'
import FAQ from './faq'
import Course from './courses'
import Security from './security'
import Enrollment from './enrollment'

const app = new App([new Security(),new FAQ(), new Course(), new Enrollment()])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
