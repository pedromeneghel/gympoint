import Sequelize from 'sequelize';
import mongoose from 'mongoose';

// Import models
import Enrollment from '../app/models/Enrollment';
import Plan from '../app/models/Plan';
import Student from '../app/models/Student';
import User from '../app/models/User';
// Import config
import databseConfig from '../config/database';

// Create array of models
const models = [Enrollment, Plan, Student, User];

class Database {
  constructor() {
    this.postgres();
    this.mongo();
  }

  postgres() {
    this.connection = new Sequelize(databseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
