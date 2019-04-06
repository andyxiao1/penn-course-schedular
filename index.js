const express = require('express');
const getAllCourses = require('./courses.js');
const getAllSchedules = require('./schedules.js');
const app = express();

// format query string as http://localhost:3000/schedule?classes[]=cis121&classes[]=cis262&classes[]=eas203&classes[]=econ002
// http://localhost:3000/schedule?classes[]=cis240&classes[]=cis320&classes[]=stat430&classes[]=ipd509
app.get('/schedule', async (req, res, next) => {
  try {
    const courses = await getAllCourses(req.query.classes);
    const schedules = getAllSchedules(courses);
    const output = printSchedules(schedules);
    res.send(output);
  } catch (err) {
    next(err);
  }
});

const printSchedules = schedules => {
  let toReturn = '';
  schedules.forEach((elt, index) => {
    toReturn += `Schedule ${index + 1} is ${printSchedule(elt)} <br>`;
  });
  return toReturn;
};

const printSchedule = schedule => {
  let toReturn = '';
  schedule.forEach(elt => {
    toReturn += elt.meetings[0].section_id + ' ';
  });
  return toReturn;
};

app.use((err, req, res, next) => {
  res.send(err.message);
});

app.listen(3000, () => {
  console.log('listening...');
});
