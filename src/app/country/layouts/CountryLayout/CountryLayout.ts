import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TopMenu } from "../../components/top-menu/top-menu";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu, RouterLinkWithHref],
  templateUrl: './CountryLayout.html',
})
export class CountryLayout { }
