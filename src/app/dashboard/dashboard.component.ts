import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css', "loading.scss" ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  heroDetail: Hero;
  isLoading:boolean = false;

  constructor(private heroService: HeroService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  clickAction(hero:Hero){
	  if(!this.heroDetail){
		this.isLoading = true;
	  }
	this.heroDetail = hero;
	
  }

  heroDetailsLoaded(){
	  this.isLoading = false;
	  this.sleep(2000);
	  this.heroDetail = null;
	  this.cdRef.detectChanges();
	  
  }
  
  sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
	  if ((new Date().getTime() - start) > milliseconds){
		break;
	  }
	}
  }
}