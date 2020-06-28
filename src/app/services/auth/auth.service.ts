import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from 'src/app/entities/user.entity';
import { StorageEnum } from 'src/app/enums/storage.enum';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = `${ENV.api}`;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) { }

  /**
   * Login
   * 
   * @param {string} email
   * @param {string} password 
   * @return {UserEntity} 
   */
  async login(email: string, password: string): Promise<UserEntity> {
    const response = await this.http.post(`${this.url}/users/login`, {
      email,
      password,
    }).pipe(
      map(
        (data: UserEntity) => data
      )
    ).toPromise();

    if (response) {
      await this.storage.set(StorageEnum.User, response);
      return response;
    }
  }

  /**
   * Logout
   * 
   * @return {void} 
   */
  async logout(): Promise<void> {
    await this.storage.remove(StorageEnum.User);
    await this.http.post(`${this.url}/users/logout`, {}).pipe(
      map(
        (data: UserEntity) => data
      )
    ).toPromise();
  }

  /**
   * Check if has a user stored
   * 
   * @return {boolean} 
   */
  async isAuthenticated(): Promise<boolean> {
    const user: string = await this.storage.get(StorageEnum.User);
    return user ? true : false;
  }
}