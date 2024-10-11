import App from './app'
import FAQ from './faq'
import Course from './courses'
import Security from './security'
import Thesis from './thesis'
import StudyPlan from './study-plans'

const app = new App([
  new Security(),
  new FAQ(),
  new Course(),
  new Thesis(),
  new StudyPlan(),
])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
