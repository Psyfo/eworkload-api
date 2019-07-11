import Discipline from './../models/discipline.js';

let discipline = async disciplineId => {
  return await Discipline.findOne({ disciplineId: disciplineId });
};

let disciplines = async () => {
  return await Discipline.find({});
};

let addDiscipline = async discipline => {
  const newDiscipline = await new Discipline(discipline);

  return await newDiscipline.save();
};

let editDiscipline = async discipline => {
  return await Discipline.findOneAndUpdate(
    { disciplineId: discipline.disciplineId },
    {
      $set: discipline
    },
    { upsert: true }
  );
};

let deleteDiscipline = async discipline => {
  return await Discipline.findOneAndRemove(discipline);
};

export {
  discipline,
  disciplines,
  addDiscipline,
  editDiscipline,
  deleteDiscipline
};
