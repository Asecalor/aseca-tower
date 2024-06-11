import { ConflictException, NotFoundException } from "@nestjs/common";
import { ProviderDTO } from "src/provider/dto/provider.dto";
import { Provider } from "src/provider/input/provider.input";
import { ProviderService } from "src/provider/service/provider.service";
import { IProviderService } from "src/provider/service/provider.service.interface";
import { productRepositoryMock, providerRepositoryMock } from 'test/util/mock';

describe("ProviderService", () => {
    let providerService: IProviderService;

    beforeEach(async () => {
        providerService = new ProviderService(providerRepositoryMock,productRepositoryMock);
        jest.clearAllMocks();
    });

    describe("createProvider", () => {

        const provider: Provider = {
            email: "test@example.com",
            name: "John",
            lastName: "Doe",
        };

        const providerDTO: ProviderDTO = {
            id: 1,
            email: "test@example.com",
            lastName: "Doe",
            name: "John",
        };

        it("should create a new provider", async () => {


            providerRepositoryMock.findByEmail = jest.fn().mockResolvedValue(null);

            providerRepositoryMock.create = jest.fn().mockResolvedValue(providerDTO);

            const result = await providerService.createProvider(provider);

            expect(providerRepositoryMock.findByEmail).toHaveBeenCalledWith(
                provider.email
            );
            expect(providerRepositoryMock.create).toHaveBeenCalledWith(provider);
            expect(result).toEqual(providerDTO);
        });

        it("should throw an error if provider already exists", async () => {

            providerRepositoryMock.findByEmail = jest.fn().mockResolvedValue(providerDTO);

            await expect(providerService.createProvider(provider)).rejects.toThrow(
                ConflictException
            );
            expect(providerRepositoryMock.findByEmail).toHaveBeenCalledWith(provider.email);
            expect(providerRepositoryMock.create).not.toHaveBeenCalled();
        });
    });

    describe("findAllProviders", () => {
        it("should return all providers", async () => {
            const providerDTOs: ProviderDTO[] = [
                { id: 1, email: "test1@example.com", name: "John", lastName: "Doe" },
                { id: 2, email: "test2@example.com", name: "Jane", lastName: "Doe" },
            ];

            providerRepositoryMock.findAll = jest.fn().mockResolvedValue(providerDTOs);

            const result = await providerService.findAllProviders();

            expect(providerRepositoryMock.findAll).toHaveBeenCalled();
            expect(result).toEqual(providerDTOs);
        });
    });

    describe("findProviderById", () => {
        it("should return the provider with the given id", async () => {
            const providerId = 1;
            const providerDTO: ProviderDTO = { id: 1, email: "test@example.com", name: "John", lastName: "Doe" };

            providerRepositoryMock.findById = jest.fn().mockResolvedValue(providerDTO);

            const result = await providerService.findProviderById(providerId);

            expect(providerRepositoryMock.findById).toHaveBeenCalledWith(providerId);
            expect(result).toEqual(providerDTO);
        });

        it("should throw error if provider is not found", async () => {
            const providerId = 1;

            providerRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            await expect(
                providerService.findProviderById(providerId)
            ).rejects.toThrow(NotFoundException);
        });
    });
});