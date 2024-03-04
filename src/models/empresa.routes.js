const express = require("express");
const { check } = require("express-validator");
const empresaController = require("./empresa.controller.js");
const dbValidators = require("../helpers/db-validators.js");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");

const router = express.Router();

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").custom(dbValidators.existeNombreEmpresa).not().isEmpty(),
        check("impacto", "El impacto de la empresa es obligatorio").not().isEmpty(),
        check("años", "Los años de trayectoria son obligatorios").not().isEmpty(),
        check("telefono", "El telefono debe ser mayor a 8 caracteres").isLength({
            min: 8,
        }),
        check("categoria", "La categoria es obligatoria").not().isEmpty(),
        check("correo", "Este no es un correo valido").custom(dbValidators.existeCorreoEmpresa).isEmail(),
        validarCampos,
    ],
    empresaController.empresaPost
);

router.get("/", validarJWT, empresaController.companyGet);

router.get("/empresasAZ", validarJWT, empresaController.empresaGetZA);
router.get("/empresasZA", validarJWT, empresaController.empresasGetAZ);
router.get("/empresasMem", validarJWT, empresaController.empresasGetAMen);
router.get("/empresasMas", validarJWT, empresaController.empresasGetAMas);

router.get("/reportExcel", validarJWT, empresaController.generarExcelReporte);

module.exports = router;
