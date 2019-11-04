import Plan from '../models/Plan';

class PlansController {
  async destroy(req, res) {
    const { idPlan } = req.params;

    // Checking if there are users in the plan
    const users = await Plan.findAll({
      where: { id: idPlan },
    });

    if (users) {
      return res
        .status(401)
        .json({ error: 'There are users in the plan. Unable to delete.' });
    }

    await Plan.destroy({
      where: { id: idPlan },
    }).catch(() => {
      return res.status(400).json({ error: 'Could not delete the plan.' });
    });

    return res.json();
  }

  async index(req, res) {
    return res.json();
  }

  async show(req, res) {
    return res.json();
  }

  async store(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }
}

export default new PlansController();
