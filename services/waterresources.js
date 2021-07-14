const MongoLib = require("../database");
const moment = require("moment");
class WaterResourcesService {
  constructor() {
    this.collection = "WaterResources";
    this.mongoDB = new MongoLib();
  }
  async getListResources() {
    const waterResources = await this.mongoDB.getAll(this.collection);
    return waterResources || [];
  }
  async getResources({ name }) {
    const [waterResource] = await this.mongoDB.getAll(this.collection, {
      name,
    });
    return waterResource || null;
  }
  
  async get({ waterResourcesId }) {
    const waterResource = await this.mongoDB.get(
      this.collection,
      waterResourcesId
    );
    return waterResource || null;
  }

  async createResources({ waterResource }) {
    let createWaterResourceId = null;
    const { name, valoracion, localizacion, idDispositivo } = waterResource;
    const fuente = await this.getResources({ name });
    if (fuente) {
      fuente.valoracion.ph.push(valoracion.ph);
      fuente.valoracion.conductivity.push(valoracion.conductivity);
      fuente.valoracion.temperature.push(valoracion.temperature);
      fuente.valoracion.turbidity.push(valoracion.turbidity);
      fuente.valoracion.depth.push(valoracion.depth);
      createWaterResourceId = await this.mongoDB.update(
        this.collection,
        fuente._id,
        {
          name,
          valoracion: fuente.valoracion,
          localizacion,
          date: moment().format("MMMM Do YYYY,h:mm:ssa"),
          idDispositivo: idDispositivo ? idDispositivo : 0,
        }
      );
    } else {
      createWaterResourceId = await this.mongoDB.create(this.collection, {
        name,
        valoracion: {
          ph: [valoracion.ph],
          conductivity: [valoracion.conductivity],
          temperature: [valoracion.temperature],
          turbidity: [valoracion.turbidity],
          depth: [valoracion.depth],
        },
        localizacion,
        date: moment().format("MMMM Do YYYY,h:mm:ssa"),
        idDispositivo: idDispositivo ? idDispositivo : 0,
      });
    }
    return createWaterResourceId;
  }

  async updateResources({ waterResourcesId, waterResources }) {
    const updateResourceId = await this.mongoDB.update(
      this.collection,
      waterResourcesId,
      waterResources
    );
    return updateResourceId;
  }

  async deletedResources({ waterResourcesId }) {
    const deleteResourceId = await this.mongoDB.delete(
      this.collection,
      waterResourcesId
    );
    return deleteResourceId;
  }
}

module.exports = WaterResourcesService;
