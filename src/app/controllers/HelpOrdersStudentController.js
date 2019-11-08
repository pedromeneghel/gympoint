import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';

class HelpOrdersStudentController {
  async index(req, res) {
    const schema = Yup.object().shape({
      idStudent: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Valdation fails.' });
    }

    const { idStudent } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: idStudent },
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      order: [['answer_at', 'ASC'], ['created_at', 'DESC']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const { idStudent } = req.params;
    const schema = Yup.object().shape({
      question: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schemaIdStudent = Yup.object().shape({
      idStudent: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schemaIdStudent.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, question, created_at } = await HelpOrder.create({
      student_id: idStudent,
      question: req.body.question,
    });
    return res.json({
      id,
      question,
      created_at,
    });
  }
}

export default new HelpOrdersStudentController();
