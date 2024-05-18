export const clientRepositoryMock= {
  getClientAddress: jest.fn(),
}

export const getClientAddressMockWithSuccesfulResponse= (id: number): string =>{
  return 'some address'
}

export const getClientAddressMockWithUnSuccesfulResponse= (id: number): null =>{
  return null
}