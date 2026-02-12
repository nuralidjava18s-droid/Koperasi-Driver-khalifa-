let editMode = false;

/* =====================
   LOAD SAAT BUKA
===================== */
document.addEventListener("DOMContentLoaded", ()=>{
  loadAnggota();
});

/* =====================
   GENERATE ID AG001
===================== */
function generateAnggotaID(db){
  if(db.anggota.length===0) return "AG001";

  const last = db.anggota[db.anggota.length-1].id;
  const num = parseInt(last.replace("AG",""))+1;

  return "AG"+String(num).padStart(3,"0");
}

/* =====================
   SIMPAN
===================== */

function simpanAnggota(e){
  e.preventDefault();

  const db = getDB();

  const nama   = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const telp   = document.getElementById("telp").value;

  const newID = generateAnggotaID(db);

  db.anggota.push({
    id:newID,
    nama,
    alamat,
    telp
  });

  saveDB(db);

  console.log(db);   // 👈 tambah ini

  resetForm();
  loadAnggota();
}
/* =====================
   LOAD TABLE
===================== */

function loadAnggota(){

  const db = getDB();

  // ===== UNTUK DROPDOWN (simpanan / pinjaman)
  const sel = document.getElementById("anggota");
  if(sel){
    sel.innerHTML='<option value="">-- Pilih Anggota --</option>';
    db.anggota.forEach(a=>{
      sel.innerHTML+=`<option value="${a.id}">${a.nama}</option>`;
    });
  }

  // ===== UNTUK TABLE (halaman anggota)
  const tbl = document.getElementById("listAnggota");
  if(tbl){
    tbl.innerHTML="";
    db.anggota.forEach(a=>{
      tbl.innerHTML+=`
        <tr>
          <td>${a.id}</td>
          <td>${a.nama}</td>
          <td>${a.alamat}</td>
          <td>${a.telp}</td>
          <td>
            <button onclick="editAnggota('${a.id}')">✏️</button>
            <button onclick="hapusAnggota('${a.id}')">🗑</button>
          </td>
        </tr>`;
    });
  }

}
/* =====================
   HAPUS
===================== */
function hapusAnggota(id){
  if(!confirm("Hapus anggota?")) return;

  const db = getDB();
  db.anggota = db.anggota.filter(a=>a.id!==id);

  saveDB(db);
  loadAnggota();
}

/* =====================
   RESET
===================== */
function resetForm(){
  idAnggota.value="";
  nama.value="";
  alamat.value="";
  telp.value="";
  editMode=false;
}