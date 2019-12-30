import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class StudentsController {
  async destroy(req, res) {
    const { idStudent } = req.params;

    // Checking if the student have active enrollment
    const enrollments = await Enrollment.findAll({
      where: { student_id: idStudent },
    });

    if (enrollments.lenght > 0) {
      return res
        .status(401)
        .json({ error: 'There is registration for this student.' });
    }

    await Student.destroy({
      where: { id: idStudent },
    }).catch(() => {
      return res.status(400).json({ error: 'Could not delete the student.' });
    });

    return res.json();
  }

  async index(req, res) {
    const { page = 1, q = '%' } = req.query;

    const schema = Yup.object().shape({
      page: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status('400').json({ error: 'Page number incorrect.' });
    }

    const students = await Student.findAll({
      where: {
        name: {
          [Op.substring]: q,
        },
      },
      order: ['name'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(students);
  }

  async show(req, res) {
    const students = await Student.findAll({
      where: { id: req.params.idStudent },
      order: ['name'],
      attributes: ['id', 'name', 'email', 'age', 'weight', 'height'],
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, name, email } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .integer()
        .required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const student = await Student.findByPk(req.params.idStudent);
    const { name, email, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentsController();
