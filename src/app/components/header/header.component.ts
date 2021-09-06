import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  admin: any = null;

  constructor(private route: Router, private auth: AuthService) { }

  async ngOnInit() {
    this.admin = await this.auth.currentUserId();
  }

  async onLogout(){
    await this.auth.logout();
    this.route.navigate(['login']);
   }
}
