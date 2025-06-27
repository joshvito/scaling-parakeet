import { ddosRequests } from '../test-data/requests-ddos';
import { AttackType, FileSystemLogger } from '../logger.service';
import { okRequests } from '../test-data/requests-ok';
import { DdosMiddleware } from './ddos.middleware';
jest.mock('../logger.service');

describe('DdosMiddleware', () => {
    let middleware: DdosMiddleware;
    let mocklogger: FileSystemLogger;
    const mockResponse = [{ id: 1, name: 'Unit Tests are cool', first: 'Luke', last: 'Skywacker' }];

    beforeEach(() => {
        mocklogger = new FileSystemLogger();
        mocklogger.flagRequest = jest.fn();
        middleware = new DdosMiddleware(mocklogger);
    });

    it('should be defined', () => {
        expect(middleware).toBeDefined();
    });

    test.each([
        ...ddosRequests
    ])('should log ddos findings', (req: any) => {
        const next = jest.fn();

        middleware.use(req, mockResponse as unknown as any, next);
        expect(mocklogger.flagRequest).toHaveBeenCalledWith(req, AttackType.DDoS);
        expect(next).toHaveBeenCalled();
    });

    test.each([
        ...okRequests
    ])('should NOT log', (req: any) => {
        const next = jest.fn();

        middleware.use(req, mockResponse as unknown as any, next);
        expect(mocklogger.flagRequest).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });
});