import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectComponent } from './project/project.component';
import { ListProjectComponent } from './project/list-project/list-project.component';
import { DialogAddEditProjectComponent } from './project/dialog-add-edit-project/dialog-add-edit-project.component';
import { GeneralComponent } from './project/dialog-add-edit-project/general/general.component';
import { TeamComponent } from './project/dialog-add-edit-project/team/team.component';
import { TaskProjectComponent } from './project/dialog-add-edit-project/task-project/task-project.component';
import { NewClientComponent } from './project/dialog-add-edit-project/general/new-client/new-client.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { ProTypePipe } from 'src/app/shared/pipes/proType/pro-type.pipe';
import { ViewComponent } from './project/list-project/view/view.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ViewTaskComponent } from './project/list-project/view/view-task/view-task.component';
import { ViewTeamComponent } from './project/list-project/view/view-team/view-team.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConfirmComponent } from './project/list-project/confirm/confirm.component';
import { FormsModule } from '@angular/forms';
import { ProTypeViewPipe } from 'src/app/shared/pipes/proTypeView/pro-type-view.pipe';
import {MatExpansionModule} from '@angular/material/expansion';
import { LevelTypePipe } from 'src/app/shared/pipes/levelType/level-type.pipe';
import { ListTypePipe } from 'src/app/shared/pipes/listType/list-type.pipe';
import { BranchPipe } from 'src/app/shared/pipes/branch/branch.pipe';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CombinedTypeAndBranchPipe } from 'src/app/shared/pipes/combined-type-and-branch.pipe';
import { SearchTeamPipe } from 'src/app/shared/pipes/search-team.pipe';
import { DialogAlertComponent } from './project/dialog-add-edit-project/dialog-alert/dialog-alert.component';
import { CustomTimeComponent } from './project/list-project/view/custom-time/custom-time.component';
import { TsProjectRoutingModule } from './ts-project-routing.module';

@NgModule({
  declarations: [
    ProjectComponent,
    ListProjectComponent,
    DialogAddEditProjectComponent,
    GeneralComponent,
    TeamComponent,
    TaskProjectComponent,
    NewClientComponent,
    ProTypePipe,
    ViewComponent,
    ViewTaskComponent,
    ViewTeamComponent,
    ConfirmComponent,
    ProTypeViewPipe,
    LevelTypePipe,
    ListTypePipe,
    BranchPipe,
    CombinedTypeAndBranchPipe,
    SearchTeamPipe,
    DialogAlertComponent,
    CustomTimeComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    FormsModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    TsProjectRoutingModule
  ],
  providers: [DatePipe],
})
export class TsProjectModule { }
