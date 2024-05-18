export abstract class IClientRepository {
  abstract getClientAddress(clientId: number): Promise<string | null>;
}
