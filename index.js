const express=require('express');
const app=express();
var bodyParser=require('body-parser');
const mongoCliente =require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var bd;

mongoCliente.connect('mongodb+srv://<usuario>:<password>@cluster0.cjknm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (error, database)=>{
    if(error) return console.log(error);
    bd=database.db('Ejemplo');
    console.log('Conexion a MongoDB exitosa')
})

app.post('/add', async(req,res)=>{
    const data=req.body;
    console.log(data);
    bd.collection('bases1').insert(data, (error,resultado)=>{
        if(error){
            console.log(error)
            res.send('Error al insertar')
        }else{
            console.log(resultado);
            res.send('Insercion correcta')
        }
    })
})

app.get('/consultar', async(req,res)=>{

    bd.collection('bases1').find().toArray( (error,datos)=>{
        if(error){
            console.log(error)
            res.send('Error al consultar')
        }
        res.send(datos)
    })
})

app.listen(5000,function(){
    console.log('Corriendo en el puerto 5000');
})