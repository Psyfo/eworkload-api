const express = require('express');
const Department = require('../models/department');
const router = express.Router();


router.get('/', (req, res) => {
    res.json({
        message: 'Index route is working!'
    });
});

router.get('/department', (req, res) => {
    const departmentId = req.body.departmentId;
    const result = Department.findOne({
            departmentId: departmentId
        })
        .populate('faculty_details')
        .then(results => {
            res.status(200).json(results);
        })
        .catch(err => {

            res.json({err});
        });
});

module.exports = router;