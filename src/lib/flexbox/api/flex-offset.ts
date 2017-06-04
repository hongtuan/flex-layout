/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Renderer,
  SimpleChanges,
} from '@angular/core';


import {BaseFxDirective} from './base';
import {MediaChange} from '../../media-query/media-change';
import {MediaMonitor} from '../../media-query/media-monitor';


/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
@Directive({selector: `
  [fxFlexOffset],
  [fxFlexOffset.xs], [fxFlexOffset.sm], [fxFlexOffset.md], [fxFlexOffset.lg], [fxFlexOffset.xl],
  [fxFlexOffset.lt-sm], [fxFlexOffset.lt-md], [fxFlexOffset.lt-lg], [fxFlexOffset.lt-xl],
  [fxFlexOffset.gt-xs], [fxFlexOffset.gt-sm], [fxFlexOffset.gt-md], [fxFlexOffset.gt-lg]
`})
export class FlexOffsetDirective extends BaseFxDirective implements OnInit, OnChanges, OnDestroy {

  /* tslint:disable */
  @Input('fxFlexOffset')       set offset(val)     { this._cacheInput('offset', val); }
  @Input('fxFlexOffset.xs')    set offsetXs(val)   { this._cacheInput('offsetXs', val); }
  @Input('fxFlexOffset.sm')    set offsetSm(val)   { this._cacheInput('offsetSm', val); };
  @Input('fxFlexOffset.md')    set offsetMd(val)   { this._cacheInput('offsetMd', val); };
  @Input('fxFlexOffset.lg')    set offsetLg(val)   { this._cacheInput('offsetLg', val); };
  @Input('fxFlexOffset.xl')    set offsetXl(val)   { this._cacheInput('offsetXl', val); };

  @Input('fxFlexOffset.lt-sm') set offsetLtSm(val) { this._cacheInput('offsetLtSm', val); };
  @Input('fxFlexOffset.lt-md') set offsetLtMd(val) { this._cacheInput('offsetLtMd', val); };
  @Input('fxFlexOffset.lt-lg') set offsetLtLg(val) { this._cacheInput('offsetLtLg', val); };
  @Input('fxFlexOffset.lt-xl') set offsetLtXl(val) { this._cacheInput('offsetLtXl', val); };

  @Input('fxFlexOffset.gt-xs') set offsetGtXs(val) { this._cacheInput('offsetGtXs', val); };
  @Input('fxFlexOffset.gt-sm') set offsetGtSm(val) { this._cacheInput('offsetGtSm', val); };
  @Input('fxFlexOffset.gt-md') set offsetGtMd(val) { this._cacheInput('offsetGtMd', val); };
  @Input('fxFlexOffset.gt-lg') set offsetGtLg(val) { this._cacheInput('offsetGtLg', val); };

  /* tslint:enable */
  constructor(monitor: MediaMonitor,  elRef: ElementRef, renderer: Renderer) {
    super(monitor, elRef, renderer);
  }

  // *********************************************
  // Lifecycle Methods
  // *********************************************

  /**
   * For @Input changes on the current mq activation property, see onMediaQueryChanges()
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['offset'] != null || this._mqActivation) {
      this._updateWithValue();
    }
  }

  /**
   * After the initial onChanges, build an mqActivation object that bridges
   * mql change events to onMediaQueryChange handlers
   */
  ngOnInit() {
    this._listenForMediaQueryChanges('offset', 0 , (changes: MediaChange) => {
      this._updateWithValue(changes.value);
    });
  }

  // *********************************************
  // Protected methods
  // *********************************************


  protected _updateWithValue(value?: string|number) {
    value = value || this._queryInput('offset') || 0;
    if (this._mqActivation) {
      value = this._mqActivation.activatedInput;
    }

    this._applyStyleToElement(this._buildCSS(value));
  }

  protected _buildCSS(offset) {
    let isPercent = String(offset).indexOf('%') > -1;
    let isPx = String(offset).indexOf('px') > -1;
    if (!isPx && !isPercent && !isNaN(offset)) {
      offset = offset + '%';
    }

    return {'margin-left': `${offset}`};
  }
}
