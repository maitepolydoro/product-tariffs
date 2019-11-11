import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  protected async get(router): Promise<any> {
    return await this.http.get(environment.apiURL + router).toPromise()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      this.toastr.error('An error has occurred. Contact our support!');
    });
  }
}
