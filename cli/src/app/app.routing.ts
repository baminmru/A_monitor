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


export const ROUTES: Routes = [ 
    {path: '', redirectTo: 'home', pathMatch: 'full'}, 
	 
	{path: 'DATA', component:  DATAComponent}, 
	{path: 'MONQ', component:  MONQComponent}, 
	{path: 'moncli', component:  moncliComponent}, 
	{path: 'MONSRV', component:  MONSRVComponent}, 
	{path: 'MONUSR', component:  MONUSRComponent}, 
	{path: 'MOND', component:  MONDComponent}, 
	{path: 'MONSCH', component:  MONSCHComponent}, 
	{path: 'MONNODE', component:  MONNODEComponent}, 
	{path: 'MONDEV', component:  MONDEVComponent}, 
	{path: 'home', component: AboutComponent} ,
	{path: 'jwtLogin', component: jwtLoginComponent}, 
	{path: 'node', component: DISPATCHERComponent}
]; 
 
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
