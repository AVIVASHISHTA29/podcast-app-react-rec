import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import { toast } from "react-toastify";
import Button from "../common/Button";
import FileInput from "../common/Input/FileInput";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function CreatePodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      // 1. Upload files -> get downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);

        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);

        const displayImageUrl = await getDownloadURL(displayImageRef);
        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("Podcast Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }

      // 2. create a new doc iin a new collection called podcasts
      // 3. save this new podcast episodes states in our podcasts
    } else {
      toast.error("Please Enter All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };

  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />

      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />

      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
}

export default CreatePodcastForm;
