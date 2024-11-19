import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-api',
  standalone: true,
  imports: [],
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css'] 
})
export class APIComponent implements OnInit{

  ngOnInit(): void {

    fetch("https://newsdata.io/api/1/news?apikey=pub_44470ce44ca83dfaa49ee86f94d765afe35fb&category=environment ")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        this.afficher_environnement(data.results);
    })
    .catch(error => console.error('Error fetching data:', error));
    
  }

  afficher_environnement(articles:any) {
    let container = document.getElementById('newsContainer_afficher_environnement');
    if (container) {
      container.innerHTML = ''; // Clear existing content
    }
    articles.forEach((article:any) => {
        // Create column div
        let col = document.createElement('div');
        col.className = 'col mb-4';

        // Create card div
        let card = document.createElement('div');
        card.className = 'card cardDEC';
        card.style.border = '1px solid #1C593A';
        card.style.backgroundColor = '#72B58C';
        card.style.maxHeight = '600px';
        card.style.minHeight = '600px';

        // Create and configure the image element
        let img = document.createElement('img');
        img.src = article.image_url || '../../../../public/PlantBuddy.png'; // Use article image or fallback
        img.style.width = '100%';
        img.style.height = '250px';
        img.className = 'card-img-top';
        img.alt = article.title || 'News image';

        // Create card body
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardBody.style.overflow = 'auto';


        // Create card title with a link
        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.style.fontWeight = 'bold';
        cardTitle.style.fontSize = '1.5rem';
        cardTitle.style.textAlign = 'center';
        cardTitle.style.textDecoration = 'underline';
        cardTitle.style.marginBottom = '15px';

        let titleLink = document.createElement('a');
        titleLink.href = article.link || '#'; // Use the article's URL or '#' if not available
        titleLink.textContent = article.title || 'No title available';
        titleLink.target = '_blank'; // Open link in a new tab
        titleLink.style.color = '#1C593A';

        cardTitle.appendChild(titleLink);

        // Create card text
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = article.description || 'No description available';

        // Create card footer
        let cardFooter = document.createElement('div');
        cardFooter.className = 'card-footer';
        cardFooter.style.display = 'flex';
        cardFooter.style.justifyContent = 'space-between';

        // Create small text element
        let small = document.createElement('small');
        small.className = 'text-muted';
        small.textContent = article.pubDate;

        // Create the icone element
        let icon = document.createElement('img');
        icon.src = article.source_icon;
        icon.style.width = '40px';
        icon.style.height = '40px';

        // Append elements to their respective parents
        cardFooter.appendChild(small);
        cardFooter.appendChild(icon);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(img);
        card.appendChild(cardBody);
        card.appendChild(cardFooter);
        col.appendChild(card);
        if (container) {
          container.appendChild(col);
        }
    });
}

}
