const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server ON 3000"));
const expressFileUpload = require("express-fileupload");
//middleware con los parametros de uso
app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
      "El peso del archivo que intentas subir supera limite permitido ",
  })
);
//Definir la ruta public
app.use(express.static("public"));

//Ruta raíz para el formulario principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/formulario.html");
});

//Ruta para el collage
app.get("/collage", (req, res) => {
  res.sendFile(__dirname + "/public/collage.html");
});

//Ruta POST/imagen
//Ruta para el collage
app.post("/imagen", (req, res) => {
    // console.log("Valor de req: ", req);
    console.log("Valor de req.files: ", req.files);
    // doble destructuring, la propiedad foto la toma del name del input
    const { target_file } = req.files;
    // const { name } = target_file;
    //extraer del body la posición
    const { posicion } = req.body;
    console.log("target_file: ", target_file);
    console.log("posicion: ", posicion);
    
    // aplico metodo mv mover archivos a traves de http

    target_file.mv(`${__dirname}/public/imgs/imagen-${posicion}.jpg`, (err) => {
        // res.send("Archivo cargado con éxito");
        if (err) res.status(500).send(err)
            res.redirect("/collage");
    });
});
// ruta de eliminar
app.get('/delete/:nombre', (req,res) =>{
  const nombre = req.params.nombre;
  console.log("nombre:",nombre);
  console.log(req.params['nombre']);
  fs.unlink(`${__dirname}/public/imgs/${nombre}`, (err) => {
    if (err) res.status(500).send("la imagen seleccionada no existe: " + err.code)
      res.redirect("/collage");
  });
});

