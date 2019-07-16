import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras
}                           from '@angular/router';
import { AppService }      from './app.service';

@Injectable()
export class AppGuard implements CanActivate, CanActivateChild {
  constructor(private AppService:AppService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkRole(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkRole(url: string): boolean {
    console.log('checkROle '+ this.AppService.Role +' for : '+ url);
	if ( this.AppService.isLoggedIn) { 
	
		if(this.AppService.Role=="SUPERADMIN"){

			
			switch(url){
				
				
				case '/jwtLogin':
					return true;
					
				case '/Organization':
					return true;
					
				case '/MONUSR':
					return true;
					
									
				case '/DATA':
					return true;	
					
				case '/MONQ':
					return true;

					case '/moncli':
					return true;

				case '/MONSRV':
					return true;

				case '/MONSCH':
					return true;
					
				case '/MOND':
					return true;

				case '/MONNODE':
					return true;

					case '/MONDEV':
						return true;

						case '/node':
							return true;
					
				default:
				this.router.navigate(['/']);
				return false;
				
			}
		}
	
		if(this.AppService.Role=="Администратор"){
			switch(url){

				 case '/jwtLogin':
					return true;
				
					case '/MONUSR':
						return true;
						
					case '/DATA':
						return true;	
						
					case '/MONQ':
						return true;
	
					case '/MONSRV':
						return true;
	
					case '/MONSCH':
						return true;
						
					case '/MONNODE':
						return true;
	
					case '/MONDEV':
						return true;
	
					case '/node':
						return true;
					
				default:
					this.router.navigate(['/']);
				return false;
				
			}
		}
		
		if(this.AppService.Role=="Диспетчер"){
			switch(url){
				
					case '/jwtLogin':
							return true;
					
					case '/node':
						return true;
					
					case '/MONNODE':
						return true;
	
					case '/MONDEV':
						return true;
				
				default:
					this.router.navigate(['/']);
					return false;
			}
		}
		

		return false; 
	}else{
		
		switch(url){
				
				
				 case '/jwtLogin':
					return true; 

				default:
					//this.router.navigate(['/']);
					return false;
			}
		// Navigate to the login page with extras
		this.router.navigate(['/jwtLogin']);
		return false;
	}
  }
} 

