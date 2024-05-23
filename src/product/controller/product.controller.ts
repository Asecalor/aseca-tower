import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { IProductService } from "../service/product.service.interface";
import { CreateProductDTO, ProductDTO } from "../dto";

@Controller('product')
export class ProductController {

    constructor(private readonly productService: IProductService) { }

    @Post()
    async createProduct(@Body() product: CreateProductDTO): Promise<ProductDTO> {
        return this.productService.createProduct(product);
    }

    @Get()
    async getProducts(): Promise<ProductDTO[]> {
        return this.productService.findAllProducts();
    }

    @Get('/:id')
    async getProductById(@Param('id', ParseIntPipe) productId: number): Promise<ProductDTO> {
        return this.productService.findProductById(productId);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id', ParseIntPipe) productId: number): Promise<void> {
        return this.productService.deleteProduct(productId);
    }

    // @Put('/:id')
    // async updateProduct(@Param('id', ParseIntPipe) productId: number, @Body() updatedProduct: CreateProductDTO): Promise<ProductDTO> {
    //     return this.productService.;
    // }
}