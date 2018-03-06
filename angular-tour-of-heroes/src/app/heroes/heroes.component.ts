import { Component, OnInit } from '@angular/core';
//import Hero = require("../entities/hero");
import { Hero } from "../entities/hero";
import { HeroService } from '../service/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero = new Hero();
 
  heroes: Hero[];
 

  constructor(private heroService: HeroService) {
    
    console.log("Heroes.constructor");
  }

  ngOnChanges() {
    console.log("Heroes.ngOnChanges");
  }

  ngOnInit() {
    /*
     this.hero = new Hero.Hero();
     this.hero.id = 4;
     this.hero.name = "DC comics";*/
    this.getHeroes();
    console.log("Heroes.ngOnInit");
  }

  ngOnDestroy() {
    console.log("Heroes.ngOnDestroy");
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes()
                    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
