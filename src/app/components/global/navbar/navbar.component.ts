import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges {

  @Input() deviceType: String='lg';
  @Input() isUserLoggedIn: boolean=false;

  showmobileMenu :boolean=false;

  menuItems: MenuItem[] = [
   
    {
      label: 'Feature 1',
      link:'feature1',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Feature 2',
      link:'feature2',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Feature 3',
      link:'feature3',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    
    {
      label: 'About',
      link:'about',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    
  ];
  

  fixedmenuItems: MenuItem[] = [
   
    {
      label: 'Sign Up',
      link:'signup',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
   
    {
      label: 'Sign In',
      link:'signin',
      icon: 'person',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
  ];

  menuItems_loggedIn: MenuItem[] = [
   
    {
      label: 'UserArea1',
      link:'user_area1',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'UserArea2',
      link:'user_area2',
      icon: '',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
  ];
  fixedmenuItems_loggedIn: MenuItem[] = [
   
    {
      label: 'Sign Out',
      link:'signout',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },

  ];

  constructor(private authService:AuthService) { 
    this.isUserLoggedIn = this.authService.isLoggedIn();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.showmobileMenu = false;
    for (const propName in changes) {
        if(propName==="deviceType")
        {
            this.deviceType = changes[propName].currentValue;
            this.isMobileMenu();
        }
      }
  }

  ngOnInit(): void {

    this.isUserLoggedIn = this.authService.isLoggedIn();
  }

  isMobileMenu()
  {
    if(this.deviceType==="sm" || this.deviceType=="xs")
    {
      this.showmobileMenu = true;
    }
  }

}
