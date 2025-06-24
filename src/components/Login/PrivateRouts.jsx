import { useEffect, useState } from "react";
import { auth, db } from "../../data/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          const admin = userSnap.exists() && userSnap.data().role === "admin";
          setIsAdmin(admin);

          if (!admin) {
            toast.error("You don’t have permission to access this page");
          }
        } catch (error) {
          setIsAdmin(false);
          console.error("Error fetching user role:", error);
          toast.error("Error checking permissions");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return children;
}

export default PrivateRoute;
