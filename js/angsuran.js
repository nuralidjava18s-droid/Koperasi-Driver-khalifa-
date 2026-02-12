document.addEventListener("DOMContentLoaded", ()=>{
  loadAnggota();
  loadBayar();
});

/* ================= UTIL ================= */
function rupiah(n){
  return "Rp " + Number(n||0).toLocaleString("id-ID");
}

/* ================= LOAD ANGGOTA ================= */
function loadAnggota(){
  const db = getDB();
  anggotaBayar.innerHTML = `<option value="">-- Pilih Anggota --</option>`;

  db.anggota.forEach(a=>{
    anggotaBayar.innerHTML += `
      <option value="${a.id}">${a.nama}</option>`;
  });
}

/* ================= DROPDOWN PINJAMAN ================= */
anggotaBayar.addEventListener("change", ()=>{
  const db = getDB();

  pinjamanBayar.innerHTML = `<option value="">-- Pilih Pinjaman --</option>`;

  db.pinjaman
    .filter(p=>p.anggota_id===anggotaBayar.value && p.sisa>0)
    .forEach(p=>{
      pinjamanBayar.innerHTML += `
        <option value="${p.id}">
          Sisa ${rupiah(p.sisa)}
        </option>`;
    });
});

formAngsuran.addEventListener("submit", e=>{
  e.preventDefault();
  const db = getDB();

  const pin = db.pinjaman.find(p=>p.id===pinjamanBayar.value);
  const bayar = Number(jumlahBayar.value);

  if(!pin) return alert("Pinjaman tidak ditemukan");

  pin.sisa -= bayar;
  if(pin.sisa < 0) pin.sisa = 0;

  db.transaksi.push({
    id: "TR"+Date.now(),
    anggota_id: anggotaBayar.value,
    pinjaman_id: pin.id,
    jumlah: bayar,
    bunga: 0,
    tanggal: new Date().toISOString().slice(0,10)
  });

  saveDB(db);

  e.target.reset();

  pinjamanBayar.innerHTML = `<option value="">-- Pilih Pinjaman --</option>`;

  loadBayar();      // refresh tabel
  loadAnggota();   // refresh dropdown
});

function loadBayar(){
  const db = getDB();
  listBayar.innerHTML = "";

  db.transaksi.forEach(t=>{
    const a = db.anggota.find(x=>x.id===t.anggota_id);

    listBayar.innerHTML += `
      <tr>
        <td>${a?.nama||"-"}</td>
        <td>${rupiah(t.jumlah)}</td>
        <td>${t.tanggal}</td>
      </tr>
    `;
  });
}
