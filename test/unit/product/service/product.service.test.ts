import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductDTO } from "src/product/dto";
import { CreateProduct } from "src/product/input/product.input";
import { ProductService } from "src/product/service/product.service";
import { IProductService } from "src/product/service/product.service.interface";
import { productRepositoryMock } from "test/util/mock";

describe("ProductService", () => {
    let productService: IProductService;

    beforeEach(async () => {
        productService = new ProductService(productRepositoryMock)
        jest.clearAllMocks();
    });

    describe("createProduct", () => {
        it("should create a new product", async () => {
            const product: CreateProduct = {
                name: "Test Product",
            };

            productRepositoryMock.findByName = jest.fn().mockResolvedValue(null);
            productRepositoryMock.create = jest.fn().mockResolvedValue({ id: 1, ...product });

            const result = await productService.createProduct(product);

            expect(productRepositoryMock.findByName).toHaveBeenCalledWith(product.name);
            expect(productRepositoryMock.create).toHaveBeenCalledWith(product);
            expect(result).toEqual({ id: 1, ...product });
        });

        it("should throw an error if a product with the same name already exists", async () => {
            const product: CreateProduct = {
                name: "Test Product",
            };

            productRepositoryMock.findByName = jest.fn().mockResolvedValue({ id: 1, ...product });

            await expect(productService.createProduct(product)).rejects.toThrow(
                ConflictException
            );
            expect(productRepositoryMock.findByName).toHaveBeenCalledWith(product.name);
            expect(productRepositoryMock.create).not.toHaveBeenCalled();
        });
    });

    describe("deleteProduct", () => {
        it("should delete a product by id", async () => {
            const productId = 1;

            productRepositoryMock.findById = jest.fn().mockResolvedValue({ id: productId });

            await productService.deleteProduct(productId);

            expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
            expect(productRepositoryMock.delete).toHaveBeenCalledWith(productId);
        });

        it("should throw a NotFoundException if the product does not exist", async () => {
            const productId = 1;

            productRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            await expect(productService.deleteProduct(productId)).rejects.toThrow(
                NotFoundException
            );
            expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
            expect(productRepositoryMock.delete).not.toHaveBeenCalled();
        });
    });

    describe("findAllProducts", () => {
        it("should return an array of products", async () => {
            const products: ProductDTO[] = [
                { id: 1, name: "Product 1" },
                { id: 2, name: "Product 2" },
                // Add more products as needed
            ];

            productRepositoryMock.findAll = jest.fn().mockResolvedValue(products);

            const result = await productService.findAllProducts();

            expect(productRepositoryMock.findAll).toHaveBeenCalled();
            expect(result).toEqual(products);
        });
    });

    describe("findProductById", () => {
        it("should return a product by id", async () => {
            const productId = 1;
            const product: ProductDTO = { id: productId, name: "Test Product" };

            productRepositoryMock.findById = jest.fn().mockResolvedValue(product);

            const result = await productService.findProductById(productId);

            expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
            expect(result).toEqual(product);
        });

        it("should throw an error if the product does not exist", async () => {
            const productId = 1;

            productRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            await expect(
                productService.findProductById(productId)
            ).rejects.toThrow(NotFoundException);
            expect(productRepositoryMock.findById).toHaveBeenCalledWith(productId);
        });
    });
});