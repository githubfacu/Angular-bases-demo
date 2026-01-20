import { Component } from '@angular/core';
import { Earth, FileIcon, Globe, LucideAngularModule, Pin } from 'lucide-angular'
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './top-menu.html',
})
export class TopMenu { 

  readonly Globe = Globe;
  readonly Earth = Earth;
  readonly Pin = Pin;
}
