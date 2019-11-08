import * as Yup from 'yup';
import { Op } from 'sequelize';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderMail from '../jobs/HelpOrderReplayMail';
import Queue from '../../lib/Queue';

class HelpOrdersGymController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: {
          [Op.is]: null,
        },
      },
      attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
      order: [['created_at', 'ASC']],
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      gymAnswer: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schemaIdAnswer = Yup.object().shape({
      idAnswer: Yup.number()
        .integer()
        .required(),
    });

    const { idAnswer } = req.params;
    const { gymAnswer } = req.body;

    if (!(await schemaIdAnswer.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const helpOrder = await HelpOrder.findByPk(idAnswer);

    const { id, question, answer, answe_at } = await helpOrder
      .update({
        answer: gymAnswer,
        answer_at: new Date(),
      })
      .catch(() => {
        return res.status(400).json({ error: 'Update help order fails.' });
      });

    /**
     * Sending notification mail
     */
    const helpOrderData = await HelpOrder.findByPk(idAnswer, {
      attributes: ['id', 'question', 'answer', 'answer_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await Queue.add(HelpOrderMail.key, {
      helpOrderData,
    });

    return res.json({
      id,
      question,
      answer,
      answe_at,
    });
  }
}

export default new HelpOrdersGymController();
