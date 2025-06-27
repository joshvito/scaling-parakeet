import { AttackType, FileSystemLogger } from '../logger.service';
import { okRequests } from '../test-data/requests-ok';
import { xssRequests } from '../test-data/requests-xss';
import { CrossSiteScriptingMiddleware } from './xss.middleware';
jest.mock('../logger.service');

describe('CrossSiteScriptingMiddleware', () => {
    let middleware: CrossSiteScriptingMiddleware;
    let mocklogger: FileSystemLogger;
    const mockResponse = [{ id: 1, name: 'Unit Tests are cool', first: 'Luke', last: 'Skywacker' }];

    beforeEach(() => {
        mocklogger = new FileSystemLogger();
        mocklogger.flagRequest = jest.fn();
        middleware = new CrossSiteScriptingMiddleware(mocklogger);
    });

    it('should be defined', () => {
        expect(middleware).toBeDefined();
    });

    test.each([
        ...xssRequests
    ])('should log cross site scripting findings', (req: any) => {
        const next = jest.fn();

        middleware.use(req, mockResponse as unknown as any, next);
        expect(mocklogger.flagRequest).toHaveBeenCalledWith(req, AttackType.XSS);
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