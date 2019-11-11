import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { SidenavComponent } from './sidenav.component';
import { Router } from '@angular/router';
import { MockRouterOutletComponent, MockMatNavListComponent } from 'src/app/tests-helper/mock-helper';
import { RouterTestingModule } from '@angular/router/testing';

let de: DebugElement;
let comp: SidenavComponent;
let fixture: ComponentFixture<SidenavComponent>;
let router: Router;
const routes = [{path: '', component: SidenavComponent}];

async function getComponent() {
  await TestBed.configureTestingModule({
    declarations: [
      SidenavComponent,
      MockRouterOutletComponent
    ],
    imports: [
      FormsModule,
      BrowserAnimationsModule,
      MaterialModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ],
    providers: [
      { provide: Router, useValue: router },
    ],
  }).compileComponents();
  fixture = TestBed.createComponent(SidenavComponent);
  comp = fixture.componentInstance;
  de = fixture.debugElement;
}

describe('SideNavComponent', () => {
  it('constructor: ok', async () => {
    // Arrange
    router = {} as any;

    // Act
    await getComponent();

    // Assert
    expect(comp).toBeDefined();
  });
});
