import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {

    this.resetForm();
  }

  onSubmit(form: NgForm) {
    if(form.value.id == null) {
      this.employeeService.insertEmployee(form.value);
      this.resetForm(form);
      this.toastr.success('Submitted Successfully', 'Employee Registration');
    } else {
      this.employeeService.updateEmployee(form.value);
      this.resetForm(form);
      this.toastr.success('Submitted Successfully', 'Employee Registration');
    }
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.employeeService.selectedEmployee = {
      id: null,
      name: '',
      position: '',
      office: '',
      salary: 0
    };
  }

}
