import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params } from '@angular/router';
import { list } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

constructor(private taskservice:TaskService,private route:ActivatedRoute) { }
  list:list[];
  task:Task[];

  ngOnInit() {
        this.route.params.subscribe((params:Params)=>{
          console.log(params);
          this.taskservice.getTask(params.listId).subscribe((tasks:any[])=>{
              this.task= tasks;
              console.log("this is the task",this.task);
           } )
        })
        this.taskservice.getLists().subscribe((lists:any[])=>{
          console.log(lists);
          this.list= lists;
      })
    
  }

   
     
  createTask(){
      this.taskservice.getData("title").subscribe((data)=>{
          console.log(data);
      })
  }
  onTaskClick(task:Task){
        this.taskservice.complted(task).subscribe((newTaskData)=>{
            console.log(newTaskData);
            task.completed = !task.completed;
        })
  }
}
