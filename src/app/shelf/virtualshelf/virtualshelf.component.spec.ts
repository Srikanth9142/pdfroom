import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualshelfComponent } from './virtualshelf.component';

describe('VirtualshelfComponent', () => {
  let component: VirtualshelfComponent;
  let fixture: ComponentFixture<VirtualshelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualshelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualshelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
