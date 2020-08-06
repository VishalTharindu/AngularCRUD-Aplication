import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
              private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm){
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: ''
    };
  }

  onSubmit(form: NgForm){
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
        this.firestore.collection('employee').add(data);
    } else {
        this.firestore.doc('employee/' + form.value.id).update(data);
    }
    this.resetForm(form);

  }
}
