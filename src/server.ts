import App from './app'
import Accounts from './modules/accounts'
import Course from './modules/courses'
import Enrollment from './modules/enrollment'
import FAQ from './modules/faq'
import Schedule from './modules/schedule'
import Security from './modules/security'
import StudyPlan from './modules/study-plans'
import Thesis from './modules/thesis'
import Units from './modules/units'
import Hiring from './modules/hiring'
import Survey from './modules/surveys'
import PresentationLetters from './modules/presentation-letters'
const app = new App([
  new Security(),
  new FAQ(),
  new Course(),
  new Thesis(),
  new StudyPlan(),
  new Enrollment(),
  new Accounts(),
  new Schedule(),
  new Units(),
  new Hiring(),
  new Survey(),
  new PresentationLetters(),
])

export default {
  port: app.port,
  fetch: app.getServer().fetch,
}
