const WaterResource = require("../models/WaterResources");
const moment = require("moment");

exports.getListResources = async () => {
    await WaterResource.find({}).exec();
};

exports.getResources = async ({ name }) => {
    await WaterResource.findOne({ name });
};
exports.get = async ({ waterResourcesId }) => {};

exports.updateResources = async ({ waterResourceExists, valoracion }) => {
    waterResourceExists.valoracion.pH.push(valoracion.pH[0]);
    waterResourceExists.valoracion.conductivity.push(valoracion.conductivity[0]);
    waterResourceExists.valoracion.temperature.push(valoracion.temperature[0]);
    waterResourceExists.valoracion.turbidity.push(valoracion.turbidity[0]);
    waterResourceExists.valoracion.depth.push(valoracion.depth[0]);
    await WaterResource.findOneAndUpdate(
        { _id: waterResourceExists._id },
        { $set: waterResourceExists },
        { new: true }
    );
};

exports.createResources = async ({ waterResource }) => {
    let createWaterResourceId = null;
    const { name, valoracion } = waterResource;
    const waterResourceExists = await WaterResource.findOne({ name });
    if (waterResourceExists) {
        createWaterResourceId = this.updateResources({ waterResourceExists, valoracion });
    } else {
        waterResource.date = moment().format("MMMM Do YYYY, h:mm:ss a");
        createWaterResourceId = await waterResource.save();
    }
    return createWaterResourceId;
};
