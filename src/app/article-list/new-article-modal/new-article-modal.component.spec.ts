import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArticleModalComponent } from './new-article-modal.component';

describe('NewArticleModalComponent', () => {
  let component: NewArticleModalComponent;
  let fixture: ComponentFixture<NewArticleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArticleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
