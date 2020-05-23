import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stu } from './user';
@Component({
  selector: 'app-user-management-component',
  templateUrl: './user-management-component.component.html',
  styleUrls: ['./user-management-component.component.css']
})
export class UserManagementComponentComponent implements OnInit {
 
  myForm: FormGroup;
  id: AbstractControl;
  userName: AbstractControl;
  password: AbstractControl;
  allusers$: Observable<Stu>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: Stu;


  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'id': [''],
      'userName': [''],
      'password': ['']
    });

    this.id = this.myForm.controls['id'];
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
  }

  /* 页面初始化 */
  ngOnInit(): void {console.log('sss');
    this.allusers$ = <Observable<Stu>>this.httpClient.get(this.baseUrl + 'allusers');
    
  }
  

  search() {
    if (this.id.value) {
      console.log('abc');
      this.allusers$ = <Observable<Stu>>this.httpClient.get(this.baseUrl + 'allusers/' + this.id.value);
    } else {
      this.allusers$ = <Observable<Stu>>this.httpClient.get(this.baseUrl + 'allusers');
      console.log('ppp');
    }
  }

  add() {
    console.log(this.myForm.value);
    this.httpClient.post(this.baseUrl + 'allusers', this.myForm.value).subscribe(
      (val: any) => {
        if (val.succ) {
          alert('添加成功!');
        }
      }
    );
    
  }

  select(i: Stu) {
    this.currentUser = i;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.delete(this.baseUrl + 'allusers/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      );
    }
  }

  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    } else {
      this.httpClient.put(this.baseUrl + 'allusers', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      );
    }
  }
  

}
