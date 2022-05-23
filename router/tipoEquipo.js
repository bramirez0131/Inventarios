const router = require("express").Router();
const TipoEquipo = require("../modelos/TipoEquipo")
const { validarTipoEquipo } = require("../helpers/validar-tipoEquipo");

router.post("/", async function(req, res) {
    console.log(`Request Params: ${req.body}`);
    try {
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
    
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar tipo equipo");
    }
});

router.get("/", async function(req, res) {
    try {
        const tipoequipos = await TipoEquipo.find();
        return res.send(tipoequipos);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar tipo equipo");
    }
});

router.put("/:tipoEquipoId", async function(req, res) {
    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(400).send("Tipo Equipo no existe");
        }

        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();
    
        tipoEquipo = await tipoEquipo.save();
        res.send(tipoEquipo);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar Tipo Equipo");
    }
});

module.exports = router;