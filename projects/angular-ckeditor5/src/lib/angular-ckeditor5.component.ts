import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AbstractControl, ControlContainer} from '@angular/forms';
import {CKEditor5} from '@ckeditor/ckeditor5-angular/ckeditor';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Config = CKEditor5.Config;
import {AbstractValueAccessor, MakeProvider} from './abstract-value-accessor';
import {UploadAdapter} from './upload-adaptor';

@Component({
  selector: 'ngx-ckeditor5',
  templateUrl: './angular-ckeditor5.component.html',
  providers: [MakeProvider(AngularCkeditor5Component)]
})
export class AngularCkeditor5Component extends AbstractValueAccessor implements OnInit, AfterContentChecked {
  @Input() formControlName: string;
  @Input() formControl: AbstractControl;
  // file output
  @Output() filesChanged = new EventEmitter();
  @Output() fileObjectsChanged = new EventEmitter();

  // ck editor
  _ckEditorConfig: Config;
  _editor = DecoupledEditor;
  @Input() documentId: string;
  @Input() token: string;
  @Input() uploadUrl: string;
  @Input() apiEndPoint: string;

  constructor(public http: HttpClient,
              @Optional() @Host() @SkipSelf()
              private controlContainer: ControlContainer,
              public httpClient: HttpClient,
              public cd: ChangeDetectorRef) {
    super();

    this._ckEditorConfig = {
      cloudServices: {
        // PROVIDE CORRECT VALUES HERE:
        // See the explanation at https://docs.ckeditor.com/ckeditor5/latest/features/collaboration/collaborative-editing.html#data-initialization.
        // tokenUrl: 'https://example.com/cs-token-endpoint',
        // uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/',
        // webSocketUrl: 'your-organization-id.cke-cs.com/ws/',
        documentId: 'collabEditing'
      }
    };
  }

  ngOnInit(): void {
    this.formControlLogic();
  }

  formControlLogic() {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Can\'t find parent FormGroup directive');
    }
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this._value = value;
    // warning: comment below if only want to emit on user intervention
    this.onChange(value);
    console.log(this._value);
  }

  ngAfterContentChecked(): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  // ckeditor
  public ckeditorOnReady(editor) {
    const hc = this.httpClient;
    const tk = this.token;
    const url = this.uploadUrl;
    const ep = this.apiEndPoint;
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      console.log(btoa(loader.file));
      return new UploadAdapter(loader, hc, tk, url, ep);
    };
  }
}
