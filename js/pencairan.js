function rupiah(n){
 return "Rp "+Number(n||0).toLocaleString("id-ID");
}

/* =====================
   LOAD ANGGOTA
===================== */
function loadAnggotaPencairan(){
 const db = getDB();
 const sel = document.getElementById("anggota");

 sel.innerHTML = "<option value=''>-- Pilih Anggota --</option>";

 db.anggota.forEach(a=>{
  sel.innerHTML += `<option value="${a.id}">${a.nama}</option>`;
 });
}

/* =====================
   HITUNG SALDO SUKARELA
===================== */
function hitungSaldo(){
 const db = getDB();
 const id = document.getElementById("anggota").value;

 let saldo = 0;

 db.simpanan.forEach(s=>{
  if(s.anggota_id==id && s.jenis==="Sukarela"){
   saldo += Number(s.jumlah||0);
  }
 });

 db.kas.forEach(k=>{
  if(k.jenis==="KELUAR" && k.keterangan.includes("Cair Sukarela") && k.anggota_id==id){
   saldo -= Number(k.jumlah||0);
  }
 });

 document.getElementById("saldo").innerText = rupiah(saldo);
 return saldo;
}

/* =====================
   CAIRKAN
===================== */
function cairkan(e){
 e.preventDefault();

 const db = getDB();
 const anggota = document.getElementById("anggota").value;
 const jumlah = Number(document.getElementById("jumlah").value);
 const saldo = hitungSaldo();

 if(!anggota || !jumlah){
  alert("Lengkapi data");
  return;
 }

 if(jumlah > saldo){
  alert("Saldo sukarela tidak mencukupi");
  return;
 }

 const a = db.anggota.find(x=>x.id==anggota) || {};

 db.kas.push({
  id: Date.now(),
  tanggal: new Date().toISOString().slice(0,10),
  anggota_id: anggota,
  keterangan: `Cair Sukarela - ${a.nama}`,
  jenis: "KELUAR",
  jumlah
 });

 saveDB(db);

 document.getElementById("jumlah").value="";
 hitungSaldo();

 alert("Pencairan berhasil");
}