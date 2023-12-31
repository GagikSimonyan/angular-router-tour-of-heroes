import {Component, OnInit} from '@angular/core';
import {HeroService} from '../hero.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Hero} from '../hero';
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  hero$!: Observable<Hero>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {
  }

  ngOnInit(): void {
    this.hero$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        console.log('HeroDetailComponent params: ', params);
          return this.service.getHero(params.get('id')!);
        }
      )
    )
  }

  gotoHeroes(hero: Hero) {
    const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'donkey' }]);
  }
}
