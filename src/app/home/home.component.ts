import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {



  constructor() { }


  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  images = [
    {url:'assets/dog1.jpg'},
    {url:'assets/dog2.jpg'},
    {url:'assets/dog3.jpg'},
  ];

  currentSlideIndex = 0;

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex === 0) ? this.images.length - 1 : this.currentSlideIndex - 1;



  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex === this.images.length - 1) ? 0 : this.currentSlideIndex + 1;


  }

}
