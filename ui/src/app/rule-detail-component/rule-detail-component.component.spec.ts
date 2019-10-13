import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleDetailComponentComponent } from './rule-detail-component.component';

describe('RuleDetailComponentComponent', () => {
  let component: RuleDetailComponentComponent;
  let fixture: ComponentFixture<RuleDetailComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleDetailComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleDetailComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
