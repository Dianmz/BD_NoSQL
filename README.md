<h1> <b> Bases de Datos NoSQL </b> </h1>

## **Descripción**

Este proyecto consiste en el desarrollo de un servidor de *NodeJS* que realiza a través de peticiones la insercion y consulta de datos a una base de datos no 
relacional de *MongoDB*, los datos pueden ser visualizados tanto utilizando *Mongo Compass* así como en la nube, através de *Mongo Atlas* utilizando la cadena 
de conexión que proporciona este almacén de datos.

---

## **Contenido**

> * [Descripción](#Descripción)
> * [Levantamiento del Proyecto](#Levantamiento-del-Proyecto)
> * [Código](#Código)
>   * [Paquetes](#Paquetes)
>   * [Cadena de conexión](#Cadena-de-conexión)
>   * [Consultas](#Consultas)
> * [Enlaces de herramientas utilizadas](#Enlaces-de-herramientas-utilizadas)

---

## **Levantamiento del Proyecto**

```javascript
  npm install
```

## **Código**

### Paquetes

1. Express
2. Body-Parser
3. MongoClient

### Cadena de conexión

Se define una variable *bd* que va a contener la conexión a la base de datos. En la cadena de conexión que proporciona **Mongo Atlas** reemplazar los campos de 
*usuario* y *password* con el usuario y contraseña creados. Cuando se le asigna a la variable *bd* la conexión, se define a que *Cluster* se va a conectar.

```javascript
  var bd;

  mongoCliente.connect('mongodb+srv://<usuario>:<password>@cluster0.cjknm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (error, database)=>{
    if(error) return console.log(error);
    bd=database.db('Ejemplo');
    console.log('Conexion a MongoDB exitosa')
  });

```

### Consultas

La consulta en la petición **/add** se encarga de agregar registros a la base de datos para luego ser visualizados, obteniendo a través de la variable *bd* la 
colección en la que se va a insertar a través de la instrucción *insert*. Esta instrucción ha sido descontinuada y puede reeemplazarse con *insertOne*.


```javascript
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
```

La consulta en la petición **/consultar** se encarga de devolver los registros de la colección que se defina a través de la variable *bd* y la instrucción 
*find()*.

```javascript
  app.get('/consultar', async(req,res)=>{

    bd.collection('bases1').find().toArray( (error,datos)=>{
        if(error){
            console.log(error)
            res.send('Error al consultar')
        }
        res.send(datos)
    })
})
```

---

## **Enlaces de herramientas utilizadas**

- [MongoDB](https://www.mongodb.com)
