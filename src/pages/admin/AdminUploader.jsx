import { useEffect, useState } from "react";
import { db } from "../../data/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";

function AdminUploader() {
  const [type, setType] = useState("Shorts");
  const [docIdToLoad, setDocIdToLoad] = useState("");
  const [lastAddedId, setLastAddedId] = useState("");
  const [categories, setCategories] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    videoId: "",
    year: "",
    edition: "",
    description: "",
    category: "",
    additionalInfo: "",
    cover: "",
    featured: true,
    show: true,
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const catSnap = await getDocs(collection(db, "category"));
        const catList = [];
        catSnap.forEach((doc) => {
          const data = doc.data();
          if (data.categoryName) {
            catList.push(data.categoryName);
          }
        });
        setCategories(catList);
      } catch (err) {
        console.error("Error loading categories:", err);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  };

  const loadDataByDocId = async () => {
    if (!docIdToLoad) {
      alert("Please enter a Document ID to load.");
      return;
    }

    try {
      const docRef = doc(db, type.toLowerCase(), docIdToLoad);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("No document found with this ID.");
        return;
      }

      const data = docSnap.data();

      setFormData({
        title: data.title || "",
        subTitle: data.subTitle || "",
        videoId: data.videoId || "",
        year: data.year || "",
        edition: data.edition || "",
        description: data.description || "",
        category: data.category || "",
        additionalInfo: data.additionalInfo || "",
        cover: data.cover || "",
        featured: data.featured ?? true,
        show: data.show ?? true,
      });

      alert(`Loaded document ID: ${docIdToLoad}`);
    } catch (error) {
      console.error("Error loading document:", error);
      alert("Failed to load document.");
    }
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter a title.");
      return;
    }
    try {
      const customId = slugify(formData.title);
      const docRef = doc(db, type.toLowerCase(), customId);
      await setDoc(docRef, {
        ...formData,
        type,
        createdAt: new Date(),
      });
      setLastAddedId(customId);
      alert(`Added successfully with ID: ${customId}`);
      setFormData({
        title: "",
        subTitle: "",
        videoId: "",
        year: "",
        edition: "",
        description: "",
        category: "",
        additionalInfo: "",
        cover: "",
        featured: true,
        show: true,
      });
      setDocIdToLoad("");
    } catch (err) {
      console.error("Error adding:", err);
      alert("Error adding document.");
    }
  };

  const handleUpdate = async () => {
    if (!docIdToLoad) {
      alert("Enter the Document ID to update.");
      return;
    }

    try {
      const docRef = doc(db, type.toLowerCase(), docIdToLoad);
      await setDoc(
        docRef,
        {
          ...formData,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      alert("Updated successfully!");
    } catch (err) {
      console.error("Error updating:", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="add-video-page container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 mt-5">
          <h2 className="interactive-color mb-3">Add / Update {type}</h2>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control mb-3"
            required
          >
            <option value="">Select Video Type</option>
            <option value="Shorts">Short</option>
            <option value="Videos">Video</option>
          </select>

          <input
            className="form-control mb-2"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="subTitle"
            placeholder="SubTitle"
            value={formData.subTitle}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="videoId"
            placeholder="YouTube Video ID"
            value={formData.videoId}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            required
          />

          <select
            className="form-control mb-2"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            required
          >
            <option value="">Select Edition</option>
            <option value="Blast of History">Blast of History</option>
            <option value="Sky Legends">Sky Legends</option>
          </select>

          <select
            className="form-control mb-2"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-2"
            name="cover"
            placeholder="Cover URL"
            value={formData.cover}
            onChange={handleChange}
            required
          />
          <textarea
            className="form-control mb-2"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <textarea
            className="form-control mb-2"
            name="additionalInfo"
            placeholder="Additional Info"
            value={formData.additionalInfo}
            onChange={handleChange}
            required
          />

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            <label className="form-check-label interactive-color">
              Featured
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="show"
              checked={formData.show}
              onChange={handleChange}
            />
            <label className="form-check-label interactive-color">Show</label>
          </div>

          <button className="btn mt-3" onClick={handleSubmit}>
            Add {type}
          </button>

          <hr />

          <input
            className="form-control my-3 w-50"
            placeholder="Document ID to Load / Update"
            value={docIdToLoad}
            onChange={(e) => setDocIdToLoad(e.target.value)}
          />
          <button className="btn mb-3" onClick={loadDataByDocId}>
            Load Data by Doc ID
          </button>
          <button
            className="btn mb-5"
            onClick={() => setShowConfirmModal(true)}
          >
            Update {type}
          </button>

          {lastAddedId && (
            <p className="mt-3">
              Last added document ID: <strong>{lastAddedId}</strong>
            </p>
          )}
        </div>
      </div>

      {/* Modal */}
      {showConfirmModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Update</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to update this document?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowConfirmModal(false);
                    handleUpdate();
                  }}
                >
                  Yes, Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default AdminUploader;