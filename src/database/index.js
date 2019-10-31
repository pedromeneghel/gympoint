import Sequelize from 'sequelize';

// Import models

// Import config
import databseConfig from '../config/database';

// Create array of models
const models = [];

class Database {
  constructor() {
    this.postgres();
  }

  postgres() {
    this.connection = new Sequelize(databseConfig);

    models
      .maps(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
