import * as DisciplineMethods from '../../controllers/discipline.controller';

export default {
  Query: {
    discipline: async (root: any, { disciplineId }: any) => {
      return await DisciplineMethods.discipline(disciplineId);
    },
    disciplines: async () => {
      return await DisciplineMethods.disciplines();
    }
  },
  Mutation: {
    addDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineMethods.addDiscipline(discipline);
    },
    editDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineMethods.editDiscipline(discipline);
    },
    deleteDiscipline: async (root: any, { discipline }: any) => {
      return await DisciplineMethods.deleteDiscipline(discipline);
    }
  }
};
