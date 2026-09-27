let selected={name:'',price:0};
function buy(name,price){selected={name,price};document.getElementById('modalTitle').textContent='Comprar: '+name;document.getElementById('modalPrice').textContent='Preço: '+price+' MT';document.getElementById('modal').classList.remove('hidden');document.getElementById('nick').focus()}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
function submitOrder(){
  const nick=document.getElementById('nick').value.trim();
  const payment=document.getElementById('payment').value;
  if(!nick){alert('Coloca o teu Nick do Minecraft.');return}
  alert(`Pedido criado!\n\nItem: ${selected.name}\nValor: ${selected.price} MT\nNick: ${nick}\nPagamento: ${payment}\n\nA integração de pagamento/entrega será ligada na próxima etapa.`);
  closeModal();
}
function copyIP(){navigator.clipboard?.writeText('XP-World1.aternos.me:30224');alert('IP e porta copiados!')}
