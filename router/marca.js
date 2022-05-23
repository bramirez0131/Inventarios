const router = require("express").Router();
const Marca = require("../modelos/Marca")
const { validarMarca } = require("../helpers/validar-marca");

router.post("/", async function(req, res) {
    console.log(`Request Params: ${req.body}`);
    try {
        const validaciones = validarMarca(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
        res.send(marca);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar marca");
    }
});

router.get("/", async function(req, res) {
    try {
        const marcas = await Marca.find();
        return res.send(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar marcas");
    }
});

router.put("/:marcaId", async function(req, res) {
    try {
        let marca = await Marca.findById(req.params.marcaId);
        if(!marca) {
            return res.status(400).send("Marca no existe");
        }

        const validaciones = validarMarca(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }
        
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
        res.send(tipoEquipo);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar Marca");
    }
});

module.exports = router;