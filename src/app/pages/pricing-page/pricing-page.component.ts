import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styles: ``
})
export default class PricingPageComponent implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {

    // if( isPlatformBrowser(this.platform) ) {
    //   document.title = 'Pricing page';
    // }

    this.title.setTitle('Pricing page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi pricing page' });
  }

}
