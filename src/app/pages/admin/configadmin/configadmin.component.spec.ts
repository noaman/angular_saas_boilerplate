import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigadminComponent } from './configadmin.component';

describe('ConfigadminComponent', () => {
  let component: ConfigadminComponent;
  let fixture: ComponentFixture<ConfigadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
