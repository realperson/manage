import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilService} from '../../services/util/util.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {SpinnerComponent} from '../../components/spinner/spinner.component';
import {ToastComponent} from '../../components/toast/toast.component';
import {AlertComponent} from '../../components/alert/alert.component';


@NgModule({
  imports: [
    CommonModule
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
  providers: [UtilService]
})
export class CoreModule { }
