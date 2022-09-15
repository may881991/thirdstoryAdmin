import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { doc, getFirestore, query, getDocs, collection, where, addDoc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDilgOKBP1iFC1y3rmz1K7kOQbzv_YrgE0",
    authDomain: "thirdstoryproject.firebaseapp.com",
    projectId: "thirdstoryproject",
    storageBucket: "thirdstoryproject.appspot.com",
    messagingSenderId: "791090450419",
    appId: "1:791090450419:web:8f8cc5a1279b69f9954c86",
    measurementId: "G-P14C60LKZL"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

const addBookData = async (booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, coverUrl, pdfUrl, lang, createdDate ) =>{
  try{
    await addDoc(collection(db, "books"), {
      title: booktTitle,
      titleEng: bookEngTitle,
      author: author,
      authorEng: authorEng,
      illustrator: illust,
      illustratorEng: illustEng,
      price: price,
      bookCover: coverUrl,
      bookUrl: pdfUrl,
      language: lang,
      ISBN : isbn,
      date : createdDate
    }).then(() => {
      console.log("Successfull created bookInfo")
      return "Successfull created bookInfo";
    }).catch((error) => {
      console.log(error)
      return error;
    });
  }catch(err){
    console.error(err.message)
  }
}

const updateBookInfo = async (booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, lang, createdDate ) => {
  console.log(booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, lang, createdDate)
  try{
    const userdb = query(collection(db, "books"), where("title", "==", booktTitle));
    const getData =  await getDocs(userdb);
    console.log(getData)
    getData.forEach((ele) => { 
      const bookDoc = doc(db, "books", ele.id);
      updateDoc(bookDoc, { 
        title: booktTitle,
        titleEng: bookEngTitle,
        author: author,
        authorEng: authorEng,
        illustrator: illust,
        illustratorEng: illustEng,
        price: price, 
        language: lang,
        ISBN : isbn,
        date : createdDate
      }).then(() => {
        console.log("updated bookInfo")
      }).catch((error) => {
        console.log(error)
      });
    }); 
  }catch(err){
    console.error(err.message)
  }
}

const getBookData = async ()=>{
  try{
    const bookDb = collection(db, "books");
    const getData =  await getDocs(bookDb);
    return getData;
  }catch(err){
    console.error(err.message)
  }
}

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getBookData,
  addBookData,
  updateBookInfo
};