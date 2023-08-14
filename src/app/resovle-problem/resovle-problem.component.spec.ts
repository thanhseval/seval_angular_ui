import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResovleProblemComponent } from './resovle-problem.component';

describe('ResovleProblemComponent', () => {
  let component: ResovleProblemComponent;
  let fixture: ComponentFixture<ResovleProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResovleProblemComponent]
    });
    fixture = TestBed.createComponent(ResovleProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
