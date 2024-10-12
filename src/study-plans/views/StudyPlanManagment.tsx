import { useEffect } from 'react';
import StudyPlanTable from '@/study-plans/components/StudyPlanTable';
import useStudyPlanStore from '@/study-plans/store';
import StudyPlanService from '@/study-plans/services/studyPlan.service';

export default function StudyPlanManagement() {
  const { studyPlans, addStudyPlan } = useStudyPlanStore();

  useEffect(() => {
    StudyPlanService.fetchStudyPlans().then((fetchedPlans) => {
      fetchedPlans.forEach(addStudyPlan);
    });
  }, [addStudyPlan]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Gestión de plan de estudios</h2>
      <StudyPlanTable studyPlans={studyPlans}/>
    </div>
  );
}
