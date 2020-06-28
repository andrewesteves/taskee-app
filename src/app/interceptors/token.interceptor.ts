import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable()
export class TokenInterceptor {

  constructor() { }

  async intercept(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'taskee-token': 'ZjMwYjE4ZDYtZTE0ZS0zMTA5LTYzYzItZjM4MWQ0ZTdmNTE4U2F0dXJkYXksIDI3LUp1bi0yMCAyMDowNDoxOSBVVEM=',
      }
    });

    return next.handle(request).toPromise();
  }
}