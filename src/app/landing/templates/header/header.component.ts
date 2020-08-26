import { Component, OnInit } from '@angular/core';
import {HeaderContentModel} from '../../../lib/core/models/content-model';
import {BlockComponent} from '../page-renderer/content-block';

@Component({
  selector: 'tux-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements BlockComponent {
  content: HeaderContentModel;
}
