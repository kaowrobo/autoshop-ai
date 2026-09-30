// Edytuj tę listę, aby zmieniać produkty w katalogu.
// Strona nie posiada koszyka, płatności ani formularzy zamówień.
const products = [
 {id:1,name:'Domowy budżet',category:'excel',type:'Szablon Excel',icon:'▦',status:'Projekt demonstracyjny',description:'Planowanie przychodów, wydatków i oszczędności w jednym arkuszu.',details:'Arkusz do porządkowania domowych finansów. Trwa przygotowanie i testowanie wersji produktu.'},
 {id:2,name:'Planer tygodniowy',category:'planery',type:'Planer',icon:'▤',status:'W przygotowaniu',description:'Przejrzysty plan zadań, nauki i codziennych obowiązków.',details:'Projekt planera do organizowania tygodnia. Ostateczny zakres funkcji zostanie ustalony po testach.'},
 {id:3,name:'Kalkulator projektów',category:'tech',type:'Narzędzie techniczne',icon:'⌘',status:'W przygotowaniu',description:'Koncepcja arkusza pomagającego planować proste projekty techniczne.',details:'Planowane narzędzie do notowania elementów, kosztów i etapów projektu.'},
 {id:4,name:'Lista zakupów PRO',category:'excel',type:'Szablon Excel',icon:'☷',status:'W przygotowaniu',description:'Organizacja list zakupów i kontrola planowanych wydatków.',details:'Koncepcja listy zakupów z podsumowaniem kosztów.'},
 {id:5,name:'Planer nauki',category:'planery',type:'Planer',icon:'◫',status:'W przygotowaniu',description:'Harmonogram tematów, powtórek i terminów sprawdzianów.',details:'Projekt szablonu do samodzielnej organizacji nauki.'},
 {id:6,name:'Rejestr części',category:'tech',type:'Narzędzie techniczne',icon:'⚙',status:'W przygotowaniu',description:'Katalog elementów elektronicznych i części do projektów.',details:'Koncepcja rejestru elementów z ilościami i miejscem przechowywania.'}
];
const grid=document.getElementById('productGrid');
const dialog=document.getElementById('details');
function render(filter='all'){
 grid.replaceChildren();
 products.filter(p=>filter==='all'||p.category===filter).forEach(p=>{
  const card=document.createElement('article');card.className='product';
  const art=document.createElement('div');art.className=`art ${p.category}`;
  const icon=document.createElement('span');icon.textContent=p.icon;
  const badge=document.createElement('b');badge.textContent=p.status;
  art.append(badge,icon);
  const content=document.createElement('div');content.className='product-content';
  const type=document.createElement('span');type.className='tag';type.textContent=p.type;
  const title=document.createElement('h3');title.textContent=p.name;
  const desc=document.createElement('p');desc.textContent=p.description;
  const btn=document.createElement('button');btn.textContent='Zobacz szczegóły →';btn.addEventListener('click',()=>showDetails(p));
  content.append(type,title,desc,btn);card.append(art,content);grid.append(card);
 });
}
function showDetails(p){const target=document.getElementById('detailContent');target.replaceChildren();const label=document.createElement('span');label.className='tag';label.textContent=p.type;const title=document.createElement('h2');title.textContent=p.name;const desc=document.createElement('p');desc.textContent=p.details;target.append(label,title,desc);dialog.showModal()}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');render(btn.dataset.filter)}));
document.getElementById('closeDetails').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.getElementById('year').textContent=new Date().getFullYear();render();
