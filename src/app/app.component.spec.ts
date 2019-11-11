import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { DebugElement } from '@angular/core';
import { MockSideNavComponent, MockModule } from './tests-helper/mock-helper';

let de: DebugElement;
let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

async function getComponent() {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockSideNavComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: []
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
  }

describe('AppComponent', () => {

    it('constructor: ok', async () => {
        // Act
        await getComponent();
        // Assert
        expect(comp).toBeDefined();
      });
});
