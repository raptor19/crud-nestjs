import { Controller, Post, Body, Res, HttpStatus, Get, Param, NotFoundException, Delete, Query, Put } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Post('/create')
    async createProduct(@Res() res:any, @Body() createProductDTO: CreateProductDTO){
        const newProduct = await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'product created!',
            product: newProduct
        });
    }
    // Traer todos los productos
    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK).json({
            message: 'get products',
            products        
        })
    }
    // Consultar producto
    @Get('/:productId')
    async getProduct(@Res() res, @Param('productId') productId) {
        const product = await this.productService.getProduct(productId);
        if (!product) throw new NotFoundException('Product does not exit');
        res.status(HttpStatus.OK).json({
            message: 'get product',
            product        
        })
    }
    // Eliminar producto
    @Delete('/delete')
    async deleteProduct(@Res() res, @Query('productId') productId) {
        const deletedProduct = await this.productService.deleteProduct(productId);
        if (!deletedProduct) throw new NotFoundException('Product does not exit');
        res.status(HttpStatus.OK).json({
            message: 'product deleted',
            deletedProduct        
        })
    }
    //Modificar Producto
    @Put('/update')
    async updateProduct(@Res() res,@Body() createProductDTO: CreateProductDTO, @Query('productId') productId) {
        const updatedProduct = await this.productService.updateProduct(productId,createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exit');
        res.status(HttpStatus.OK).json({
            message: 'product updated',
            updatedProduct        
        })
    }

    
}