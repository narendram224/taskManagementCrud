import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(private taskService:TaskService,private router:ActivatedRoute,private navig:Router) { }
listId:string;
  ngOnInit() {

    this.router.params.subscribe((params:Params)=>{
      this.listId = params['listId'];
      console.log(this.listId);
    })
  }
  createTask(title:string){
      this.taskService.createTask(title,this.listId).subscribe((newTask:Task)=>{
          console.log(newTask);
          // this.navig.navigate(['list/',this.listId]);
          // we also directly go to by another propert
          this.navig.navigate(['../'],{relativeTo:this.router});
      })
  }

}
