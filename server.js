const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(express.static('.'))
app.use(bodyParser.urlencoded({extends: true}))
app.use(bodyParser.json())

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './upload') //va botar na pasta upload, que pŕecisei criar
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({storage}).single('arquivo') //dizendo que vou armazenar um arquivo

app.post('/upload', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.end("Deu erro")
        }

        res.end("concluido com sucesso")
    })
})

app.post('/formulario', (req, res) => {
    res.send({
        ...req.body,  // Usa o req.body agora que está sendo corretamente lido
        id: 1         // Adiciona o ID manualmente
    });
});

app.get('/parOuImpar', (req, res) => {

    let par;

    if (parseInt(req.query.numero) % 2 === 0) { //vai comparar o numero passado como parametro ao transformar ele em um int
        par = true; //com const ela estava em escopo local
    }

    else {
        par = false;
    }

    res.send({
        resultado: par ? "par" : "impar" //se par for true, retorna o do ?, e se for false retorna o do :
    })
})


app.get('/teste', (req, res) => {
    return res.send("ok")
})

app.listen(8080, () => {
    console.log("Executando e escutando na porta 8080")
})