import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { StorageEnum } from '../enums/storage.enum';
import { Storage } from '@ionic/storage';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class TokenInterceptor {

  constructor(
    private storage: Storage,
  ) { }

  async intercept(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const user: UserEntity = await this.storage.get(StorageEnum.User);

    if (user) {
      const token = user.token ?? '';
      request = request.clone({
        setHeaders: {
          'taskee-token': token,
        }
      });
    }

    return next.handle(request).toPromise();
  }
}