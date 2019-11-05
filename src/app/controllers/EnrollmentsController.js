import * as Yup from 'yup';
import { addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentsController {
  async destroy(req, res) {
    const { idEnrollment } = req.param;

    const schema = Yup.object().shape({
      idEnrollment: Yup.number(),
    });

    if (!(await schema.isValid(req.param))) {
      return res.status('400').json({ error: 'Enrollment not found.' });
    }

    await Enrollment.destroy({
      where: { id: idEnrollment },
    }).catch(() => {
      return res
        .status('400')
        .json({ error: 'Could not delete the enrollment.' });
    });

    return res.json();
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const schema = Yup.object().shape({
      page: Yup.number(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status('400').json({ error: 'Page number incorrect.' });
    }

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async show(req, res) {
    const { idEnrollment } = req.param;

    const schema = Yup.object().shape({
      idEnrollment: Yup.number(),
    });

    if (!(await schema.isValid(req.param))) {
      return res.status('400').json({ error: 'Enrollment not found.' });
    }

    const enrollment = await Enrollment.findAll({
      where: { id: idEnrollment },
      attributes: ['id', 'start_date', 'end_date', 'price'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
      ],
    });
    return res.json(enrollment);
  }

  async store(req, res) {
    const {
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
    } = req.body;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    /**
     * Calculating plan end date
     */
    const endDate = addMonths(startDate, plan.duration);

    /**
     * Calculating enrollment price
     */
    const pricePlan = Number(plan.price) * Number(plan.duration);

    const {
      id,
      sudent_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Enrollment.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      price: pricePlan,
    });

    return res.json({
      id,
      sudent_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const {
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
    } = req.body;

    const { idEnrollment } = req.params;

    const schema = Yup.object().shape({
      student_id: Yup.number()
        .integer()
        .required(),
      plan_id: Yup.number()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid())) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schemaEnrollment = Yup.object().shape({
      idEnrollment: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schemaEnrollment.isValid())) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const plan = await Plan.findByPk(planId);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    /**
     * Calculating plan end date
     */
    const endDate = addMonths(startDate, plan.duration);

    /**
     * Calculating enrollment price
     */
    const pricePlan = Number(plan.price) * Number(plan.duration);

    const {
      sudent_id,
      plan_id,
      start_date,
      end_date,
      price,
    } = await Enrollment.update(
      {
        student_id: studentId,
        plan_id: planId,
        start_date: startDate,
        end_date: endDate,
        price: pricePlan,
      },
      {
        where: { id: idEnrollment },
      }
    );

    return res.json({
      sudent_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }
}

export default new EnrollmentsController();
