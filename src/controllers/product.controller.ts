import { NextFunction, Request, Response } from "express"
import { prismaClient } from ".."
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCodes } from "../exceptions/root";

export const createProduct=async (req:Request,res:Response,next:NextFunction)=>{
  
    const product =await prismaClient.product.create({
       data:{
        ...req.body,
        tags: req.body.tags.join(",")
       }
   })
   res.json(product);
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
 try{
    const product = req.body;
    if(product.tags){
        product.tags = product.tags.join(",")
    }
    const { id } = req.params;
  const updateProduct = await prismaClient.product.update({
    where: { id: Number(id) },
    data: product,
  });
  res.json(updateProduct);
}catch(error){
   throw new NotFoundException('product not found',ErrorCodes.PRODUCT_NOT_FOUND) 
}
 
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    const product = await prismaClient.product.delete({
    where: { id: Number(id) },
  });
  res.json(product);
  }catch(error){
    throw new NotFoundException('product not found',ErrorCodes.PRODUCT_NOT_FOUND)
  }
 
}


export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    const product = await prismaClient.product.findUnique({
    where: { id: +req.params.id },
    });
    if(!product){
        throw new NotFoundException('product not found',ErrorCodes.PRODUCT_NOT_FOUND)  
    }
    res.json(product);

 }

  


export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const count = await prismaClient.product.count();
  
  const products = await prismaClient.product.findMany({
    skip: Number(req.query.skip) || 0,
    take: Number(req.query.take) || count,
  });
  res.json({count,data:products});
}