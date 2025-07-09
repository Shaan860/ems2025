import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-emp',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-emp.component.html',
  styleUrl: './add-emp.component.css'
})
export class AddEmpComponent {
  formValue: any;



  employeeForm: FormGroup = new FormGroup({
      firstName: new FormControl("", [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl("", [Validators.required]),
      userName: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zipCode: new FormControl()
  });

  onSubmit(){
     this.formValue = this.employeeForm.value;
  }
 
}
