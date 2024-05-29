import { IReviewRepository } from "src/review/repository/review.repository.interface";

const reviewRepositoryMock: IReviewRepository = {
    create: jest.fn(),
    findRatings: jest.fn(),
    findRatingsByProviderId: jest.fn(),
}

export { reviewRepositoryMock };