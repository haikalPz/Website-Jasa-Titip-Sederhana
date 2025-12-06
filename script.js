/* ============================================================
   LOGIN STATUS + LOAD PROFILE
============================================================ */
let isLoggedIn = false;
let currentUser = "";

// Cek login saat halaman dibuka
if (localStorage.getItem("loginStatus") === "true") {
    isLoggedIn = true;
    currentUser = localStorage.getItem("loginUser");
}

// Update header setelah load halaman
window.onload = () => {
    if (isLoggedIn) updateHeader();
};


/* ============================================================
   FORM PEMESANAN (Proteksi Login)
============================================================ */
const form = document.getElementById("formPesanan");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const barang = document.getElementById("barang").value.trim();
        const alamat = document.getElementById("alamat").value.trim();

        if (!nama || !barang || !alamat) {
            alert("Semua data harus diisi!");
            return;
        }

        const preview = `
PREVIEW PESANAN

Nama Pemesan : ${nama}
Barang Dititip : ${barang}
Alamat Tujuan : ${alamat}

Klik OK untuk mengirim.
        `.trim();

        if (!confirm(preview)) return;

        alert("Pesanan berhasil dikirim! (versi demo)");
        form.reset();
    });
}

function showForm() {
    if (!isLoggedIn) {
        alert("Anda harus login terlebih dahulu!");
        openLogin();
        return;
    }

    const box = document.getElementById("pesan");
    box.style.display = "block";
    setTimeout(() => box.classList.add("show"), 10);
}

function closeForm() {
    const box = document.getElementById("pesan");
    box.classList.remove("show");
    setTimeout(() => box.style.display = "none", 300);
}


/* ============================================================
   LOGIN POPUP
============================================================ */
function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}

// Login user
document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
        alert("Isi username dan password!");
        return;
    }

    // ambil user yang tersimpan
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(u => u.username === user && u.password === pass);

    if (foundUser) {
        alert("Login berhasil!");

        isLoggedIn = true;
        currentUser = foundUser.nama;

        localStorage.setItem("loginStatus", "true");
        localStorage.setItem("loginUser", currentUser);

        closeLogin();
        updateHeader();
    } else {
        alert("Username atau password salah!");
    }
});


/* ============================================================
   REGISTER
============================================================ */
function openRegister() {
    document.getElementById("registerPopup").style.display = "flex";
}

function closeRegister() {
    document.getElementById("registerPopup").style.display = "none";
}

function registerSubmit() {
    const nama = document.getElementById("regNama").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const pass = document.getElementById("regPass").value.trim();

    if (!nama || !email || !pass) {
        alert("Semua data harus diisi!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.username === email)) {
        alert("Email sudah terdaftar!");
        return;
    }

    users.push({
        username: email,
        password: pass,
        nama: nama
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");

    closeRegister();
}


/* ============================================================
   UPDATE HEADER
============================================================ */
function updateHeader() {
    const headerRight = document.querySelector(".header-right");

    headerRight.innerHTML = `
        <span class="user-tag">Hi, ${currentUser}</span>
        <a href="#" class="cart-btn" onclick="openCart()">🛒 Cart</a>
        <a href="#" class="logout-btn" onclick="logout()">Logout</a>
    `;
}

function logout() {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("loginUser");

    isLoggedIn = false;
    currentUser = "";

    location.reload();
}


/* ============================================================
   PROTEKSI HALAMAN PRODUK
============================================================ */
document.getElementById("btnProduk")?.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
        alert("Silakan login terlebih dahulu!");
        openLogin();
        return;
    }

    window.location.href = "dashboard/dashboard1.html";
});


/* ============================================================
   KERANJANG BELANJA
============================================================ */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(namaProduk) {
    if (!isLoggedIn) {
        alert("Silakan login dahulu!");
        openLogin();
        return;
    }

    cart.push(namaProduk);
    saveCart();
    alert(`${namaProduk} ditambahkan ke keranjang.`);
}

function openCart() {
    renderCart();
    document.getElementById("cartPopup").style.display = "flex";
}

function closeCart() {
    document.getElementById("cartPopup").style.display = "none";
}

function renderCart() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";

    if (cart.length === 0) {
        list.innerHTML = "<li>Keranjang kosong.</li>";
        return;
    }

    cart.forEach((item, index) => {
        list.innerHTML += `
            <li>
                ${item}
                <button class="hapus-item" onclick="removeCart(${index})">Hapus</button>
            </li>
        `;
    });
}

function removeCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function checkoutCart() {
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    closeCart();
    showForm();

    document.getElementById("barang").value = cart.join(", ");

    cart = [];
    saveCart();
    renderCart();
}
function kirimPesananWA() {
    const nama = document.getElementById("nama").value.trim();
    const barang = document.getElementById("barang").value.trim();
    const alamat = document.getElementById("alamat").value.trim();

    if (!nama || !barang || !alamat) {
        alert("Semua data harus diisi!");
        return;
    }

    const nomorToko = "6289635854359"; // ← nomor WA kamu

    const pesan = encodeURIComponent(
`Halo, saya ingin titip barang:

Nama : ${nama}
Barang : ${barang}
Alamat : ${alamat}

Terima kasih.`
    );

    window.open(`https://wa.me/${nomorToko}?text=${pesan}`, "_blank");
}
