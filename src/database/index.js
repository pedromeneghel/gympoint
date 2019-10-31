import Sequelize from 'sequelize';

// Import models
import Users from '../app/models/User';
// Import config
import databseConfig from '../config/database';

// Create array of models
const models = [Users];

class Database {
  constructor() {
    this.postgres();
  }

  postgres() {
    this.connection = new Sequelize(databseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
