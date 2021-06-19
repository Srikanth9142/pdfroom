import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchprofileComponent } from './searchprofile.component';

describe('SearchprofileComponent', () => {
  let component: SearchprofileComponent;
  let fixture: ComponentFixture<SearchprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
