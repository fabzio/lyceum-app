import { Button } from '@/components/ui/button'
import AskAccordion from './components/AskAccordion'
import FAQService from './services/ask.service'
import { Input } from '@/components/ui/input'

export default function FAQ() {
  const faqs = FAQService.getFAQs()
  return (
    <div className="flex justify-center items-center">
      <div>
        <h2 className="text-2xl font-bold"> Preguntas Frecuentes</h2>
        <section className="flex ">
          <Input
            className="flex-1"
            placeholder="🔎 Buscar pregunta frecuente"
          />
          <Button>Nueva pregunta</Button>
        </section>
        <section>
          <AskAccordion faqs={faqs} />
        </section>
      </div>
    </div>
  )
}
