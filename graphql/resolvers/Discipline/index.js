import * as DisciplineMethods from '../../../controllers/discipline';

export default {
  Query: {
    discipline: (root, args) => {
      return DisciplineMethods.discipline(args.disciplineId);
    },
    disciplines: () => {
      return DisciplineMethods.disciplineId();
    }
  },
  Mutation: {
    addDiscipline: (root, args) => {
      return DisciplineMethods.addDiscipline(args.discipline);
    },
    editDiscipline: (root, args) => {
      return DisciplineMethods.editDiscipline(args.discipline);
    },
    deleteDiscipline: (root, args) => {
      return DisciplineMethods.deleteDiscipline(args.discipline);
    }
  }
};
