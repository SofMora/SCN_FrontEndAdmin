import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
// --- Angular Material --- //
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NgIf } from '@angular/common';

import { BreakpointObserver } from '@angular/cdk/layout';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MatToolbarModule, MatSidenavModule, MatButtonModule, MatIconModule, MatDividerModule, MatListModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav, { static: true })
  sidenav!: MatSidenav;
  title: any;

  constructor(private observer: BreakpointObserver) { }
  ngOnInit(): void {
    this.observer.observe(["(max-width: 800px)"])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      })
  }
}
