import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interface/User';
import { from } from 'rxjs';

@Component({
  selector: 'app-getapi',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './getapi.component.html',
  styleUrl: './getapi.component.css'
})
export class GetapiComponent implements OnInit{
  // constructor(private http: HttpClient){}

   headers = new HttpHeaders({
    'x-token': 'mysecrettoken'
  })
  employeeList: any[] = [];
//   url2 = "https://reqres.in/api/users?page=2"
//  url1 = "https://jsonplaceholder.typicode.com/users";
 getUrl = "http://127.0.0.1:8000/employees";
 postUrl = "http://127.0.0.1:8000/employees"
 http = inject(HttpClient);

ngOnInit(): void {
  this.getAllUser();
}
  getAllUser(){
    this.http.get(this.getUrl,{ headers: this.headers }).subscribe((res:any) => {
     this.employeeList = res;
     console.log("Employee List >>>>",res);
    })
  }

  addUser(data: User, form: any){
    console.log("Data", data)
    this.http.post(this.postUrl, data, {headers: this.headers}).subscribe({
      next: (res:any) => {
        console.log("Employee added Successfully", res);
        alert("Employee added successfully");
       
        form.resetForm()

        this.getAllUser();
      },
      error: (err) => {
         console.log("Error >>", err)
      }
    })
  }

}
