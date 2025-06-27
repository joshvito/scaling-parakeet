import { InjectionMiddleware } from './injection.middleware';
import { AttackType, FileSystemLogger } from '../logger.service';
import { okRequests } from '../test-data/requests-ok';
import { sqlInjectionRequests } from '../test-data/requests.sql';
jest.mock('../logger.service');

describe('InjectionMiddleware', () => {
  let middleware: InjectionMiddleware;
  let mocklogger: FileSystemLogger;
  const mockResponse = [
    { id: 1, name: 'Unit Tests are cool', first: 'Luke', last: 'Skywacker' },
  ];

  beforeEach(() => {
    mocklogger = new FileSystemLogger();
    mocklogger.flagRequest = jest.fn();
    middleware = new InjectionMiddleware(mocklogger);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  test.each([...sqlInjectionRequests])(
    'should log sqlinjection findings',
    (req: any) => {
      const next = jest.fn();

      middleware.use(req, mockResponse as unknown as any, next);
      expect(mocklogger.flagRequest).toHaveBeenCalledWith(
        req,
        AttackType.SqlInjection,
      );
      expect(next).toHaveBeenCalled();
    },
  );

  test.each([...okRequests])('should NOT log', (req: any) => {
    const next = jest.fn();

    middleware.use(req, mockResponse as unknown as any, next);
    expect(mocklogger.flagRequest).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
