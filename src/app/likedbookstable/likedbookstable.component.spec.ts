import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedbookstableComponent } from './likedbookstable.component';

describe('LikedbookstableComponent', () => {
  let component: LikedbookstableComponent;
  let fixture: ComponentFixture<LikedbookstableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedbookstableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedbookstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
