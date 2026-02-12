function loadDashboard(){

 

 db.kas.forEach(k=>{
   const j = Number(k.jumlah || 0);

   if(k.jenis==="MASUK"){
     masuk += j;
   }

   if(k.jenis==="KELUAR"){
     keluar += j;
   }
 });

 document.getElementById("kasMasukDashboard").innerText = rupiah(masuk);
 document.getElementById("kasKeluarDashboard").innerText = rupiah(keluar);
 document.getElementById("saldoKasDashboard").innerText = rupiah(masuk - keluar);
}

/* FORMAT RUPIAH */
function rupiah(n){
 return "Rp " + Number(n||0).toLocaleString("id-ID");
}