import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    // Super é classe exstendida (model) e init é um método da classe Model
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.DECIMAL,
        height: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
