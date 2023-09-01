import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProplemComponent } from './search-proplem.component';

describe('SearchProplemComponent', () => {
  let component: SearchProplemComponent;
  let fixture: ComponentFixture<SearchProplemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProplemComponent]
    });
    fixture = TestBed.createComponent(SearchProplemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
