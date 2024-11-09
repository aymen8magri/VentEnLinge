import { Component, inject, OnInit } from '@angular/core';
import { Plant } from '../../model/plant';
import { PalntService } from '../../services/palnt.service';
import { PlantItemComponent } from '../plant-item/plant-item.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [PlantItemComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  tabRes:Plant[]=[];
  private plantService:PalntService=inject(PalntService);
  tabPlant:Plant[]=[];
  ngOnInit(): void {
    //this.calculateResult();
  }
  calculateResult() {
    this.tabRes=[];
    this.tabPlant=[];
    const answers = [];
    //get answers from the quiz
    for (let i = 1; i <= 5; i++) {
        const answer = document.querySelector(`input[name="q${i}"]:checked`) as HTMLInputElement;
        if (answer) answers.push(answer.value);
    }

    //check if all answers are answered
    if (answers.length < 5) {
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.innerText = "Veuillez répondre à toutes les questions.";
      }
      return;
    }

    //count the answers
    const answerCounts: { [key: string]: number } = { A: 0, B: 0, C: 0 };
    answers.forEach(answer => {
        if (answerCounts.hasOwnProperty(answer)) {
            answerCounts[answer as keyof typeof answerCounts]++;
        }
    });

    //get the most answered answer
    const maxAnswer = ['A', 'B', 'C'].reduce((a, b) =>
      answerCounts[a] > answerCounts[b] ? a : b
    );

    //get the plants by the most answered answer
    switch (maxAnswer) {
        case 'A':
          this.plantService.getPlantsByCategory('Plantes fleuries').subscribe(data => {
            this.tabRes = data;
            console.log(this.tabRes);
            
            for(let i=0;i<3;i++){
              const randomPlant = this.tabRes[Math.floor(Math.random() * this.tabRes.length)];
              this.tabPlant.push(randomPlant);
              this.tabRes.splice(this.tabRes.indexOf(randomPlant), 1);
            }
            console.log(this.tabPlant);
          });
          break;
        case 'B':
          this.plantService.getPlantsByCategory('Cactus et succulentes').subscribe(data => {
            this.tabRes = data;
            console.log(this.tabRes);
            
            for(let i=0;i<3;i++){
              const randomPlant = this.tabRes[Math.floor(Math.random() * this.tabRes.length)];
              this.tabPlant.push(randomPlant);
              this.tabRes.splice(this.tabRes.indexOf(randomPlant), 1);
            }
            console.log(this.tabPlant);
          });
          break;
        case 'C':
          this.plantService.getPlantsByCategory('Plantes purificatrices d\'air').subscribe(data => {
            this.tabRes = data;
            console.log(this.tabRes);
            
            for(let i=0;i<3;i++){
              const randomPlant = this.tabRes[Math.floor(Math.random() * this.tabRes.length)];
              this.tabPlant.push(randomPlant);
              this.tabRes.splice(this.tabRes.indexOf(randomPlant), 1);
            }
            console.log(this.tabPlant);
          });
          break;
    }
  }
}
