import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module'; 
import { Routes, RouterModule } from '@angular/router'; 
 
import { AboutComponent } from './about/about.component'; 
import { DATAComponent } from './DATA/DATA.component'; 
import { MONQComponent } from './MONQ/MONQ.component'; 
import { moncliComponent } from './moncli/moncli.component'; 
import { MONSRVComponent } from './MONSRV/MONSRV.component'; 
import { MONUSRComponent } from './MONUSR/MONUSR.component'; 
import { MONDComponent } from './MOND/MOND.component'; 
import { MONSCHComponent } from './MONSCH/MONSCH.component'; 
import { MONNODEComponent } from './MONNODE/MONNODE.component'; 
import { MONDEVComponent } from './MONDEV/MONDEV.component'; 
import { jwtLoginComponent } from './jwtlogin/jwtlogin.component';
import { DISPATCHERComponent } from './DISPATCHER/DISPATCHER.component'; 
import { AppGuard} from 'app/app.guard'; 


export const ROUTES: Routes = [ 
	{path: '', redirectTo: 'home', pathMatch: 'full'}, 
	{path: 'home', component: AboutComponent} ,
	{path: 'jwtLogin', component: jwtLoginComponent}, 

	{path: 'DATA',canActivate: [AppGuard], component:  DATAComponent}, 
	{path: 'MONQ',canActivate: [AppGuard], component:  MONQComponent}, 
	{path: 'moncli',canActivate: [AppGuard], component:  moncliComponent}, 
	{path: 'MONSRV',canActivate: [AppGuard], component:  MONSRVComponent}, 
	{path: 'MONUSR',canActivate: [AppGuard], component:  MONUSRComponent}, 
	{path: 'MOND',canActivate: [AppGuard], component:  MONDComponent}, 
	{path: 'MONSCH', canActivate: [AppGuard],component:  MONSCHComponent}, 
	{path: 'MONNODE',canActivate: [AppGuard], component:  MONNODEComponent}, 
	{path: 'MONDEV',canActivate: [AppGuard], component:  MONDEVComponent}, 
	{path: 'node',canActivate: [AppGuard], component: DISPATCHERComponent}
]; 
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
