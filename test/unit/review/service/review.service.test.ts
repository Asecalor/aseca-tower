import { Test, TestingModule } from '@nestjs/testing';
import { IProviderRepository } from 'src/provider/repository/provider.repository.interface';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { IReviewService } from 'src/review/service/review.service.interface';
import { ReviewService } from 'src/review/service/review.service';
import { orderRepositoryMock, providerRepositoryMock, reviewRepositoryMock } from 'test/util/mock';
import { Review } from 'src/review/input/review.input';
import { CompleteOrderDTO, OrderDTO } from 'src/order/dto';
import { OrderStatus } from 'src/order/model';
import { ReviewRatingDTO } from 'src/review/dto/review-rating.dto';
import { ReviewDTO } from 'src/review/dto/review.dto';

describe('ReviewService', () => {
    let reviewService: IReviewService;

    beforeEach(async () => {
        reviewService = new ReviewService(reviewRepositoryMock, orderRepositoryMock, providerRepositoryMock);
        jest.clearAllMocks();
    });

    describe('createReview', () => {
        const review: ReviewDTO = {
            orderId: 1,
            clientId: 1,
            rating: 5,
            comment: 'Great service!',
        };

        const order: CompleteOrderDTO = {
            id: 1,
            clientId: review.clientId,
            status: 'DELIVERED',
            totalAmount: 100,
            providerId: 1,
            products: []
        };

        it('should create a review and update the order status', async () => {
            const orderId = 1;


            orderRepositoryMock.findById = jest.fn().mockResolvedValue(order);

            await reviewService.createReview(orderId, review);

            expect(orderRepositoryMock.findById).toHaveBeenCalledWith(orderId);
            expect(reviewRepositoryMock.create).toHaveBeenCalledWith(review, order.providerId);
            expect(orderRepositoryMock.update).toHaveBeenCalledWith(orderId, OrderStatus.REVIEWED);
        });

        it('should throw an error if order is not found', async () => {
            const orderId = 1;

            orderRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            await expect(reviewService.createReview(orderId, review)).rejects.toThrow(NotFoundException);
            expect(reviewRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should throw an error if client is not allowed to review the order', async () => {
            const orderId = 1;
    
            const order: CompleteOrderDTO = {
                id: 1,
                clientId: 2,
                status: 'DELIVERED',
                totalAmount: 100,
                providerId: 1,
                products: []
            };


            orderRepositoryMock.findById = jest.fn().mockResolvedValue(order);

            await expect(reviewService.createReview(orderId, review)).rejects.toThrow(ConflictException);
            expect(reviewRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should throw an error if order has not been delivered yet', async () => {
            const orderId = 1;
            const review: Review = {
                clientId: 1,
                rating: 5,
                comment: 'Great service!',
            };

            const order: CompleteOrderDTO = {
                id: orderId,
                clientId: review.clientId,
                status: 'PENDING',
                totalAmount: 100,
                providerId: 1,
                products: []
            };

            orderRepositoryMock.findById = jest.fn().mockResolvedValue(order);

            await expect(reviewService.createReview(orderId, review)).rejects.toThrow(ConflictException);
            expect(reviewRepositoryMock.create).not.toHaveBeenCalled();
        });
    });

    describe('findAllByProvider', () => {
        it('should return an array of review ratings', async () => {
            const reviewRatings: ReviewRatingDTO[] = [
                { providerId: 1, rating: 4.5 },
                { providerId: 2, rating: 3.8 },
            ];

            reviewRepositoryMock.findRatings = jest.fn().mockResolvedValue(reviewRatings);

            const result = await reviewService.findAllByProvider();

            expect(reviewRepositoryMock.findRatings).toHaveBeenCalled();
            expect(result).toEqual(reviewRatings);
        });
    });

    describe('findByProvider', () => {
        it('should return the review rating for the specified provider', async () => {
            const providerId = 1;
            const provider = { id: providerId };
            const reviewRating = { providerId, averageRating: 4.5 };

            providerRepositoryMock.findById = jest.fn().mockResolvedValue(provider);
            reviewRepositoryMock.findRatingsByProviderId = jest.fn().mockResolvedValue(reviewRating);

            const result = await reviewService.findByProvider(providerId);

            expect(providerRepositoryMock.findById).toHaveBeenCalledWith(providerId);
            expect(reviewRepositoryMock.findRatingsByProviderId).toHaveBeenCalledWith(providerId);
            expect(result).toEqual(reviewRating);
        });

        it('should throw an error if provider is not found', async () => {
            const providerId = 1;

            providerRepositoryMock.findById = jest.fn().mockResolvedValue(null);

            await expect(reviewService.findByProvider(providerId)).rejects.toThrow(NotFoundException);
        });
    });
});