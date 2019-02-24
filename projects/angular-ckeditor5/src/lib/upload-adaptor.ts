import {HttpClient} from '@angular/common/http';

export class UploadAdapter {
  // https://stackoverflow.com/questions/52052514/upload-adapter-is-not-defined-issue-with-image-uploading-in-ckeditor5-angular
  // https://my.oschina.net/u/3568600/blog/1832939
  // https://github.com/ckeditor/ckeditor5/issues/1020
  // https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-UploadAdapter.html
  private loader;
  private _httpClient;
  private token: string;
  private uploadUrl: string;
  private apiEndPoint: string;

  constructor(loader: any,
              httpClient: HttpClient,
              token: string,
              uploadUrl: string,
              apiEndPoint: string) {
    this.loader = loader;
    this._httpClient = httpClient;
    this.token = token;
    this.uploadUrl = uploadUrl;
    this.apiEndPoint = apiEndPoint;
  }

  // public upload(): Promise<any> {
  //     //"data:image/png;base64,"+ btoa(binaryString)
  //     return this.readThis(this.loader.file);
  // }


  public upload(): Promise<any> {

    // const url = this.apiEndPoint + 'v1/attachment/upload?token=' + this.token;
    const url = this.uploadUrl;
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', this.loader.file);
      // data.append('allowSize', 10);//max size of your image (M)

      this._httpClient.post(url, data).subscribe((resp) => {
        console.log(resp);
        console.log(this.apiEndPoint + resp.fullPath + '&token=' + this.token);
        resolve({
          url: this.apiEndPoint + resp.fullPath + '&token=' + this.token,
          default: (`${this.apiEndPoint + resp.fullPath}&token=${this.token}`).replace('//v1', '/v1'),
          uploaded: 1
        });
      }, (err: any) => {
        console.log(err);
      });
    });
  }
}
