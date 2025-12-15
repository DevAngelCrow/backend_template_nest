import { TokenDedecoderService } from '@/modules/auth/application/services/token-decoder.service';
import { FilterRoutesUser } from '../security-authorization-port/filter-routes-user';
import { Menu } from '@/modules/security/domain/entities/menu';

export class GetMenuUser<T, P> {
  constructor(
    private readonly filterUserMenus: FilterRoutesUser<T, P>,
    private readonly decoderTokenService: TokenDedecoderService,
  ) {}
  async run(token: string): Promise<Menu<T, P>[]> {
    const decodedToken = await this.decoderTokenService.run(token);
    const id_user = (decodedToken as any).id_user;
    return await this.filterUserMenus.run(id_user);
  }
}
