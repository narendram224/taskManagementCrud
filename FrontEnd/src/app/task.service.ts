import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webreqService:WebRequestService) { }

  getData(title:string){
    // we want to send a request to create a list
   return this.webreqService.postr('list',{title});

  //  now we redirect to the list response .id

  }
  createTask(title:string,listId:string){
    return this.webreqService.postr(`list/${listId}/tasks`,{title});
  }

  getLists(){
    return this.webreqService.get('list');
  }

  getTask(listId:string){
    return this.webreqService.get(`list/${listId}/tasks`);
  }

  complted(task:Task){
      return this.webreqService.patch(`list/${task._listId}/tasks/${task._id}`,{
        completed:!task.completed
      })
  }
}
