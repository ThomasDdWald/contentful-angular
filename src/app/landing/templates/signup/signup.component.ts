import {Component, Input} from '@angular/core';
import { BlockComponent } from '../page-renderer/content-block';
import { SignupContentModel } from '../../../lib/core/models/content-model';



@Component({
  selector: 'tux-block-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class BlockSignupComponent implements BlockComponent {
  @Input() content: SignupContentModel;
}
