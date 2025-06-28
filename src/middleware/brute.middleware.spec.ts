import { bruteRequests } from '../test-data/requests-brute';
import { FileSystemLogger } from '../logger.service';
import { okRequests } from '../test-data/requests-ok';
import { BruteForceMiddleware } from './brute.middleware';
jest.mock('../logger.service');

describe('BruteForceMiddleware', () => {
  let middleware: BruteForceMiddleware;
  let mocklogger: FileSystemLogger;
  const mockResponse = [
    { id: 1, name: 'Unit Tests are cool', first: 'Luke', last: 'Skywacker' },
  ];

  beforeAll(() => {
    mocklogger = new FileSystemLogger();
    mocklogger.flagRequest = jest.fn();
    middleware = new BruteForceMiddleware(mocklogger);
  });

  beforeEach(() => {
    mocklogger.flagRequest = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log brute force findings', () => {
    const next = jest.fn();
    bruteRequests.forEach((request: any) => {
      middleware.use(request, mockResponse as unknown as any, next);
    });
    expect(mocklogger.flagRequest).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test.each([...okRequests])('should NOT log', (req: any) => {
    const next = jest.fn();

    middleware.use(req, mockResponse as unknown as any, next);

    expect(mocklogger.flagRequest).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
