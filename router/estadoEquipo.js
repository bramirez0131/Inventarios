const router = require("express").Router();
const EstadoEquipo = require("../modelos/EstadoEquipo")
const { validarEstadoEquipo } = require("../helpers/validar-estadoEquipo");

router.post("/", async function(req, res) {
    console.log(`Request Params: ${req.body}`);
    try {
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar estado equipo");
    }
});

router.get("/", async function(req, res) {
    try {
        const estadoequipos = await EstadoEquipo.find();
        return res.send(estadoequipos);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar estado equipo");
    }
});

router.put("/:estadoEquipoId", async function(req, res) {
    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo) {
            return res.status(400).send("Estado Equipo no existe");
        }

        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar Estado Equipo");
    }
});

module.exports = router;