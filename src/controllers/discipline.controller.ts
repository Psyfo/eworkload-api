import { default as DisciplineModel } from '../models/discipline.model';

let discipline = async (disciplineId: string) => {
  return await DisciplineModel.findOne({ disciplineId: disciplineId });
};
let disciplines = async () => {
  return await DisciplineModel.find({});
};
let addDiscipline = async (discipline: any) => {
  const newDiscipline = await new DisciplineModel(discipline);

  return await newDiscipline.save();
};
let editDiscipline = async (discipline: any) => {
  return await DisciplineModel.findOneAndUpdate(
    { disciplineId: discipline.disciplineId },
    {
      $set: discipline
    },
    { upsert: true }
  );
};
let deleteDiscipline = async (discipline: any) => {
  return await DisciplineModel.findOneAndRemove(discipline);
};

export {
  discipline,
  disciplines,
  addDiscipline,
  editDiscipline,
  deleteDiscipline
};
