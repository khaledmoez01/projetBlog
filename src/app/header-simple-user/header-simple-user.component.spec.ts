import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSimpleUserComponent } from './header-simple-user.component';

describe('HeaderSimpleUserComponent', () => {
  let component: HeaderSimpleUserComponent;
  let fixture: ComponentFixture<HeaderSimpleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSimpleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSimpleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
