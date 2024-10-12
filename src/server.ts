import App from './app'
import Course from './modules/courses'
import Enrollment from './modules/enrollment'
import FAQ from './modules/faq'
import Security from './modules/security'
import StudyPlan from './modules/study-plans'
import Thesis from './modules/thesis'

const app = new App([
  new Security(),
  new FAQ(),
  new Course(),
  new Thesis(),
  new StudyPlan(),
  new Enrollment(),
])

app.listen()

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
