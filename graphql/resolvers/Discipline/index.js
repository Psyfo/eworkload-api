import * as DisciplineMethods from '../../../controllers/discipline';

export default {
  Query: {
    discipline: async (root, args) => {
      return await DisciplineMethods.discipline(args.disciplineId);
    },
    disciplines: async () => {
      return await DisciplineMethods.disciplines();
    }
  },
  Mutation: {
    addDiscipline: async (root, args) => {
      return await DisciplineMethods.addDiscipline(args.discipline);
    },
    editDiscipline: async (root, args) => {
      return await DisciplineMethods.editDiscipline(args.discipline);
    },
    deleteDiscipline: async (root, args) => {
      return await DisciplineMethods.deleteDiscipline(args.discipline);
    }
  }
};
