import { Module } from "@nestjs/common";
import { IProductRepository } from "./repository/product.repository.interface";
import { IProductService } from "./service/product.service.interface";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProductController } from "./controller/product.controller";
import { ProductService } from "./service/product.service";
import { ProductRepository } from "./repository/product.repository";

export const productServiceProvider = {
    provide: IProductService,
    useClass: ProductService,
}

export const productRepositoryProvider = {
    provide: IProductRepository,
    useClass: ProductRepository,
}

@Module({
    imports: [PrismaModule],
    controllers: [ProductController],
    providers: [
        productServiceProvider,
        productRepositoryProvider,
    ],
    exports: [productRepositoryProvider]
})

export class ProductModule { }