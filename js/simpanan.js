let editIndex = null;

/* =====================
   LOAD SIMPANAN
===================== */
function loadSimpanan(){
 const db = getDB();
 db.simpanan ??= [];
 db.anggota ??= [];

 const tbody = document.getElementById("listSimpanan");
 tbody.innerHTML = "";

 db.simpanan.forEach((s,i)=>{

  const a = db.anggota.find(x=>x.id==s.anggota_id) || {};

  tbody.innerHTML += `
   <tr>
    <td>${s.tanggal}</td>
    <td>${a.nama||""}</td>
    <td>${s.jenis}</td>
    <td>${rupiah(s.jumlah)}</td>
    <td>
     <button onclick="editSimpanan(${i})">✏</button>
     <button onclick="hapusSimpanan(${i})">🗑</button>
    </td>
   </tr>`;
 });
}

/* =====================
   SIMPAN SIMPANAN
===================== */
function simpanSimpanan(e){
 e.preventDefault();

 const db = getDB();

 db.simpanan ??= [];
 db.kas ??= [];
 db.anggota ??= [];

 const anggota = anggotaEl().value;
 const jenis = jenisEl().value;
 const jumlah = Number(jumlahEl().value);
 const tanggal = tanggalEl().value || new Date().toISOString().slice(0,10);

 if(!anggota || !jumlah){
  alert("Lengkapi data");
  return;
 }

 const id = Date.now();

 if(editIndex===null){

  db.simpanan.push({
   id,
   anggota_id: anggota,
   jenis,
   jumlah,
   tanggal
  });

  const a = db.anggota.find(x=>x.id==anggota) || {};

  db.kas.push({
   id,
   tanggal,
   keterangan:`Simpanan ${jenis} - ${a.nama||""}`,
   jenis:"MASUK",
   jumlah
  });

 }else{

  db.simpanan[editIndex]={
   ...db.simpanan[editIndex],
   anggota_id:anggota,
   jenis,
   jumlah,
   tanggal
  };

  editIndex=null;
 }

 saveDB(db);

 jumlahEl().value="";
 tanggalEl().value="";

 loadSimpanan();

 alert("Simpanan tersimpan");
}

/* =====================
   EDIT
===================== */
function editSimpanan(i){
 const db=getDB();
 const s=db.simpanan[i];

 anggotaEl().value=s.anggota_id;
 jenisEl().value=s.jenis;
 jumlahEl().value=s.jumlah;
 tanggalEl().value=s.tanggal;

 editIndex=i;
}

/* =====================
   HAPUS
===================== */
function hapusSimpanan(i){
 if(!confirm("Hapus data?")) return;

 const db=getDB();

 db.simpanan.splice(i,1);

 saveDB(db);
 loadSimpanan();
}

/* =====================
   HELPER
===================== */
function anggotaEl(){return document.getElementById("anggota")}
function jenisEl(){return document.getElementById("jenis")}
function jumlahEl(){return document.getElementById("jumlah")}
function tanggalEl(){return document.getElementById("tanggal")}