import {Component, OnInit, ViewChild} from '@angular/core';
import {UtilService} from '../../services/util/util.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model = {
    userName: '',
    password: ''
  };
  isCheckingInput = false; // 是否正在检查输入情况
  isLogining = false; // 是否正在使用用户名和密码进行登录

  @ViewChild('commonForm') commonForm: NgForm;


  constructor(private util: UtilService) {
  }

  ngOnInit() {
  }

  /**
   * 检查登录
   */
  checkLogin() {
    if (this.commonForm.valid) {
      // 输入验证通过,开始使用用户名和密码进行登录
      this.isCheckingInput = false;
      this.isLogining = !this.isCheckingInput;
      this.util.loading('登录中,请稍候');
      const data = {
        'name': this.model.userName,
        'password': this.model.password
      };
      // this.util.post('user/login',loginData,loginResult);
      this.util.post('user/login', data);
    } else {
      // 输入验证不通过
      this.isCheckingInput = true;
      this.isLogining = !this.isCheckingInput;
    }
  }

  stringify(data){
    return JSON.stringify(data);
  }

}
