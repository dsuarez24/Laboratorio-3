const express = require('express');
// const bcryptjs = require('bcryptjs');
const Empresa = require('./empresa.model.js');
const ExcelJS = require('exceljs');

const { request, response } = express;

const empresaPost = async (req = request, res = response) => {
    const { nombre, impacto, años, telefono, categoria, correo } = req.body;
    const empresa = new Empresa({ nombre, impacto, años, telefono, categoria, correo });

    await empresa.save();

    res.status(200).json({
        empresa
    });
};

const companyGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, companies] = await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        companies
    });
};

const empresasGetAZ = async (req, res) => {
    const { limite, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ nombre: -1 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al listar empresas'
        });
    }
};

const empresaGetZA = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ nombre: 1 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'error con las empresas'
        });
    }
};

const empresaGetByYear = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort({ añosTrayectoria: -1 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            companies
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error to list Companies'
        });
    }
};

const empresasGetAMen = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ años: 1 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al listar empresas'
        });
    }
};

const empresasGetAMas = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ años: -1 })
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al listar empresas'
        });
    }
};

const generarExcelReporte = async (req, res) => {
    try {
        const empresas = await Empresa.find({}).exec();
        const workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet('Empresas');
        worksheet.addRow(['nombre', 'impacto', 'años', 'telefono', 'categoria', 'correo']);

        empresas.forEach(empresa => {
            worksheet.addRow([
                empresa.nombre,
                empresa.impacto,
                empresa.años,
                empresa.telefono,
                empresa.categoria,
                empresa.correo
            ]);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename="reporte_empresas.xlsx"');
        res.send(buffer);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Report no generated",
        });
    }
};

module.exports = {
    empresaPost,
    companyGet,
    empresasGetAZ,
    empresaGetZA,
    empresaGetByYear,
    empresasGetAMen,
    empresasGetAMas,
    generarExcelReporte
};
