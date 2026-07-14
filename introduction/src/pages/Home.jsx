import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebaseconfig";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [userUid, setUserUid] = useState("");
  const [todo, setTodo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        getData(user.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch Todos
  const getData = async (uid) => {
    try {
      const q = query(
        collection(db, "todos"),
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const todos = [];

      querySnapshot.forEach((doc) => {
        todos.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      setTodo(todos);
    } catch (error) {
      console.log(error);
    }
  };

  // Add Todo
  const addTodo = async (event) => {
    event.preventDefault();

    if (!title.trim() || !desc.trim()) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const newTodo = {
        uid: userUid,
        title,
        description: desc,
        createdAt: Timestamp.fromDate(new Date()),
      };

      await addDoc(collection(db, "todos"), newTodo);

      setTitle("");
      setDesc("");

      getData(userUid);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Todo
  const deleteTodo = async (docId) => {
    try {
      await deleteDoc(doc(db, "todos", docId));

      getData(userUid);

      console.log("Item Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Todo
  const editTodo = async (docId) => {
    const updatedTitle = prompt("Enter updated title");

    if (!updatedTitle) return;

    try {
      await updateDoc(doc(db, "todos", docId), {
        title: updatedTitle,
      });

      getData(userUid);

      console.log("Title Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Home</h1>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Enter Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

        <br />
        <br />

        <button type="submit">Add Todo</button>
      </form>

      <div className="parent">
        {todo.length > 0 ? (
          todo.map((item) => (
            <div
              key={item.id}
              className="children"
              style={{
                margin: "10px 0",
                padding: "10px",
                border: "2px solid black",
                borderRadius: "12px",
              }}
            >
              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <button onClick={() => deleteTodo(item.id)}>
                Delete
              </button>

              <button onClick={() => editTodo(item.id)}>
                Edit
              </button>
            </div>
          ))
        ) : (
          <h3>No Todos Found</h3>
        )}
      </div>
    </>
  );
};

export default Home;













// import { useEffect, useState } from "react";
// import { auth, db } from "../config/firebase/firebaseconfig";
// import { useNavigate } from "react-router";
// import { onAuthStateChanged } from "firebase/auth";
// import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
// import './Home.css'
// import home from '../assets/home.png'

// function Home() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [todos, setTodos] = useState([]);
//   const navigate = useNavigate()
//   const [userUid, setUserUid] = useState('')

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         console.log('user uid', uid);
//         setUserUid(uid)
//         getData(uid)
//       } else {
//         navigate('/login')
//       }
//     });

//   }, [])

//   const getData = async (uid) => {
//     const q = query(
//       collection(db, "todos"),
//       where("uid", "==", uid),
//       orderBy('createdAt', 'asc')
//     );

//     const querySnapshot = await getDocs(q);

//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     setTodos(data);
//   };

//   const handleAddTodo = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "todos"), {
//         uid: userUid,
//         title: title,
//         description: description,
//         createdAt: Timestamp.fromDate(new Date()),
//       });
//       console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//     if (!title || !description) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     setTodos([...todos, { title, description }]);
//     setTitle("");
//     setDescription("");
//   };
//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "todos", id));
//     getData(userUid)
    
//   }
//   const handleEdit = async (todo) => {
//     console.log('todos===>', todo?.id);
//   const washingtonRef = doc(db, "todos", todo.id);

//   const updatedTitle = prompt("Enter updated title", todo.title);

//   if (!updatedTitle || updatedTitle.trim() === "") {
//     return;
//   }

//   await updateDoc(washingtonRef, {
//     title: updatedTitle.trim(),
//   });
//   getData(userUid)
// };

//   return (
//     <div className="home-page">

//       {/* ---------------- HERO ---------------- */}

//       <section className="hero">

//         <div className="hero-content">

//           <p className="hero-tag">
//   🚀 Your Smart Productivity Workspace
// </p>

//           <h1>
//   Plan Smarter.
//   <br />
//   Work Faster.
//   <br />
//   Succeed Every Day.
// </h1>

//        <p className="hero-description">
//   Stay focused with a modern workspace designed for students,
//   developers, freelancers, and professionals. Organize projects,
//   manage daily goals, and track every task effortlessly—all securely
//   powered by Firebase Cloud.
// </p>

//           <div className="hero-buttons">
//             <button className="primary-btn"
//               onClick={() =>
//                 document
//                   .getElementById("todo-dashboard")
//                   .scrollIntoView({ behavior: "smooth" })
//               }
//             >
//               Get Started
//             </button>

//             <button className="secondary-btn" onClick={() =>
//               document
//                 .getElementById("todo-dashboard")
//                 .scrollIntoView({ behavior: "smooth" })
//             }>
//               View My Todos
//             </button>
//           </div>

//           <div className="hero-points">
//             <span>✔ Simple & Clean</span>
//             <span>✔ Secure Login</span>
//             <span>✔ Firebase Powered</span>
//           </div>

//         </div>

//        <div className="hero-image">

//   <div className="hero-demo-card">

//    <h3>Today's Productivity</h3>

//     <div className="demo-item">✔ Finish Client Dashboard</div>
// <div className="demo-item">✔ Deploy Firebase Project</div>
// <div className="demo-item">⏳ Review Weekly Goals</div>

//   </div>

// </div>

//       </section>

//       {/* ---------------- WHY ---------------- */}

//       <section className="why-section">

//       <h2>Why Thousands Love Todo One</h2>

//         <div className="why-grid">

//           <div className="why-card">
//             <h3>🎯 Stay Focused</h3>
// <p>
//   Eliminate distractions and keep every important task organized.
// </p>
//           </div>

//           <div className="why-card">
//             <h3>☁ Automatic Sync</h3>
// <p>
//   Your data is securely stored in the cloud and available everywhere.
// </p>
//           </div>

//           <div className="why-card">
//            <h3>⚡ Lightning Fast</h3>
// <p>
//   Enjoy an instant experience powered by modern web technologies.
// </p>
//           </div>

//         </div>

//       </section>

//       {/* ---------------- FEATURES ---------------- */}

//       <section className="features">

//         <h2>Powerful Features Built for Productivity</h2>

//         <div className="feature-grid">

//           <div className="feature-card">
//             <h3>📝 Smart Task Creation</h3>
// <p>Create detailed tasks within seconds.</p>
//           </div>

//           <div className="feature-card">
//             <h3>✏ Instant Editing</h3>
// <p>Update your plans anytime without losing progress.</p>
//           </div>

//           <div className="feature-card">
//             <h3>🗑 One-Click Delete</h3>
// <p>Keep your workspace clean by removing completed tasks.</p>
//           </div>

//           <div className="feature-card">
//             <h3>🔒 Private Workspace</h3>
// <p>Your personal data stays protected using Firebase Authentication.</p>
//           </div>

//           <div className="feature-card">
//           <h3>📱 Responsive Design</h3>
// <p>Beautiful experience across desktop, tablet, and mobile devices.</p>
//           </div>

//           <div className="feature-card">
//             <h3>☁ Secure Cloud Storage</h3>
// <p>Access your todos anytime with Firestore Cloud Database.</p>
//           </div>

//         </div>

//       </section>

//       {/* ---------------- TODO DASHBOARD ---------------- */}

//       <div className="todo-container" id="todo-dashboard">

//         <div className="todo-card">

//           <h2 className="title">
//   Productivity <span>Dashboard</span>
// </h2>

//           <p className="subtitle">
//   Create, organize, update, and complete your daily goals from one beautiful workspace.
// </p>

//           <input
//             type="text"
//             placeholder="Task Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="todo-input"
//           />

//           <textarea
//             rows="4"
//             placeholder="Describe your task..."
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="todo-textarea"
//           />

//           <button
//             onClick={handleAddTodo}
//             className="add-btn"
//           >
//             ➕ Create New Task
//           </button>

//           <div className="todo-list" >

//             {todos.map((todo, index) => (
//               <div key={index} className="todo-item">

//                 <div>
//                   <h3>{todo.title}</h3>
//                   <p>{todo.description}</p>
//                 </div>

//                 <div className="actions">

//                   <button className="edit-btn" onClick={()=> handleEdit(todo)}>
//                     ✏ Update
//                   </button>

//                   <button className="delete-btn"
//                     onClick={()=> handleDelete(todo.id)}>
//                     🗑 Remove
//                   </button>

//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>

//       </div>

//       {/* ---------------- STATS ---------------- */}

//       <section className="stats">

//         <h2><h2>Your Productivity at a Glance</h2></h2>

//         <div className="stats-grid">

//           <div className="stat-card">
//             <h1>{todos.length}</h1>
//             <p>Active Todos</p>
//           </div>

//           <div className="stat-card">
//             <h1>⚡</h1>
//             <p>Lightning Speed</p>
//           </div>

//           <div className="stat-card">
//             <h1>🔒</h1>
//             <p>Protected Account</p>
//           </div>

//           <div className="stat-card">
//             <h1>☁</h1>
//             <p>Cloud Storage</p>
//           </div>

//         </div>

//       </section>

//       {/* ---------------- CTA ---------------- */}

//       <section className="cta">

//         <h2>Start Managing Your Goals Like a Professional</h2>

//         <p>
//   Build better habits, stay organized, and accomplish more every day.
//   Your next achievement starts with a single task.
// </p>

//         <button className="primary-btn" onClick={() =>
//           document
//             .getElementById("todo-dashboard")
//             .scrollIntoView({ behavior: "smooth" })
//         }>
//          🚀 Create Your First Task
//         </button>

//       </section>

//       {/* ---------------- FOOTER ---------------- */}

//       <footer className="footer">

//         <h2>Todo One Pro</h2>

//        <p>
//   Crafted with React, Firebase Authentication, Firestore Database, and modern UI principles.
// </p>

//         <small>
//           © 2026 Todo One Pro • Designed to help you achieve more every single day.
//         </small>

//       </footer>

//     </div>
//   );
// }




// export default Home;