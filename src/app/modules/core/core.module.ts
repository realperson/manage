import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilService} from '../../services/util/util.service';
import {LoadingComponent} from '../../components/loading/loading.component';
import {SpinnerComponent} from '../../components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent,
    LoadingComponent
  ],
  exports: [
    SpinnerComponent,
    LoadingComponent
  ],
  providers: [UtilService]
})
export class CoreModule { }
