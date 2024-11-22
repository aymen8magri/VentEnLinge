import { Component, inject } from '@angular/core';
import { ListeComments } from '../../model/liste-comments';
import { ActivatedRoute } from '@angular/router';
import { ListeCommentsService } from '../../services/liste-comments.service';
import { Commentaire } from '../../model/commentaire';

@Component({
  selector: 'app-plant-comment-admin',
  standalone: true,
  imports: [],
  templateUrl: './plant-comment-admin.component.html',
  styleUrl: './plant-comment-admin.component.css'
})
export class PlantCommentAdminComponent {
  val:number=0; //id de la plante à afficher
  liste!:ListeComments; //liste des commentaires de la plante
  route: ActivatedRoute = inject(ActivatedRoute); //route pour récupérer l'id de la plante
  listeCommentsService: ListeCommentsService = inject(ListeCommentsService); //service pour les commentaires
  tabcom:Commentaire[]=[]; //tableau des commentaires de la plante
  like:boolean=false; //boolean pour savoir si le commentaire est liké
  

  

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => { // Use `parent` to access `id`
      const idParam = params.get('id');
      console.log("ID Param (string):", idParam);
  
      this.val = idParam ? +idParam : NaN;
      console.log("Plant ID (number):", this.val);
  
      if (!isNaN(this.val)) {
        this.listeCommentsService.getListById(this.val).subscribe({
          next: (data) => {
            this.liste=data;
            this.tabcom=this.liste.liste
           
            console.log("Fetched comments:", this.liste);
            console.log(this.tabcom);
          },
          error: (error) => console.error('Failed to fetch comments:', error),
        });
      } else {
        console.error('Invalid or missing Plant ID');
      }
    });
   
    
  }

  //supprimer un commentaire
  onDelete(i:number){
    this.tabcom.splice(i,1);
    this.listeCommentsService.deleteComment(this.val,{liste:this.tabcom}).subscribe(
      data=>{
        this.listeCommentsService.getListById(this.val).subscribe(
          data=>this.tabcom=data.liste
        )
      }
    )
    
  }
  
  

  }
  

