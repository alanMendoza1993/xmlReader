import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  option = {
    working: false,
    progress: 0
  };
  constructor(public http: HttpClient, private toast: ToastrService) { }
  getDataFiles() {
    return this.http.get(`${environment.server}files/allFiles`);
  }
  getPdf(id) {
    console.log('pidiendo pdf');
    return this.http.get(`${environment.server}files/getPdf/${id}`);
  }
  showAlert(title, msj) {
    this.toast.success(msj, title, { timeOut: 3000});
  }
  errorAlert(title, msj) {
    console.log('si jala hasta aqui');
    this.toast.error(msj, title, { timeOut: 3000});
  }
  getOption(op) {
    return this.option[op];
  }
  async saveFiles(data, callback: Function) {
      var file = data[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log('file::', file, 'size:', file);
      return this.http.post(`${environment.server}files/upload`, formData).subscribe( (data: any) => {
        callback(data);
      });
    }
}
