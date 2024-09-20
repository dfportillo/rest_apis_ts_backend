import Product from "../models/Product.model";
// --------------------------------------------------------------------
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {

    
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'avialability'] }
        });
        res.json({ data: products })
    
}

export const getProductByID = async (req: Request, res: Response) => {

        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({
                error: 'el id del producto no existe ...'
            })
        }

        res.json({ data: product })
}

export const createProduct = async (req: Request, res: Response) => {

        // create / post product
        const product = await Product.create(req.body)
        res.status(201).json({ data: product })
}

export const updateProductPUT = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) { // confirmacion de existencia de producto
        return res.status(404).json({
            error: 'el id del producto no existe ...'
        })
    }

    // actualizacion

    await product.update(req.body)

    //* sin proteccion de 'update'
    // product.name = req.body.name
    // product.price = req.body.price
    // product.avialability = req.body.avialability

    await product.save()

    res.json({ data: product })
}

export const updateProductPatch = async ( req: Request, res: Response) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) { // confirmacion de existencia de producto
        return res.status(404).json({
            error: 'el id del producto no existe ...'
        })
    }

    // actualizacion

    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {

    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) { // confirmacion de existencia de producto
        return res.status(404).json({
            error: 'el id del producto no existe ...'
        })
    }

    await product.destroy();
    res.json({data: 'producto eliminado'})
}