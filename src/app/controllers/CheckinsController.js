import * as Yup from 'yup';
import { Op } from 'sequelize';
import { subDays } from 'date-fns';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinsController {
  async index(req, res) {
    const { idStudent } = req.params;

    const schema = Yup.object().shape({
      idStudent: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const checkins = await Checkin.findAll({
      attributes: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
      where: {
        student_id: idStudent,
      },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const { idStudent: student_id } = req.params;

    const schema = Yup.object().shape({
      idStudent: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    /**
     * Checking quantify checkins
     */
    const limitDate = subDays(new Date(), 7);

    const verifyCheckins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.gte]: limitDate,
        },
      },
    });

    if (verifyCheckins.length >= 5) {
      return res.status(400).json({ error: 'Checkins exceeded' });
    }

    const { id, created_at } = await Checkin.create({
      student_id,
    });

    return res.json({
      id,
      student_id,
      created_at,
    });
  }
}

export default new CheckinsController();
