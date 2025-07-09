import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../interface/user';

@Component({
  selector: 'app-getapi',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './getapi.component.html',
  styleUrl: './getapi.component.css'
})
export class GetapiComponent implements OnInit{
  // constructor(private http: HttpClient){}
  employeeList: any[] = [];
  url = "https://reqres.in/api/users?page=2"
 url1 = "https://jsonplaceholder.typicode.com/users";
  http = inject(HttpClient);

ngOnInit(): void {
  this.getAllUser();
}
  getAllUser(){
    this.http.get(this.url).subscribe((res:any) => {
     this.employeeList = res.data;
     console.log("Employee List >>>>",res.data);
    })
  }

  addUser(data: User){
    console.log("Data", data)
  }

}
