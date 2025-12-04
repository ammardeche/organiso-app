import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodaysTasksPage } from './todays-tasks.page';

describe('TodaysTasksPage', () => {
  let component: TodaysTasksPage;
  let fixture: ComponentFixture<TodaysTasksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
