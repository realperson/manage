import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const AlertAnimation: any = [
  // 容器
  trigger('container', [
    state('show', style({})),
    state('hide', style({})),
    transition('hide=>show', [
      animate('0.5s ease-out')
    ]),
    transition('show=>hide', [
      animate('0.2s ease-out', style({
        opacity: 0
      }))
    ])
  ]),
  // 背景
  trigger('bg', [
    state('show', style({
      opacity: 1
    })),
    state('hide',
      style({
        opacity: 0
      })
    ),
    transition('hide=>show', [
      animate('0.2s ease-in')
    ]),
    transition('show=>hide', [
      animate('0.2s ease-out', style({
        opacity: 0
      }))
    ])
  ]),
  // 内容
  trigger('content', [
    state('show', style({
      opacity: 1,
      '-webkit-transform': 'translateY(0px) scale(1)',
      transform: 'translateY(0px) scale(1)'
    })),
    state('hide',
      style({
        // opacity: 0,
        '-webkit-transform': 'translateY(10px) scale(0)',
        transform: 'translateY(10px) scale(0)',
      })
    ),
    transition('hide=>show', [
      animate('0.1s 0.2s')
    ]),
    transition('show=>hide', [
      animate('0.2s ease-out', style({
        opacity: 0
      }))
    ])
  ])
];
