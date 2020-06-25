import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-load-scroll',
  template: `<ng-content></ng-content><div #anchor></div>`,
  // templateUrl: './load-scroll.component.html',
  styleUrls: ['./load-scroll.component.css']
})
export class LoadScrollComponent implements OnInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {

    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    },
      options);

    this.observer.observe(this.anchor.nativeElement);
  }
  /* */
  ngOnDestroy() {
    this.observer.disconnect();
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return (
      style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll'
    );
  }

}
