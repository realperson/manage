import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilService} from '../../services/util/util.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {ToastComponent} from '../../components/toast/toast.component';
import {AlertComponent} from '../../components/alert/alert.component';
import {HttpModule} from '@angular/http';
import {StorageService} from '../../services/storage/storage.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    SpinnerComponent,
    LoadingComponent,
    ToastComponent,
    AlertComponent
  ],
  exports: [
    SpinnerComponent,
    LoadingComponent,
    ToastComponent,
    AlertComponent
  ],
  providers: [
    StorageService,
    UtilService
  ]
})
export class CoreModule { }
