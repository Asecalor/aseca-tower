import { Module } from "@nestjs/common";
import { ProviderRepository } from "./repository/provider.repository";
import { IProviderRepository } from "./repository/provider.repository.interface";
import { ProviderService } from "./service/provider.service";
import { IProviderService } from "./service/provider.service.interface";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProviderController } from "./controller/provider.controller";

export const providerRepositoryProvider = {
    provide: IProviderRepository,
    useClass: ProviderRepository,
};

export const providerServiceProvider = {
    provide: IProviderService,
    useClass: ProviderService,
};

@Module({
    imports: [PrismaModule],
    controllers: [ProviderController],
    providers: [
        providerRepositoryProvider,
        providerServiceProvider,
    ],
})

export class ProviderModule { }