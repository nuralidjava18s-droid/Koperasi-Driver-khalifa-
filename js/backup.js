/* =====================
   BACKUP KE WHATSAPP
===================== */
function backupWA(){
  const db = localStorage.getItem("koperasi_db");

  if(!db){
    alert("Tidak ada data untuk dibackup");
    return;
  }

  const pesan =
`BACKUP DATA KOPERASI
====================
${db}`;

  const waURL = "https://wa.me/?text=" + encodeURIComponent(pesan);
  window.open(waURL, "_blank");
}

/* =====================
   RESTORE DARI FILE JSON
===================== */
function restoreWA(){
  const json = prompt(
`PASTE DATA BACKUP DI SINI
(jangan diubah isinya)`
  );

  if(!json) return;

  try{
    const data = JSON.parse(json);

    if(!data.anggota || !data.kas){
      alert("Format backup tidak valid");
      return;
    }

    localStorage.setItem("koperasi_db", JSON.stringify(data));
    alert("Restore berhasil ✔️\nSilakan reload aplikasi");
  }catch(e){
    alert("Data backup rusak / tidak valid");
  }
}