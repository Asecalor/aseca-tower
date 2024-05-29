import { IClientRepository } from "src/client/repository/client.repository.interface";

const clientRepositoryMock: IClientRepository = {
  getClientAddress: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
};

export { clientRepositoryMock };
