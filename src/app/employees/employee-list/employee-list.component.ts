import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
              private firestore: AngularFirestore) { }
  // list: Employee[];

  employee;
  ngOnInit(){
    this.getEmployees();
  }
  getEmployees = () =>
      this.service
      .getEmployees()
      .subscribe(res => {
        this.employee = res.map(item => {
            return {
              id: item.payload.doc.id,
              fullName : item.payload.doc.data()['fullName'],
              empCode: item.payload.doc.data() ['empCode'],
              position: item.payload.doc.data()['position'],
              mobile : item.payload.doc.data()['mobile']
            };
        });
      })

  onEdit(emp: Employee){
    console.log(emp);
    this.service.formData = Object.assign({}, emp);
  }

  onDelete = (id: string) => {
    if (confirm('Are you sure')) {
      this.firestore.doc('employee/' + id).delete();
    }
  }
}
