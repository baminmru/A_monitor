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
					
				case '/Users':
					return true;
					
				/*case '/classTest':
					return true; */
					
				case '/classLogin':
					return true;
					
				case '/Certification':
					return true;	
					
				case '/CheckForm':
					return true;
					
				case '/Dictionary':
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
					
				
				case '/Exam':
					return true;	
					
				case '/FindExams':
					return true;	
				
					
				case '/classLogin':
					return true;
					
				default:
				this.router.navigate(['/']);
				return false;
				
			}
		}
		
		if(this.AppService.Role=="Разработчик Теста"){
			switch(url){
				
				case '/jwtLogin':
					return true;
					
				case '/TestVariant':
					return true;
					
			
				case '/TestCreator':
					return true;
					
				
				default:
					this.router.navigate(['/']);
					return false;
			}
		}
		
		if(this.AppService.Role=="Проверяющий"){
			switch(url){
				
				
				case '/jwtLogin':
					return true;
					
				case '/CheckTests':
					return true;
					
				case '/CheckExams':
					return true;


				default:
					this.router.navigate(['/']);
					return false;
			}
		}
		
		if(this.AppService.Role=="Тестируемый"){
			switch(url){
				
				case '/Me':
					return true;
					
				case '/RecordToExam':
					return true;
					
				case '/OnlineTest':
					return true;
					
				case '/OnlineExam':
					return true;
					
					
				case '/MyTests':
					return true;
					
				case '/MyExams':
					return true;
					
				default:
				this.router.navigate(['/']);
				return false;
				
			}
		}
		
		
		if(this.AppService.Role=="Класс"){
			switch(url){
				
				
				/* case '/jwtLogin':
					return true; */
					
				case '/classExam':
					return true;


				default:
					//this.router.navigate(['/']);
					return false;
			}
		}
	
		return false; 
	}else{
		
		switch(url){
				
				
				/* case '/jwtLogin':
					return true; */
					
				case '/classLogin':
					return true;


				default:
					//this.router.navigate(['/']);
					return false;
			}
		// Navigate to the login page with extras
		this.router.navigate(['/classLogin']);
		return false;
	}
  }
} 

