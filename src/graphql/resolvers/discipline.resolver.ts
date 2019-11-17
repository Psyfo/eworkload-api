import DisciplineController from '../../controllers/discipline.controller';

export default {
  Query: {
    discipline: async (root: any, { disciplineId }: any) => {
      return await DisciplineController.discipline(disciplineId);
    },
    disciplines: async () => {
      return await DisciplineController.disciplines();
    }
  },
  Mutation: {
    addDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineController.createDiscipline(discipline);
    },
    editDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineController.updateDiscipline(discipline);
    },
    deleteDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineController.deleteDiscipline(discipline);
    }
  }
};
