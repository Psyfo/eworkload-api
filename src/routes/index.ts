import express from 'express';

let router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Index route is working!'
  });
});

export default router;