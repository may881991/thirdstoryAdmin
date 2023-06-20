import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { doc, getFirestore, query, getDocs, collection, where, addDoc, setDoc , updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

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
  localStorage.removeItem("user");
  setTimeout(() => window.location.reload("/"), 2000);
};

const addBookData = async (booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, coverUrl, pdfUrl, lang, createdDate ) =>{
  const generatebookUuid = uuidv4();
  const getbookUuid = generatebookUuid.replaceAll('-', '');
  console.log("getUuid " + getbookUuid)
  try{
    await addDoc(collection(db, "books"), {
      id: getbookUuid,
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

const updateBookInfo = async (bookId, booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, lang, createdDate ) => {
  console.log(bookId, booktTitle, bookEngTitle, author, authorEng, illust ,illustEng , price, isbn, lang, createdDate)
  try{
    const bookDb = query(collection(db, "books"), where("id", "==", bookId));
    const getData =  await getDocs(bookDb);
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
        console.log("updated bookInfo"); 
        window.location.reload();
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

const deleteBook = async (bookId) => {
  try{ 
    const bookCollection = query(collection(db, "books"), where("id", "==", bookId));
    const getData =  await getDocs(bookCollection);
    console.log(getData)
    getData.forEach((ele) => { 
      console.log(ele.id)
      deleteDoc(doc(db, "books", ele.id)).then(() => {
        window.location.reload();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
  }); 
  }catch(err){
    console.error(err.message)
  }
}

const getActivitiesData = async ()=>{
  try{
    const activityDb = collection(db, "activities");
    const getData =  await getDocs(activityDb);
    return getData;
  }catch(err){
    console.error(err.message)
  }
}

const createActivity = async (title, dec, imgUrl, date) => { 
  const generateUuid = uuidv4();
  const getUuid = generateUuid.replaceAll('-', '');
  console.log("getUuid " + getUuid)
  try {
    await addDoc(collection(db, "activities"), {
      id: getUuid,
      title: title,
      description : dec,
      image: imgUrl,
      date : date
    }).then(() => {
      return "Successfull created activitiy.";
    }).catch((error) => {
      console.log(error)
      return error;
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updateActivity = async ( actId,title, dec, date) => {
  try{
    const activitydb = query(collection(db, "activities"), where("id", "==", actId));
    const getData =  await getDocs(activitydb);
    getData.forEach((ele) => { 
      const actDoc = doc(db, "activities", ele.id);
      updateDoc(actDoc, { 
        title: title,
        description : dec,
        date : date
      }).then(() => {
        console.log("updated activity Info");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
        return error;
      });
    }); 
  }catch(err){
    console.error(err.message)
  }
}

const createStory = async (title, link, date) => { 
  const generateUuid = uuidv4();
  const getstoryUuid = generateUuid.replaceAll('-', '');
  console.log("getUuid " + getstoryUuid)
  try {
    const storyData = {
      id: getstoryUuid,
      title: title,
      url : link,
      date : date
    }
    await setDoc(doc(db, "stories", getstoryUuid), storyData).then(() => {
      return "Successfull created story.";
    }).catch((error) => {
      console.log(error)
      return error;
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getStoriesData = async ()=>{
  try{
    const storiesDb = collection(db, "stories");
    const getStoriesData =  await getDocs(storiesDb);
    return getStoriesData;
  }catch(err){
    console.error(err.message)
  }
}

const updateStory = async (storyId ,title, url, date) => {
  try{
    const storydb = query(collection(db, "stories"), where("id", "==", storyId ));
    const getData =  await getDocs(storydb);
    getData.forEach((ele) => { 
      const actDoc = doc(db, "stories", ele.id);
      updateDoc(actDoc, { 
        title: title,
        description : url,
        date : date
      }).then(() => {
        console.log("updated activity Info");
        window.location.reload();
      }).catch((error) => {
        console.log(error)
        return error;
      });
    }); 
  }catch(err){
    console.error(err.message)
  }
}

const deleteStory = async (storyId) => {
  await deleteDoc(doc(db, "stories", storyId)).then(() => {
    return "Story successfully deleted!";
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
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
  updateBookInfo,
  deleteBook,
  createActivity,
  getActivitiesData,
  updateActivity,
  createStory,
  getStoriesData,
  updateStory,
  deleteStory
};