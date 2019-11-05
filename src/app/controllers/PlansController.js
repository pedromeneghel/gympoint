import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlansController {
  async destroy(req, res) {
    const { idPlan } = req.params;

    // Checking if there are users in the plan
    /**
     * const users = await Plan.findAll({
      where: { id: idPlan },
    });

    if (users) {
      return res
        .status(401)
        .json({ error: 'There are users in the plan. Unable to delete.' });
    } */

    await Plan.destroy({
      where: { id: idPlan },
    }).catch(() => {
      return res.status(400).json({ error: 'Could not delete the plan.' });
    });

    return res.json();
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const schema = Yup.object().shape({
      page: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status('400').json({ error: 'Page number incorrect.' });
    }

    const plans = await Plan.findAll({
      order: ['title'],
      attributes: ['id', 'title', 'duration', 'price'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { idPlan } = req.params;

    const schema = Yup.object().shape({
      idPlan: Yup.number().integer(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status('400').json({ error: 'Plan ID incorrect.' });
    }

    const plan = await Plan.findAll({
      where: { id: idPlan },
      order: ['title'],
      attributes: ['id', 'title', 'duration', 'price'],
    });

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const { idPlan } = req.params;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const schemaIdPlan = Yup.object().shape({
      idPlan: Yup.number()
        .integer()
        .required(),
    });

    if (!(await schemaIdPlan.isValid(req.params))) {
      return res.status(400).json({ error: 'Invalid plan id.' });
    }

    const plan = await Plan.findByPk(idPlan);

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }
}

export default new PlansController();
