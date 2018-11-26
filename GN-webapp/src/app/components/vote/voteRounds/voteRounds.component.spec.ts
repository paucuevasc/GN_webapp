import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteRoundsComponent } from './voteRounds.component';

describe('Vote2Component', () => {
  let component: VoteRoundsComponent;
  let fixture: ComponentFixture<VoteRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteRoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
