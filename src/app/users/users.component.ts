import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  // Add this:
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {

  users$: Object;
  constructor(private data: DataService) { }

  /*ngOnInit() {
    this.data.getUsers().subscribe(
      data=>this.users$= data
    );
  }*/

  ngOnInit() {
    this.data.getUsers().subscribe(
      dataRet =>{this.users$ = dataRet;
      console.log("Users_data: ", dataRet);
      

      const dataObject = JSON.parse(JSON.stringify(dataRet));
      dataObject.forEach((element, index) => {
        console.log(index + " User "+element.name + " --mail: "+ element.email);
      });
      console.log("______________________________________________________________________");


      let allUsers = dataRet;
     
      /*allUsers.forEach((element, index) => {
        //console.log(index +" - User: "+JSON.stringify(element));
       // console.log(dataRet[index]);
        console.log("---------------------------------------------------------------------------------------");
      });*/

      const rev = new Review(dataRet[0]['name'], dataRet[0]['email']);
      console.log("End: ", rev);
      
      const revs = new Reviews(dataRet[0]['name'], dataRet[0]['email']);
      console.log("End1: ", revs);
      });
  }

}

class Review {
  constructor(private name: string, private email: string){
    this.name = name;
    this.email = email;
  }    
}

class Reviews {
  constructor(private name, private email){
    this.name = name;
    this.email = email;
  } 

}
