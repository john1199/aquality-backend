const express = require("express");
const { check, validationResult } = require("express-validator");
const WaterResourcesService = require("../services/waterresources");

function resourcesApi(app) {
  const router = express.Router();
  app.use("/api/waterresources", router);
  const waterServices = new WaterResourcesService();

  router.get("/", async function (req, res) {
    try {
      const waterResources = await waterServices.getListResources();
      return res
        .status(200)
        .json({ resources: waterResources, msg: "Sin errores" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.get("/:name", async function (req, res) {
    try {
      const { name } = req.params;
      const waterResource = await waterServices.getResources({ name });
      return res
        .status(200)
        .json({ resources: waterResource, msg: "Sin errores" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.post(
    "/add",
    [
      check("name", "Provide an name").exists(),
      check("valoracion", "Provide an object valoracion").exists(),
    ],
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { body: waterResource } = req;
        const resorceId = await waterServices.createResources({
          waterResource,
        });
        return res
          .status(200)
          .json({ resorceId: resorceId, msg: "Fuente añadida exitosamente" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  );

  router.put(
    "/edit/:waterResourcesId",
    [
      check("name", "Provide an name").exists(),
      check("valoracion", "Provide an object valoracion").exists(),
    ],
    async function (req, res) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        const { waterResourcesId } = req.params;
        const { body: waterResource } = req;
        console.log(waterResource);
        const fuente = await waterServices.get({ waterResourcesId });

        if (fuente) {
          const resorceId = await waterServices.updateResources({
            waterResourcesId,
            waterResource,
          });
          return res
            .status(200)
            .json({ resorceId: resorceId, msg: "Update Fuente successfully" });
        } else {
          res.status(400).json({ msg: "Fuente no exist" });
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    }
  );

  router.delete("/:waterResourcesId", async function (req, res) {
    const { waterResourcesId } = req.params;
    try {
      const fuente = await waterServices.get({ waterResourcesId });
      if (fuente) {
        const deleteId = await waterServices.deletedResources({
          waterResourcesId,
        });
        res
          .status(200)
          .json({ idFuente: deleteId, msg: "Delete Fuente successfully" });
      } else {
        res.status(400).json({ msg: "Fuente no exist" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message, msg: "Delete Fuente unsuccessfully" });
    }
  });
}

module.exports = resourcesApi;
