import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, MessageCircleWarning } from 'lucide-angular';

@Component({
  selector: 'not-found',
  imports: [LucideAngularModule],
  templateUrl: './not-found.html',
})
export class NotFoundComponent {
  location = inject(Location);
  readonly MessageCircleWarning = MessageCircleWarning;

  goBack() {
    this.location.back();
  }
}