import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @Input() allbooks:number;
  @Input() likedbooks:number;
  @Input() shelfbooks:number;
  public pieChartLabels:string[] = ['All Books', 'Liked Books', 'Shelf Books'];
  public pieChartData:number[]=[];
  public pieChartType:string = 'pie';
  constructor() { 
    

  }
  chartClicked(e:any):void {
    console.log(e);
  }
 
  chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit() {
    console.log("received allbooks:"+this.allbooks);
    this.pieChartData.push(this.allbooks);
    this.pieChartData.push(this.likedbooks);
    this.pieChartData.push(this.shelfbooks);
    
  }

}
