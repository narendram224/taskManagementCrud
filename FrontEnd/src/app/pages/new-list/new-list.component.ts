import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { list } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskserve:TaskService,private router:Router) { }

  ngOnInit() {
  }

  sendTitle(title:string){
      this.taskserve.getData(title).subscribe((response:list)=>{
      
       this.router.navigate(['/list',response._id]); 

      })

  }
}
