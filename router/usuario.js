const router = require("express").Router();
const Usuario = require("../modelos/Usuario");
const { validarUsuario } = require("../helpers/validar-usuario");

router.post("/", async function(req, res) {
    console.log(`Request Params: ${JSON.stringify(req.body)}`);
    try {
        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeUsuario = await Usuario.findOne({email: req.body.email});
        if (existeUsuario) {
            return res.status(400).send("Email ya existe");
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();
        res.send(usuario);     
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar usuarios");
    }
});


router.get("/", async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        return res.send(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar usuarios");
    }
});


router.put("/:usuarioId", async function(req, res) {
    try {
        let usuario = await Usuario.findById(req.params.usuarioId);
        if(!usuario) {
            return res.status(400).send("Usuario no existe");
        }

        const validaciones = validarUsuario(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        const existeUsuario = await Usuario.findOne(
            { 
                email: req.body.email, 
                _id: { $ne: usuario._id } 
            }
        )
        if (existeUsuario) {
            return res.status(400).send("Email ya existe");
        }

        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.fechaActualizacion = new Date();
    
        usuario = await usuario.save();
        res.send(usuario);  

    } catch (error) {
        console.log(error);
        res.status(500).send("Ocurrio un error al consultar usuarios");
    }
});

module.exports = router;