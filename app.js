// XP WORLD — app.js

let currentProduct = { name: "", price: 0 };
let selectedPayment = "M-Pesa";
let discount = 0;

function money(value) {
  return Number(value).toFixed(2).replace(".", ",") + " MT";
}

function buy(name, price) {
  currentProduct = {
    name: name,
    price: Number(price)
  };

  discount = 0;

  const modal = document.getElementById("modal");

  if (!modal) return;

  document.getElementById("modalTitle").textContent = name;
  document.getElementById("modalPrice").textContent = money(price);
  document.getElementById("summarySubtotal").textContent = money(price);
  document.getElementById("summaryDiscount").textContent = "− 0,00 MT";
  document.getElementById("modalTotal").textContent = money(price);

  const coupon = document.getElementById("coupon");
  const message = document.getElementById("couponMessage");

  if (coupon) {
    coupon.value = "";
  }

  if (message) {
    message.textContent = "";
    message.className = "coupon-message";
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");

  if (modal) {
    modal.classList.add("hidden");
  }

  document.body.style.overflow = "";
}

function choosePayment(method) {
  selectedPayment = method;

  document.querySelectorAll(".payment-option").forEach(function(button) {
    button.classList.toggle(
      "active",
      button.dataset.payment === method
    );
  });

  const payment = document.getElementById("payment");

  if (payment) {
    payment.value = method;
  }
}

function applyCoupon() {
  const input = document.getElementById("coupon");
  const message = document.getElementById("couponMessage");

  if (!input || !message) return;

  const code = input.value.trim().toUpperCase();

  const coupons = {
    XPW10: 0.10,
    XPWORLD10: 0.10
  };

  if (code && coupons[code]) {

    discount = currentProduct.price * coupons[code];

    message.textContent =
      "Cupom aplicado! 10% de desconto.";

    message.className =
      "coupon-message success";

  } else {

    discount = 0;

    if (code) {
      message.textContent =
        "Cupom inválido ou expirado.";
    } else {
      message.textContent =
        "Digite um código promocional.";
    }

    message.className =
      "coupon-message error";
  }

  updateTotal();
}

function updateTotal() {

  const subtotal =
    document.getElementById("summarySubtotal");

  const discountEl =
    document.getElementById("summaryDiscount");

  const total =
    document.getElementById("modalTotal");

  if (!subtotal || !discountEl || !total) {
    return;
  }

  subtotal.textContent =
    money(currentProduct.price);

  discountEl.textContent =
    "− " + money(discount);

  total.textContent =
    money(
      Math.max(
        0,
        currentProduct.price - discount
      )
    );
}

function submitOrder() {

  const nick =
    document.getElementById("nick")?.value.trim();

  const phone =
    document.getElementById("phone")?.value.trim();

  if (!nick) {

    alert(
      "Digite o seu Nick do Minecraft."
    );

    document.getElementById("nick")?.focus();

    return;
  }

  if (!phone) {

    alert(
      "Digite o número usado para o pagamento."
    );

    document.getElementById("phone")?.focus();

    return;
  }

  const total =
    Math.max(
      0,
      currentProduct.price - discount
    );

  alert(
    "Pedido preparado!\n\n" +

    "Produto: " +
    currentProduct.name +

    "\nNick: " +
    nick +

    "\nPagamento: " +
    selectedPayment +

    "\nTotal: " +
    money(total) +

    "\n\nA integração automática de pagamento ainda precisa ser ligada."
  );
}

async function copyIP() {

  const address =
    "XP-World1.aternos.me:30224";

  try {

    await navigator.clipboard.writeText(address);

    alert(
      "IP copiado: " + address
    );

  } catch {

    alert(
      "IP: " + address
    );
  }
}

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);

const modal =
  document.getElementById("modal");

if (modal) {

  modal.addEventListener(
    "click",
    function(event) {

      if (event.target.id === "modal") {
        closeModal();
      }

    }
  );
}
