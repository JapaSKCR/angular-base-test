import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  public isLoading: Subject<boolean>;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = this.spinnerService.isLoading;
  }

}
