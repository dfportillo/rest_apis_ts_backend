import { createProduct, deleteProduct, getProductByID, getProducts, updateProductPatch, updateProductPUT } from "./handlers/product";
// ------------------------------------------------------------------------------------
import { Router } from "express";
import { body, param } from 'express-validator';
import { handleInputErrors } from "./middleware";


const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The product name
 *                      example: Monitor curvo de 49 pulg
 *                  price:
 *                      type: number
 *                      description: The product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 * 
 * 
 * 
 * 
 */


// routing 

/** 
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 * 
 * 
 * 
*/

router.get('/', getProducts);

/** 
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on a unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the producto to retrive
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          400: 
 *              description: Bad request invalid ID
 *              
 * 
 * 
 * 
 * 
 * 
 * 
 * */ 

router.get('/:id',

    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    getProductByID);


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:   
 *          - Products
 *      description: Return a new record in the data base 
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name:
 *                              type: string
 *                              example: "monitor curvo 49 pulg"
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201: 
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 * 
 * 
*/

router.post('/',

    // validacion
    body('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio...'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('el precio del producto no puede ir vacio...')
        .custom(value => value > 0).withMessage('el valor dado tiene que ser mayor a 0'),
    handleInputErrors,
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Retuns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the producto to update
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties: 
 *                          name:
 *                              type: string
 *                              example: "monitor curvo 49 pulg"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: bad Request - invalid ID or Invalid input Data
 *          404:
 *              description: Product not found
 * 
 */

router.put('/:id', 
    
    // validacion
    param('id').isInt().withMessage('id no valido'),
    body('name')
        .notEmpty().withMessage('el nombre del producto no puede ir vacio...'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('el precio del producto no puede ir vacio...')
        .custom(value => value > 0).withMessage('el valor dado tiene que ser mayor a 0'),

    body('availability')
        .isBoolean().withMessage('la propiedad tiene que ser true ó false...'),
    handleInputErrors,
    updateProductPUT)

/** 
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update Product availability
 *      tags:
 *          - Products
 *      description: Retutns the updated availability  
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the producto to update
 *          required: true
 *          schema:
 *              type: integer
 * 
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Bad request - Invaild ID
 *          400:
 *              description: product not found
*/

router.patch('/:id', 
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    updateProductPatch)

/** 
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Deletes product by a given Id
 *      tags:
 *          - Products
 *      description: retuns a confirmation message  
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product deleted
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful elimination
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          description: elimination success message
 *                          example: 'producto eliminado'
 *          400:
 *              description: Bad request - invalid ID
 *          404:
 *              description: Product not found
 *                              
 * 
*/

router.delete('/:id',
    param('id').isInt().withMessage('id no valido'),
    handleInputErrors,
    deleteProduct
)

export default router