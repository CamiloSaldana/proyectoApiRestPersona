const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/api/crear-tabla', function (req, res) {
    con.connect(function(err) {
      if (err) throw err;
      const sql = `
      CREATE TABLE IF NOT EXISTS Persona (
        Id int NOT NULL auto_increment,/*Se adiciona campo Id para poder manipular el registro especifico*/
    NombreCompleto varchar(100),
    FechaNacimiento datetime,
    NumeroDocumento Varchar(50),/*Se adiciona para controlar que el usuario ya se encuentre registrado*/
    TipoPersona smallint,/*Se adiciona para identificar el tipo persona 1-Ninguno, 2-Padre, 3-Madre*/
    IdPadre int,/*Se adiciona campo para identificar el padre de la persona*/
    IdMadre int,/*Se adiciona campo para identificar la madre de la persona*/
    Estado bit default 1,/*Se adiciona para realizar eliminación lógica y no física*/
    primary key(Id)
      )  ENGINE=INNODB;
    `;
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("numbers table created");
      });
    });
  })

router.get('/api/listapersona', (req, res) =>{
    mysqlConnection.query('SELECT * FROM Persona WHERE Estado=1', (err, rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/api/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query('SELECT * FROM Persona WHERE id = ? and Estado=1',[id], (err, rows,fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.get('/api/:documento', (req, res) =>{
    const {documento} = req.params;
    mysqlConnection.query('SELECT * FROM Persona WHERE id = ? and Estado=1',[documento], (err, rows,fields) => {
        if(!err){
            res.json(rows[0]);
        }else{
            console.log(err);
        }
    });
});

router.post('/api/nuevaPersona', (req, res) => {
    const {NombreCompleto,FechaNacimiento,NumeroDocumento,TipoPersona,IdPadre,IdMadre} = req.body;
    console.log(req.body);
    mysqlConnection.query('INSERT INTO Persona( NombreCompleto,FechaNacimiento,NumeroDocumento,TipoPersona,IdPadre,IdMadre) VALUES (?,?,?,?,?,?)',
    [NombreCompleto,FechaNacimiento,NumeroDocumento,TipoPersona,IdPadre,IdMadre],(err, rows,fields) =>{
        if(!err){
            res.json({Status: 'Persona Registrada'});
        }else{
            console.log(err);
        }
    });
});

router.delete('/api/eliminar/:id',(req, res) => {
    const {id} = req.params;
    
    mysqlConnection.query('Update Persona set Estado=0 where Id = ?',[id] ,(err, rows,fields) => {
        if(!err){
            res.json({Status: 'Persona Eliminada'});
        }else{
            console.log(err);
        }
    });

});

module.exports = router;