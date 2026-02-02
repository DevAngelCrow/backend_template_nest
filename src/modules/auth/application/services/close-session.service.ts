import { CloseSessionPort } from '../../domain/ports/close-session.port';

export class CloseSessionService {
  constructor(private readonly closeSession: CloseSessionPort) {}
}
