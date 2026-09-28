let selected={name:'',price:0};
let appliedCoupon=null;

// Códigos de exemplo. Antes de publicar a loja real, substitua pelos seus códigos e regras.
const COUPONS={
  XPW30:{type:'percent',value:30,label:'30% de desconto'}
};

function formatMT(value){return value.toFixed(2).replace('.',',')+' MT'}

function getDiscount(){
  if(!appliedCoupon) return 0;
  const coupon=COUPONS[appliedCoupon];
  if(!coupon) return 0;
  if(coupon.type==='percent') return selected.price*(coupon.value/100);
  if(coupon.type==='fixed') return Math.min(coupon.value,selected.price);
  return 0;
}

function updateTotal(){
  const discount=getDiscount();
  const total=Math.max(0,selected.price-discount);
  document.getElementById('modalTotal').textContent=formatMT(total);
  const subtotal=document.getElementById('summarySubtotal');
  const discountEl=document.getElementById('summaryDiscount');
  if(subtotal) subtotal.textContent=formatMT(selected.price);
  if(discountEl) discountEl.textContent='− '+formatMT(discount);
}

function choosePayment(method){
  document.getElementById('payment').value=method;
  document.querySelectorAll('.payment-option').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.payment===method);
  });
}

function buy(name,price){
  selected={name,price};
  appliedCoupon=null;
  document.getElementById('modalTitle').textContent='Comprar: '+name;
  document.getElementById('modalPrice').textContent=formatMT(price);
  document.getElementById('coupon').value='';
  document.getElementById('couponMessage').textContent='';
  document.getElementById('phone').value='';
  updateTotal();
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('nick').focus();
}

function applyCoupon(){
  const input=document.getElementById('coupon').value.trim().toUpperCase();
  const message=document.getElementById('couponMessage');
  if(!input){
    appliedCoupon=null;
    message.textContent='Digite um código de desconto.';
    message.className='coupon-message error';
    updateTotal();
    return;
  }
  if(!COUPONS[input]){
    appliedCoupon=null;
    message.textContent='Cupom inválido.';
    message.className='coupon-message error';
    updateTotal();
    return;
  }
  appliedCoupon=input;
  message.textContent='Cupom '+input+' aplicado: '+COUPONS[input].label+'.';
  message.className='coupon-message success';
  updateTotal();
}

function closeModal(){document.getElementById('modal').classList.add('hidden')}

function submitOrder(){
  const nick=document.getElementById('nick').value.trim();
  const phone=document.getElementById('phone').value.trim();
  const payment=document.getElementById('payment').value;
  const total=Math.max(0,selected.price-getDiscount());
  if(!nick){alert('Coloca o teu Nick do Minecraft.');return}
  if(!phone){alert('Coloca o número que será usado para o pagamento.');return}
  const coupon=appliedCoupon||'Nenhum';
  alert(`Pedido preparado!\n\nItem: ${selected.name}\nPreço: ${formatMT(selected.price)}\nCupom: ${coupon}\nTotal: ${formatMT(total)}\nNick: ${nick}\nNúmero: ${phone}\nPagamento: ${payment}\n\nA integração real de M-Pesa/e-Mola será ligada na próxima etapa.`);
}

function copyIP(){navigator.clipboard?.writeText('XP-World1.aternos.me:30224');alert('IP e porta copiados!')}
