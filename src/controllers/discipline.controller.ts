import IDiscipline from 'interfaces/discipline.interface';

import Discipline from '../models/discipline.model';

export default class DisciplineController {
  constructor() {}

  public static async discipline(disciplineId: string) {
    return await Discipline.findOne({ disciplineId: disciplineId });
  }
  public static async disciplines() {
    return await Discipline.find({});
  }
  public static async createDiscipline(discipline: IDiscipline) {
    return await new Discipline(discipline).save();
  }
  public static async updateDiscipline(discipline: IDiscipline) {
    return await Discipline.findOneAndUpdate(
      { disciplineId: discipline.disciplineId },
      {
        $set: discipline
      },
      { upsert: true }
    );
  }
  public static async deleteDiscipline(discipline: IDiscipline) {
    return await Discipline.findOneAndRemove(discipline);
  }
}
