import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }


  faCoffee = faCoffee;
  title = 'ng-nodes';
  arr = [1,5,2,3,4];
}
