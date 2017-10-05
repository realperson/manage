import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'component-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  @Input() name: string;
  @Input() color: string;

  transforms = [
    {
      rotate: 180,
      delay: -1000,
      duration: 1000
    },
    {
      rotate: 210,
      delay: -916.667,
      duration: 1000
    },
    {
      rotate: 240,
      delay: -833.333,
      duration: 1000
    },
    {
      rotate: 270,
      delay: -750,
      duration: 1000
    },
    {
      rotate: 300,
      delay: -666.667,
      duration: 1000
    },
    {
      rotate: 330,
      delay: -583.333,
      duration: 1000
    },
    {
      rotate: 0,
      delay: -500,
      duration: 1000
    },
    {
      rotate: 30,
      delay: -416.667,
      duration: 1000
    },
    {
      rotate: 60,
      delay: -333.333,
      duration: 1000
    },
    {
      rotate: 90,
      delay: -250,
      duration: 1000
    },
    {
      rotate: 120,
      delay: -166.667,
      duration: 1000
    },
    {
      rotate: 150,
      delay: -83.3333,
      duration: 1000
    }
  ];

  sizes = {
    small: {
      y1: 12,
      y2: 20
    },
    current: {
      y1: 17,
      y2: 29
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * 获取svg的样式
   * @param item
   * @returns {{transform: string, animation-delay: string, animation-duration: string}}
   */
  getSvgStyle(item) {
    const result = {
      'transform': `rotate(${item.rotate}deg)`,
      'animation-delay': `${item.delay}ms`,
      'animation-duration': `${item.duration}ms`
    };
    return result;
  }

  getLineStyle() {
    let result = null;
    if (this.color) {
      result = {
        'stroke': this.color
      };
    }
    return result;
  }

}
