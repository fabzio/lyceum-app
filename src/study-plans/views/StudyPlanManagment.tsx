import { useEffect } from 'react';
import StudyPlanTable from '../components/StudyPlanTable';
import useStudyPlanStore from '../store';
import StudyPlanService from '../services/studyPlan.service';

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
      <StudyPlanTable studyPlans={studyPlans} onEdit={(plan) => console.log('Editar plan de estudios', plan)} />
    </div>
  );
}
