import { Card, CardContent } from '@frontend/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@frontend/components/ui/carousel'
import { Answer } from '../interfaces/SurveyManagementDetail'

interface Props {
  answers: Answer[]
}
export default function MessageResult({ answers }: Props) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {answers.map((answer, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">
                    {answer.answerRawText}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
