import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { IProductService } from "../service/product.service.interface";
import { ProductDTO } from "../dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateProduct } from "../input/product.input";
import { ProductProviderDTO } from '../dto/product.provider.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(private readonly productService: IProductService) { }

    @Post()
    @ApiResponse({status: 201, type: ProductDTO})
    async createProduct(@Body() product: CreateProduct): Promise<ProductDTO> {
        return this.productService.createProduct(product);
    }

    @Get()
    @ApiResponse({status: 200, type: [ProductDTO]})
    async getProducts(): Promise<ProductDTO[]> {
        return this.productService.findAllProducts();
    }

    @Get('/provider')
    @ApiResponse({status: 200, type: [ProductProviderDTO]})
    async getProductsProvider(): Promise<ProductProviderDTO[]> {
        return this.productService.findAllProductsByProvider();
    }



    @Get('/:id')
    @ApiResponse({status: 200, type: ProductDTO})
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