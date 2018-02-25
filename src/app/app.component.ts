import { Component } from '@angular/core';
import { ManagerService } from './manager/manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HTTP Manager';
}
