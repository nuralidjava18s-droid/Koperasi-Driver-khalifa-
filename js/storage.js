/* =====================
   INIT USER LOGIN
===================== */
function initUser(){
  const db = getDB();

  if(!db.user){
    db.user = {
      username: "admin",
      password: "1234"
    };
    saveDB(db);
  }
}

initUser();

/* =====================
   LOGIN
===================== */
function login(username, password){

  const db = getDB();

  if(
    username === db.user.username &&
    password === db.user.password
  ){
    localStorage.setItem("koperasi_login","true");
    return true;
  }

  return false;
}

/* =====================
   LOGOUT
===================== */
function logout(){
  localStorage.removeItem("koperasi_login");
  location.replace("index.html");
}

/* =====================
   CEK LOGIN
===================== */
function cekLogin(){
  if(localStorage.getItem("koperasi_login")!=="true"){
    location.replace("index.html");
  }
}
function getDB(){
 let db=localStorage.getItem("koperasi_db");

 if(!db){
  const initDB={
   anggota:[],
   simpanan:[],
   pinjaman:[],
   angsuran:[],
    kas:[]
  };
  localStorage.setItem("koperasi_db",JSON.stringify(initDB));
  return initDB;
 }

 db=JSON.parse(db);

 db.anggota ??=[];
 db.simpanan ??=[];
 db.pinjaman ??=[];
 db.angsuran ??=[];
  db.kas ??=[];

 return db;
}

function saveDB(db){
  localStorage.setItem("koperasi_db", JSON.stringify(db));
}
