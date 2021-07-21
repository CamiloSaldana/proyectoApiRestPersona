const request = require ('supertest');

const app = require('../src/index');

it('Responde un Json con lista de personas', done =>{
    request(app)
    .get('/listapersona')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,done);
})

it('Responde Json con una persona', done =>{
    request(app)
    .get('/:id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200,done);
})

it('Responde status de Persona Registrada',done =>{
    const data ={
        NombreCompleto: "Carlos Lopez",
        FechaNacimiento: "2021-07-20T05:00:00.000Z",
        NumeroDocumento: "1110145879",
        TipoPersona: 2,
        IdPadre: 1,
        IdMadre: 2
    }
    request(app)
    .post('/nuevaPersona')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect('{"Status":"Persona Registrada"}')
    .end(err => {
        if(err) return done(err);
        done();
    })
})

it('Responde Json con una persona eliminada', done =>{
    request(app)
    .delete('/eliminar/:id')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect('{"Status":"Persona Eliminada"}')
    .end(err => {
        if(err) return done(err);
        done();
    })
})
