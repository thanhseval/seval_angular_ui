import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProblemComponent } from './add-new-problem.component';

describe('AddNewProblemComponent', () => {
  let component: AddNewProblemComponent;
  let fixture: ComponentFixture<AddNewProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewProblemComponent]
    });
    fixture = TestBed.createComponent(AddNewProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
