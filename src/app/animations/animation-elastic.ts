import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

//弹性
export const ElasticAnimation: any = [
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
      '-webkit-transform': 'scale(1)',
      transform: 'scale(1)'
    })),
    state('hide',
      style({
        // opacity: 0,
        '-webkit-transform': 'scale(0)',
        transform: 'scale(0)',
      })
    ),
    transition('hide=>show', [
      animate('0.3s 0.2s ease-in', keyframes([
        style({
          '-webkit-transform': 'scale(0)',
          transform: 'scale(0)',
          offset: 0
        }),
        style({
          '-webkit-transform': 'scale(1.2)',
          transform: 'scale(1.1)',
          offset: 0.3
        }),
        style({
          '-webkit-transform': 'scale(0.9)',
          transform: 'scale(0.9)',
          offset: 0.5
        }),
        style({
          '-webkit-transform': 'scale(1.1)',
          transform: 'scale(1.1)',
          offset: 0.7
        }),
        style({
          '-webkit-transform': 'scale(1)',
          transform: 'scale(1)',
          offset: 1.0
        })
      ]))
    ]),
    transition('show=>hide', [
      animate('0.2s ease-out', style({
        opacity: 0
      }))
    ])
  ])
];
