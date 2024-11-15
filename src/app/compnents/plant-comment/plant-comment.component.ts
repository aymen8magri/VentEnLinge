import { Component, inject } from '@angular/core';
import { ListeComments } from '../../model/liste-comments';
import { ActivatedRoute } from '@angular/router';
import { ListeCommentsService } from '../../services/liste-comments.service';
import { Commentaire } from '../../model/commentaire';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-plant-comment',
  standalone: true,
  imports: [NgClass],
  templateUrl: './plant-comment.component.html',
  styleUrl: './plant-comment.component.css'
})
export class PlantCommentComponent {
  val:number=0;
  listecom!:ListeComments;
  route: ActivatedRoute = inject(ActivatedRoute);
  listeCommentsService: ListeCommentsService = inject(ListeCommentsService);  
  tabcom:Commentaire[]=[]; 
  
  

  

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.listeCommentsService.getListById(this.val).subscribe({
          next: (data) => {
            this.listecom=data;
            this.tabcom=this.listecom.liste
           
            console.log("Fetched comments:", this.listecom);
            console.log(this.tabcom);
          },
          error: (error) => console.error('Failed to fetch comments:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
   
    
  }
  onAddComment(name:string,comment:string){
    
    const com=new Commentaire(name,comment);
    this.tabcom.push(com)
    this.listeCommentsService.addComment(this.val,{liste:this.tabcom}).subscribe(
      data=>{
        this.listeCommentsService.getListById(this.val).subscribe(
          data=>{
            this.tabcom=data.liste
          }
        )
      }
    )
  }
  onAddLike(i:number){
    
    console.log(this.tabcom[i]);
    if(this.tabcom[i].liked==false){
      this.tabcom[i].nbLikes++;
      this.tabcom[i].liked=true;
      console.log(this.tabcom);
      this.listeCommentsService.addLike(this.val,{liste:this.tabcom}).subscribe(
        data=>{console.log(data)
          this.listeCommentsService.getListById(this.val).subscribe(
            data=>{this.tabcom=data.liste}
          )

        }
      )
    }
    else{
      this.tabcom[i].nbLikes--;
      this.tabcom[i].liked=false
      console.log(this.tabcom);
      this.listeCommentsService.addLike(this.val,{liste:this.tabcom}).subscribe(
        data=>{console.log(data)
          this.listeCommentsService.getListById(this.val).subscribe(
            data=>{this.tabcom=data.liste}
          )

        }
      )
    }
   

  }
  }

