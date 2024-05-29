import { CompleteOrderDTO } from "src/order/dto";
import { CreateOrder } from "src/order/input";
import { IOrderRepository } from "src/order/repository/order.repository.interface";


const orderRepositoryMock: IOrderRepository = {
  create: jest.fn(),
  createLog: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
  findById: jest.fn(),
  findByClientId: jest.fn(),
  findByStatus: jest.fn(),
  getProductOrdersByOrderId: jest.fn(),
  getStatus: jest.fn(),
  update: jest.fn(),
};


export { orderRepositoryMock };