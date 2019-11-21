import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTechnicianComponent } from './profile-technician.component';

describe('ProfileTechnicianComponent', () => {
  let component: ProfileTechnicianComponent;
  let fixture: ComponentFixture<ProfileTechnicianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTechnicianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTechnicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
