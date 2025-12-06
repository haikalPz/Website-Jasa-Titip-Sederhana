// FILTER PRODUK
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".product-card");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach(card => {
            const category = card.dataset.category;
            const isPopular = card.classList.contains("popular");

            if (filter === "all") {
                // hanya tampilan 3 produk populer
                card.style.display = isPopular ? "block" : "none";
                return;
            }

            // tampilkan kategori lengkap (popular + extra)
            card.style.display = (category === filter) ? "block" : "none";
        });
    });
});

// MODAL
function openModal(title, desc, img) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    document.getElementById("modalImg").src = img;
    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}
// Saat page dibuka, aktifkan filter "all"
document.querySelector('.filter-btn[data-filter="all"]').click();


// Tutup modal jika klik area luar
window.onclick = function(e) {
    if (e.target.classList.contains("modal")) {
        closeModal();
    }
}
function openModal(title, desc, img) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDesc").innerText = desc;
    document.getElementById("modalImg").src = img;

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}
function setActiveButton(btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function filterItems(category) {
    setActiveButton(event.target);

    document.querySelectorAll('.product-card').forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
function openModal(title, desc, img, price) {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDesc").textContent = desc;
    document.getElementById("modalImg").src = img;

    // Format harga ke Rupiah
    const formattedPrice = Number(price).toLocaleString("id-ID");

    document.getElementById("modalPrice").textContent = "Harga: Rp " + formattedPrice;

    // Nomor WhatsApp (GANTI DI SINI)
    const waNumber = "6289635854359";

    const waMessage = encodeURIComponent(
        `Halo, saya ingin memesan:\n\n` +
        `Produk : ${title}\n` +
        `Harga  : Rp ${formattedPrice}\n\n` +
        `Apakah masih tersedia?`
    );

    // Set tombol WA
    document.getElementById("waButton").onclick = () => {
        window.open(`https://wa.me/${waNumber}?text=${waMessage}`, "_blank");
    };

    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}
