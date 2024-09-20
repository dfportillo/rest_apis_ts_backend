import server from '../../server';
//----------------------------------------------------------------
import request from 'supertest';

describe('POST /api/products', () => {
    it('should display validation erros', async () => {
        const res = await request(server).post('/api/products').send({})

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(4)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(0)

    })

    it('value must be above 0', async () => {
        const res = await request(server).post('/api/products').send({
            name:'telefono samsung - testing',
            price:0
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(0)

    })

    it('should validate price is a number and greater that 0', async () => {
        const res = await request(server).post('/api/products').send({
            name:'telefono samsung - testing',
            price:'hola'
        })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)

        expect(res.status).not.toBe(404)
        expect(res.body.errors).not.toHaveLength(0)

    })

    it('should create a new product', async () => {
        const res = await request(server).post('/api/products').send({
            name: "audifonos - testing",
            price: 150
        })

        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('GET /api/products', () =>{

    it('should check it api/products url exists', async () =>{
        const res = await request(server).get('/api/products')
        expect(res.status).not.toBe(404)
    })

    it('GET a json response with products', async () =>{
        const res = await request(server).get('/api/products')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveLength(1)

        
        expect(res.body).not.toHaveProperty('errors')

    })
})

describe('GET /apo/products/:id',() =>{
    it('should return a 404 response for a non existing product', async () =>{
        const productId = 2000 ; 
        const res = await request(server).get(`/api/products/${productId}`);

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('el id del producto no existe ...')
    })

    it('should check a valid id', async () =>{
        const res = await request(server).get('/api/products/not-valid-url');

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('id no valido')
    })

    it('get a json response for a single product', async () =>{
        const res = await request(server).get('/api/products/1');

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
    })
})

describe('PUT /api/products/:id', ()=>{

    it('should check a valid id', async () =>{
        const res = await request(server)
                            .put('/api/products/not-valid-url')
                            .send({
                                name:'motivor curvo test',
                                    avialability: true,
                                    price: 300
                            });

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(1)
        expect(res.body.errors[0].msg).toBe('id no valido')
    })

    it('should display validation error messages when updating a product', async () =>{
        const res = await request(server).put('/api/products/1').send({})
        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toBeTruthy()
        expect(res.body.errors).toHaveLength(5)

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('it cant be a price < 0 ', async () =>{
        const res = await request(server)
                            .put('/api/products/1')
                            .send({
                                    name:'motivor curvo test',
                                    availability: true,
                                    price: -300
                                })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors).toHaveLength(2)
        expect(res.body.errors[0].msg).toBe('el valor dado tiene que ser mayor a 0')

        expect(res.status).not.toBe(200)
        expect(res.body.errors).not.toBeFalsy
    })

    it('should return 404 for a non-existing product ', async () =>{

        const productId = 2000
        const res = await request(server)
                            .put(`/api/products/${productId}`)
                            .send({
                                    name:'motivor curvo test',
                                    avialability: true,
                                    price: 300
                                })

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error')
        expect(res.body.error).toBe('el id del producto no existe ...')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })


    it('update an existing product with a valid data', async () =>{

        const res = await request(server)
                            .put('/api/products/1')
                            .send({
                                    name:'motivor curvo test',
                                    avialability: true,
                                    price: 300
                                })

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')

        expect(res.status).not.toBe(404)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('PATCH /api/productos/:id', () =>{

    it('should return 404 for a non-existing id', async() =>{
        const productId = 2000;
        const res = await request(server).patch(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body.error).toBe('el id del producto no existe ...')

        expect(res.status).not.toBe(200)
        expect(res.body).not.toHaveProperty('data')
    })

    it('should update a data',async () =>{
        const res = await request(server).patch('/api/products/1')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data.availability).toBe(false)

        expect(res.status).not.toBe(404)
        expect(res.status).not.toBe(400)
        expect(res.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/products/:id', () =>{
    it('should check a valid id ', async () =>{
        const res = await request(server).delete('/api/products/not-valid-url')

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('errors')
        expect(res.body.errors[0].msg).toBe('id no valido')
    })
    
    it('should return a 404 response for a non-existing product', async () =>{
        const productId = 2000
        const res = await request(server).delete(`/api/products/${productId}`)

        expect(res.status).toBe(404)
        expect(res.body.error).toBe('el id del producto no existe ...')

        expect(res.status).not.toBe(200)
    })

    it('should delete a product', async ()=>{
        const res = await request(server).delete('/api/products/1')

        expect(res.status).toBe(200)
        expect(res.body.data).toBe('producto eliminado')

        expect(res.status).not.toBe(400)
        expect(res.status).not.toBe(404)
    })
})