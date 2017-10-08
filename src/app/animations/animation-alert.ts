import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const AlertAnimation: any = [
  trigger('InOut', [
    state('show', style({
      opacity: 1,
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)'
    })),
    state('hide',
      style({
        opacity: 0,
        '-webkit-transform': 'scale(0)',
        transform: 'scale(0)',
      })
    ),
    transition('hide=>show', [
      animate('0.1s ease-out')
    ]),
    transition('show=>hide', [
      animate('0.2s ease-out', style({
        opacity: 0
      }))
    ])
  ])
];
