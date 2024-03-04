import Role from '../roles/role.model.js';
import User from '../users/user.model.js'
import Empresa from '../empresas/empresa.model.js'

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const existeNombreEmpresa = async (nombre = '') => {
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
        throw new Error(`La empresa con el nombre ${nombre} ya existe en la base de datos`);
    }
}

export const existeCorreoEmpresa = async (correo = '') => {
    const existeEmpresa = await Empresa.findOne({ correo });
    if (existeEmpresa) {
        throw new Error(`La empresa con el correo ${correo} ya existe en la base de datos`);
    }
}