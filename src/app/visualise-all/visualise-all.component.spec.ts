import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiseAllComponent } from './visualise-all.component';

describe('VisualiseAllComponent', () => {
  let component: VisualiseAllComponent;
  let fixture: ComponentFixture<VisualiseAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiseAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiseAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
