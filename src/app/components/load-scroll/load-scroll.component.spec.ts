import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadScrollComponent } from './load-scroll.component';

describe('LoadScrollComponent', () => {
  let component: LoadScrollComponent;
  let fixture: ComponentFixture<LoadScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
