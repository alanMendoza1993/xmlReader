import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'xmlReader';
  importFile: File[] = [];
  files: any;
  data: any[] = [];

  constructor(private _file: FilesService) {
    this.getFIles();
  }
  getOption(op) {
    return this._file.getOption(op);
  }

  getFIles() {
    return this._file.getDataFiles().subscribe((data: any) => {
      console.log('get files data:', data);
      this.data = data.obj;
    });
  }
  fileChanged(e) {
    console.log(e.target.files);
    var files: any[] = e.target.files;
    Array.from(files).forEach( (file:any, index) => {
      if (file.type === 'text/xml') {
        console.log('el archivo es typo', file);
        this.importFile.push(file);
      } else {
        this._file.errorAlert('Error!', 'El archivo no es xml');

      }
      if (index + 1 === files.length) {
        this._file.saveFiles(this.importFile, (data: any) => {
          console.log('la informacion de los archivos', data);
          if (data.ok) {
            this.getFIles();
            this._file.showAlert('Bien!', 'se han subido todos los archivos');
          } else {
            
            this._file.errorAlert('Error!', 'se han subido todos los archivos');
          }
        });
      }
    });
    
 }
 getPdf(id) {
  return this._file.getPdf(id);
 }
}
