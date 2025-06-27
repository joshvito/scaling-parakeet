import { ddosRequests } from '../test-data/requests-ddos';
import { FileSystemLogger } from '../logger.service';
import { okRequests } from '../test-data/requests-ok';
import { DdosMiddleware } from './ddos.middleware';
jest.mock('../logger.service');

describe('DdosMiddleware', () => {
  let middleware: DdosMiddleware;
  let mocklogger: FileSystemLogger;
  const mockResponse = [
    { id: 1, name: 'Unit Tests are cool', first: 'Luke', last: 'Skywacker' },
  ];

  beforeAll(() => {
    mocklogger = new FileSystemLogger();
    mocklogger.flagRequest = jest.fn();
    middleware = new DdosMiddleware(mocklogger);
  });

  beforeEach(() => {
    mocklogger.flagRequest = jest.fn();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log ddos findings', () => {
    const next = jest.fn();
    ddosRequests.forEach((request: any) => {
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
