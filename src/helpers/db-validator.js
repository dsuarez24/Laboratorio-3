const Role = require('../roles/role.model.js');
const User = require('../users/user.model.js');
const Empresa = require('../empresas/empresa.model.js');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
};

const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
};

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID: ${id} No existe`);
    }
};

const existeNombreEmpresa = async (nombre = '') => {
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
        throw new Error(`La empresa con el nombre ${nombre} ya existe en la base de datos`);
    }
};

const existeCorreoEmpresa = async (correo = '') => {
    const existeEmpresa = await Empresa.findOne({ correo });
    if (existeEmpresa) {
        throw new Error(`La empresa con el correo ${correo} ya existe en la base de datos`);
    }
};

module.exports = {
    esRoleValido,
    existenteEmail,
    existeUsuarioById,
    existeNombreEmpresa,
    existeCorreoEmpresa
};
