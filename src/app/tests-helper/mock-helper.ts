import { Component, NgModule, Input } from '@angular/core';
import { MatNavList, MatListItem } from '@angular/material';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'router-outlet',
    template: '<b>Mock Router Outlet Component</b>'
  })
  export class MockRouterOutletComponent {
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-sidenav',
  template: '<b>Mock SideNav Component</b>'
})
export class MockSideNavComponent {
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'a',
  template: '<b>Mock MatNavList Component</b>'
})
export class MockMatNavListComponent {
  @Input() 'routerLink': [];
}



@NgModule({
  declarations: [
  MockRouterOutletComponent,
  MockSideNavComponent,
  MockMatNavListComponent
  ],
  imports: [
  ],
  providers: [
  ],
  bootstrap: []
})
export class MockModule { }

