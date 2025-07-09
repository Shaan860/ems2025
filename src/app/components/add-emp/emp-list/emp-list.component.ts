import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [],
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css'
})
export class EmpListComponent {

  constructor( private router: Router){}


  navigateToAddList(){
    this.router.navigateByUrl("add-emp")
  }

}
