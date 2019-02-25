import {HttpClient} from '@angular/common/http';

export class UploadAdapter {
  // https://stackoverflow.com/questions/52052514/upload-adapter-is-not-defined-issue-with-image-uploading-in-ckeditor5-angular
  // https://my.oschina.net/u/3568600/blog/1832939
  // https://github.com/ckeditor/ckeditor5/issues/1020
  // https://ckeditor.com/docs/ckeditor5/latest/api/module_upload_filerepository-UploadAdapter.html
  private loader;
  private _httpClient;
  private uploadUrl: string;

  constructor(loader: any,
              httpClient: HttpClient,
              uploadUrl: string) {
    this.loader = loader;
    this._httpClient = httpClient;
    this.uploadUrl = uploadUrl;
  }

  public upload(): Promise<any> {
    const url = this.uploadUrl;
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append('file', this.loader.file);
      // data.append('allowSize', 10);//max size of your image (M)
      this._httpClient.post(url, data).subscribe((resp) => {
        resolve({
          url: resp.imageUrlFromResponse,
          default: resp.imageUrlFromResponse,
          uploaded: 1
        });
      }, (err: any) => {
        console.log(err);
      });
    });
  }
}
