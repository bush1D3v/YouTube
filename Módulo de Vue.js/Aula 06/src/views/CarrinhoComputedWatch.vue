<script setup>
import { computed, reactive, ref, watch } from "vue";

/**
 * OBJETIVO DA AULA:
 * - computed: valores DERIVADOS do estado (total, contagem, lista filtrada)
 * - watch: efeitos colaterais quando algo muda (alerta, persistência, etc.)
 */

// ======= "Banco" de produtos (mock) =======
const products = reactive([
  { id: 1, name: "Teclado Mecânico", price: 189.9 },
  { id: 2, name: "Mouse Gamer", price: 99.9 },
  { id: 3, name: "Headset", price: 149.9 },
  { id: 4, name: "Mousepad XL", price: 59.9 },
  { id: 5, name: "Webcam", price: 129.9 },
]);

// ======= Estado de UI =======
const search = ref("");

// ======= Carrinho (estado principal) =======
/**
 * Estrutura:
 * cart = [{ productId, name, price, qty }]
 */
const cart = ref(loadCartFromStorage());

// ======= computed: lista filtrada =======
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.name.toLowerCase().includes(q));
});

// ======= computed: total e contagem =======
const cartCount = computed(() =>
  cart.value.reduce((acc, item) => acc + item.qty, 0)
);

const cartTotal = computed(() =>
  cart.value.reduce((acc, item) => acc + item.price * item.qty, 0)
);

// ======= watch: alerta reativo (efeito colateral) =======
/**
 * Regra:
 * - Se total >= 300 -> "Frete grátis"
 * - Se total >= 500 -> "Cupom VIP"
 * - Senão -> sem alerta
 */
const alertMessage = ref("");

watch(
  cartTotal,
  (newTotal) => {
    if (newTotal >= 500) {
      alertMessage.value = "🔥 Você bateu R$ 500+! Libera um cupom VIP!";
      return;
    }
    if (newTotal >= 300) {
      alertMessage.value = "🚚 Frete grátis liberado: total acima de R$ 300!";
      return;
    }
    alertMessage.value = "";
  },
  { immediate: true }
);

// ======= watch: persistência (efeito colateral clássico) =======
watch(
  cart,
  (newCart) => {
    localStorage.setItem("aula06_cart", JSON.stringify(newCart));
  },
  { deep: true }
);

// ======= Ações =======
function addToCart(product) {
  const found = cart.value.find((i) => i.productId === product.id);
  if (found) {
    found.qty += 1;
    return;
  }

  cart.value.push({
    productId: product.id,
    name: product.name,
    price: product.price,
    qty: 1,
  });
}

function inc(productId) {
  const found = cart.value.find((i) => i.productId === productId);
  if (found) found.qty += 1;
}

function dec(productId) {
  const found = cart.value.find((i) => i.productId === productId);
  if (!found) return;

  found.qty -= 1;
  if (found.qty <= 0) {
    cart.value = cart.value.filter((i) => i.productId !== productId);
  }
}

function clearCart() {
  cart.value = [];
}

// ======= Helpers =======
function formatBRL(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem("aula06_cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
</script>

<template>
  <div class="grid">
    <!-- COLUNA 1: Produtos + busca -->
    <section class="card">
      <h2 style="margin: 0 0 10px;">Produtos</h2>

      <div class="row" style="margin-bottom: 10px;">
        <input
          v-model="search"
          placeholder="Buscar produto (ex: mouse, teclado...)"
          aria-label="Buscar produto"
        />
      </div>

      <p class="muted small" style="margin: 0 0 12px;">
        Lista filtrada por <b>computed</b> (depende de <code>search</code>)
      </p>

      <div class="list">
        <div v-for="p in filteredProducts" :key="p.id" class="item">
          <div>
            <div><b>{{ p.name }}</b></div>
            <div class="muted small price">{{ formatBRL(p.price) }}</div>
          </div>

          <button class="secondary" @click="addToCart(p)">
            Adicionar
          </button>
        </div>

        <div v-if="filteredProducts.length === 0" class="muted small">
          Nenhum produto encontrado.
        </div>
      </div>

      <footer>
        ✅ <b>computed</b>: <code>filteredProducts</code>
      </footer>
    </section>

    <!-- COLUNA 2: Carrinho -->
    <aside class="card">
      <div class="row" style="justify-content: space-between;">
        <h2 style="margin: 0;">Carrinho</h2>

        <button class="secondary" :disabled="cart.length === 0" @click="clearCart">
          Limpar
        </button>
      </div>

      <p class="muted small" style="margin: 8px 0 10px;">
        Total e contagem por <b>computed</b> + alerta por <b>watch</b>
      </p>

      <div v-if="alertMessage" class="alert" style="margin-bottom: 12px;">
        {{ alertMessage }}
      </div>

      <div v-if="cart.length === 0" class="muted">
        Seu carrinho está vazio.
      </div>

      <div v-else class="list">
        <div v-for="item in cart" :key="item.productId" class="item">
          <div style="min-width: 0;">
            <div style="display:flex; gap: 10px; align-items: baseline; flex-wrap: wrap;">
              <b>{{ item.name }}</b>
              <span class="muted small price">{{ formatBRL(item.price) }}</span>
            </div>

            <div class="qty" style="margin-top: 8px;">
              <button class="secondary" @click="dec(item.productId)">-</button>
              <span class="price"><b>{{ item.qty }}</b></span>
              <button class="secondary" @click="inc(item.productId)">+</button>
            </div>
          </div>

          <div class="price" style="text-align:right;">
            <div class="muted small">Subtotal</div>
            <b>{{ formatBRL(item.price * item.qty) }}</b>
          </div>
        </div>
      </div>

      <hr />

      <div class="row" style="justify-content: space-between;">
        <span class="muted">Itens</span>
        <b class="price">{{ cartCount }}</b>
      </div>

      <div class="row" style="justify-content: space-between; margin-top: 8px;">
        <span class="muted">Total</span>
        <b class="price">{{ formatBRL(cartTotal) }}</b>
      </div>

      <footer>
        ✅ <b>watch</b>: observa <code>cartTotal</code> → <code>alertMessage</code><br />
        ✅ <b>watch</b> deep: salva <code>cart</code> no localStorage
      </footer>
    </aside>
  </div>
</template>
