import { Component, Input, OnInit } from '@angular/core';
import { BranchInterface, Iusers, ListUserTeamInterface } from '../../handle/interface/project-interface';
import { ListType } from 'src/app/shared/enum/list-type';
import { ProjectService } from '../../handle/service/project.service';
import { FormArray, FormBuilder } from '@angular/forms';
import { FormService } from '../../handle/service/form.service';
import { ActivatedRoute } from '@angular/router';
import { ArrayHandle } from 'src/app/shared/enum/array-handle';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  constructor(
    private formService: FormService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private projectService: ProjectService) { }


  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditteam();
  }

  showDeactive: boolean = true;
  searchInput: string = ''
  searchInputTeam: string = ''
  allBranch: number = 0
  panelOpenState = false;
  selectedType: ListType = ListType.All
  remove = ArrayHandle.remove;
  add = ArrayHandle.add;
  private projectId: number | null | undefined;
  private usersForm = this.formService.createForm.get('users') as FormArray;

  @Input() listBranchs!: BranchInterface[];
  @Input() listUserTeam!: ListUserTeamInterface[];

  getTeams: ListUserTeamInterface[] = [];

  bglevel = [
    'intern0', 'intern1', 'intern2',
    'fresher1', 'fresher2', 'fresher3',
    'junior1', 'junior2', 'junior3',
    'middle', 'middle2', 'middle3',
    'Senior2', 'Senior3',
  ]

  bgtype = [
    'staff', 'internship',
    'collaborator_fresher',
  ]

  listTypes = [
    {
      key: ListType.All,
      label: "All"
    },
    {
      key: ListType.Staff,
      label: "Staff"
    },
    {
      key: ListType.Internship,
      label: "Internship"
    },
    {
      key: ListType.Collaborator,
      label: "Collaborator"
    },
  ];

  isEditteam() {
    if (!this.projectId) {
      return;
    }

    this.projectService.getAllListUserTeam().subscribe((data) => {
      this.listUserTeam = data.result;
      this.formService.editData.subscribe((edit) => {
        if (edit) {
          edit.users.forEach((data: Iusers) => {
            const user = this.listUserTeam.find((user) => user.id === data.userId);
            if (user) {
              user.role = data.type;
              this.getTeams.push(user);
              this.listUserTeam = this.listUserTeam.filter((filterUser) => filterUser.id !== data.userId);
            }
          });
        }
      });
    });
  }

  onRoleSelectionChange(user: ListUserTeamInterface, value: number) {
    user.role = value;
    this.usersForm.controls.forEach((control) => {
      if (control.value.userId === user.id) {
        control.patchValue({ type: user.role });
      }
    });
  }

  move(user: ListUserTeamInterface, action: string) {
    if (action === ArrayHandle.add) {
      if (this.usersForm.length === 0) {
        user.role = 1;
      } else {
        user.role = 0;
      }

      this.getTeams.push(user);
      const index = this.listUserTeam.findIndex((item) => item === user);
      this.listUserTeam.splice(index, 1);
      this.listUserTeam = [...this.listUserTeam];

      this.usersForm.push(
        this.fb.group({
          userId: user.id,
          type: user.role,
        }));

    } else if (action === ArrayHandle.remove) {
      this.listUserTeam.push(user);
      const index = this.getTeams.findIndex((item) => item === user);
      this.getTeams.splice(index, 1);
      this.getTeams = [...this.getTeams];
      this.usersForm.removeAt(
        this.usersForm.controls.findIndex((control) => control.get('userId')?.value === user.id)
      )
    }
  }

  toggleShowDeactive() {
    this.showDeactive = !this.showDeactive;
  }

}
