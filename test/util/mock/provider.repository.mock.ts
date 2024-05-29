import { IProviderRepository } from "src/provider/repository/provider.repository.interface";

const providerRepositoryMock: IProviderRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
}

export { providerRepositoryMock };