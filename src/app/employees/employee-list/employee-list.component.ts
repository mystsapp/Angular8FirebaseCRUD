import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    const x = this.employeeService.getData();
    x.snapshotChanges().subscribe(
      list => {
        this.employeeList = [];
        list.forEach(element => {
          const y = element.payload.toJSON();
          y['id'] = element.key;
          this.employeeList.push(y as Employee);
        });
      });

  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm('Are you sure want to delete this record?')) {
      this.employeeService.deleteEmployee(id);
      this.toastr.warning('Delete Successfully', 'Employee Registration');
    }
  }

}
