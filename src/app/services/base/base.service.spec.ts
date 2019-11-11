import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('BaseService', () => {
  it('get: ok', async () => {
    const observable = jasmine.createSpyObj<Observable<any>>('observable', {
      toPromise: Promise.resolve('RESULT')
    });
    const http = jasmine.createSpyObj<HttpClient>('authenticationService', {
      get: observable
    });
    const toastService = jasmine.createSpyObj<ToastrService>('toastService', {
      error: undefined
    });
    // Arrange
    const base = new BaseService(http, toastService);
    // Act
    // tslint:disable-next-line: no-string-literal
    const result = await base['get']('router');

    // Assert
    expect(result).toBeDefined();
  });

  it('get: fail', async () => {
    const observable = jasmine.createSpyObj<Observable<any>>('observable', {
      toPromise: Promise.reject(undefined)
    });
    const http = jasmine.createSpyObj<HttpClient>('authenticationService', {
      get: observable
    });
    const toastService = jasmine.createSpyObj<ToastrService>('toastService', {
      error: undefined
    });
    // Arrange
    const base = new BaseService(http, toastService);

    // Act
    const result = await base['get'.toString()]('');

    // Assert
    expect(result).toBeUndefined();
    expect(toastService.error).toHaveBeenCalledTimes(1);
    expect(toastService.error).toHaveBeenCalledWith('An error has occurred. Contact our support!');
  });
});
