import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { UserEntity } from 'src/app/entities/user.entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  readonly url: string = `${ENV.api}/users`;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Create a new resource
   * 
   * @param {UserEntity} user
   * @return {Promise} 
   */
  async store(user: UserEntity): Promise<UserEntity> {
    const response = this.http.post(`${this.url}/register`, user)
      .pipe(
        map(
          (data: UserEntity) => data,
        )
      ).toPromise();
    return response;
  }
}
