import { IProductRepository } from "src/product/repository/product.repository.interface";

const productRepositoryMock: IProductRepository = {
    findByName: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findAllByProvider: jest.fn()
};

export { productRepositoryMock };