import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEditProjectComponent } from './dialog-add-edit-project.component';

describe('DialogAddEditProjectComponent', () => {
  let component: DialogAddEditProjectComponent;
  let fixture: ComponentFixture<DialogAddEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddEditProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
