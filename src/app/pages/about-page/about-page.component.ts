import {Component, inject, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styles: ``
})
export default class AboutPageComponent implements OnInit{

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('About page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi about page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Saul.Curso,Angular' });
  }

}
