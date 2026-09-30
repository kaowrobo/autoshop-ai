// Produkty wczytywane z products.json. Brak sprzedaży i płatności.
let products = [];
const grid = document.getElementById('productGrid');
const dialog = document.getElementById('details');
function render(filter='all') {
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
function showDetails(p){
  const target=document.getElementById('detailContent');target.replaceChildren();
  const label=document.createElement('span');label.className='tag';label.textContent=p.type;
  const title=document.createElement('h2');title.textContent=p.name;
  const desc=document.createElement('p');desc.textContent=p.details;
  target.append(label,title,desc);dialog.showModal();
}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});
  btn.classList.add('active');btn.setAttribute('aria-pressed','true');render(btn.dataset.filter);
}));
document.getElementById('closeDetails').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.getElementById('year').textContent=new Date().getFullYear();
fetch('products.json',{cache:'no-store'})
  .then(response=>{if(!response.ok)throw new Error('Nie udało się pobrać katalogu');return response.json()})
  .then(data=>{if(!Array.isArray(data))throw new Error('Nieprawidłowy katalog');products=data;render()})
  .catch(error=>{console.error(error);grid.textContent='Nie udało się załadować katalogu produktów.'});
