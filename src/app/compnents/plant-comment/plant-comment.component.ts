import { Component, inject } from '@angular/core';
import { ListeComments } from '../../model/liste-comments';
import { ActivatedRoute } from '@angular/router';
import { ListeCommentsService } from '../../services/liste-comments.service';
import { Commentaire } from '../../model/commentaire';

@Component({
  selector: 'app-plant-comment',
  standalone: true,
  imports: [],
  templateUrl: './plant-comment.component.html',
  styleUrl: './plant-comment.component.css'
})
export class PlantCommentComponent {
  val:number=0;
  liste!:ListeComments;
  route: ActivatedRoute = inject(ActivatedRoute);
  listeCommentsService: ListeCommentsService = inject(ListeCommentsService);  
  tabcom:Commentaire[]=[]
  

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.listeCommentsService.getListById(this.val).subscribe({
          next: (data) => {
            this.liste = data;
            this.tabcom=this.liste.liste;
           
            console.log("Fetched comments:", this.liste);
          },
          error: (error) => console.error('Failed to fetch comments:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
   
    
  }
  }

