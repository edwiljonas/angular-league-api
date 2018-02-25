import { Component, OnInit } from '@angular/core';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  providers: [ ManagerService ],
  styleUrls: ['./manager.component.css']
})

export class ManagerComponent implements OnInit {

  title = 'Manager Results';
  object;

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.showConfig();
  }

  showConfig() {
      console.log(this.managerService.getConfig());
  }

}
