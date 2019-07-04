import Department from '../models/department';
import { Router as router } from 'express';

router.get('/', (req, res) => {
  res.json({
    message: 'Index route is working!'
  });
});

router.get('/departments', (req, res) => {
  //const departmentId = req.body.departmentId;
  Department.find({})
    .populate('faculty')
    .then(results => {
      res.status(200).json(results);
    })
    .catch(err => {
      res.json({ err });
    });
});

export default router;
