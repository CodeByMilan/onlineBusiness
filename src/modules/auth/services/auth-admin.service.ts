import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/admin.login.dto';

@Injectable()
export class AuthenticationAdminService {
  constructor() {}

  async login(loginDto: LoginDto){

}
}
