import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientDTO } from 'src/client/dto/client.dto';
import { CreateClient } from 'src/client/input/client.input';
import { ClientService } from 'src/client/service/client.service';
import { IClientService } from 'src/client/service/client.service.interface';
import { clientRepositoryMock } from 'test/util/mock';

const createClientDto: CreateClient = {
    address: 'CALLE 13',
    email: "a@mail.com",
    name: "John",
    lastName: "Doe",
};

const expectedClient: ClientDTO = {
    id: 1,
    address: 'CALLE 13',
    email: "a@mail.com",
    name: "John",
    lastName: "Doe",
};

const existingClient: ClientDTO = {
    id: 1,
    address: 'CALLE 13',
    email: "a@mail.com",
    name: "John",
    lastName: "Doe",
};


describe('ClientService', () => {
    let clientService: IClientService;

    beforeEach(async () => {
        clientService = new ClientService(clientRepositoryMock);
        jest.clearAllMocks();
    });

    describe('createClient', () => {
        it('should create a new client', async () => {

            clientRepositoryMock.findByEmail = jest.fn().mockResolvedValue(null);
            clientRepositoryMock.create = jest.fn().mockResolvedValue(expectedClient);

            const result = await clientService.createClient(createClientDto);

            expect(clientRepositoryMock.findByEmail).toHaveBeenCalledWith(createClientDto.email);
            expect(clientRepositoryMock.create).toHaveBeenCalledWith(createClientDto);
            expect(result).toEqual(expectedClient);
        });

        it('should throw an error if a client already exists', async () => {

            clientRepositoryMock.findByEmail = jest.fn().mockResolvedValue(existingClient);

            await expect(clientService.createClient(createClientDto)).rejects.toThrow(ConflictException);
            expect(clientRepositoryMock.findByEmail).toHaveBeenCalledWith(createClientDto.email);
            expect(clientRepositoryMock.create).not.toHaveBeenCalled();
        });
    });

    describe('findAllClients', () => {
        it('should return an array of clients', async () => {
            const expectedClients: ClientDTO[] = [
                existingClient
            ];

            clientRepositoryMock.findAll = jest.fn().mockResolvedValue(expectedClients);

            const result = await clientService.findAllClients();

            expect(clientRepositoryMock.findAll).toHaveBeenCalled();
            expect(result).toEqual(expectedClients);
        });
    });

    describe('findClientById', () => {
        it('should return a client by id', async () => {
            const id = 1;

            clientRepositoryMock.findById = jest.fn().mockResolvedValue(expectedClient);

            const result = await clientService.findClientById(id);

            expect(clientRepositoryMock.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedClient);
        });

        it('should return null if client not found', async () => {
            const id = 1;

            clientRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            const result = await clientService.findClientById(id);

            expect(clientRepositoryMock.findById).toHaveBeenCalledWith(id);
            expect(result).toBeNull();
        })
    });
});