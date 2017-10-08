import {animate, state, style, transition, trigger} from '@angular/animations';

export const loadingAnimation: any = [
  trigger('loading', [
    state('show',
      style({
        opacity: 1
      })
    ),
    state('hide',
      style({
        opacity: 0
      })
    ),
    transition('hide=>show', [
      style({
        opacity: 0
      }),
      animate('0.5s ease-in')
    ]),
    transition('show=>hide', [
      animate('0.5s ease-out', style({
        opacity: 0
      }))
    ])
  ])
];
