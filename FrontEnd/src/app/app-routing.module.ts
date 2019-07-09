import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'list',pathMatch:'full'},
  {
    path:'list/:listId',
    component:TaskViewComponent
  },
  {
    path:'list',
    component:TaskViewComponent
  },{
    path:'newList',
    component:NewListComponent
  },{
    path:'list/:listId/newTask',
    component:NewTaskComponent
  },{
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
