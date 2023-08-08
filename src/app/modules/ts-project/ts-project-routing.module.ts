import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProjectComponent } from "./project/project.component";
import { DialogAddEditProjectComponent } from "./project/dialog-add-edit-project/dialog-add-edit-project.component";

const routes: Routes = [
    {
        path: '',
        component: ProjectComponent,
    },
    {
        path: 'create',
        component: DialogAddEditProjectComponent,
    },
    {
        path: 'edit/:id',
        component: DialogAddEditProjectComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TsProjectRoutingModule {

}
