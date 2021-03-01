import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu-item';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnChanges {

  homelink:string='/';
  @Input() deviceType: String='lg';
  @Input() isUserLoggedIn: boolean=false;
  @Input() user: User;

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
      icon: '',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
   
    {
      label: 'Sign In',
      link:'signin',
      icon: '',
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
      label: 'Profile',
      link:'profile',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Sign out',
      link:'signout',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },

  ];


  menuItems_superAdmin: MenuItem[] = [
   
    {
      label: 'users',
      link:'admin_users',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'config',
      link:'admin_config',
      icon: 'person_outline',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },

  ];


  menuItems_Admin: MenuItem[] = [
   
  
    {
      label: 'config',
      link:'admin_config',
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
        if(propName==="user")
        {
            this.user = changes[propName].currentValue;
            // console.log("GOT THE USER");
            // console.log(this.user.email);
            // console.log(this.user.role);
       
        }
      }
  }

  ngOnInit(): void {

    this.isUserLoggedIn = this.authService.isLoggedIn();

    if(this.isUserLoggedIn===true)
      this.homelink='dashboard';
  }

  isMobileMenu()
  {
    if(this.deviceType==="sm" || this.deviceType=="xs")
    {
      this.showmobileMenu = true;
    }
  }

}
