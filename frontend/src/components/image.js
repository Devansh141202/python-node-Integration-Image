import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const SingleFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please first select a file");
      return;
    }

    const formData = new FormData();
    formData.append("files", selectedFile);
    console.log(selectedFile);

    try {
      // Replace this URL with your server-side endpoint for handling file uploads
      const response = await fetch("http://localhost:4000/api/photos", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("File upload is  successfully");
      } else {
        alert("Failed to upload the file due to errors");
      }
    } catch (error) {
      console.error("Error while uploading the file:", error);
      alert("Error occurred while uploading the file");
    }
  };
  const { register, handleSubmit, reset } = useForm();
  const getImage = async (data) => {
    const response = await axios.get(`http://localhost:4000/get-image/${data.id}`, {
    });
    setImage(response.data.image.image)
    console.log(Image)
   console.log(response)
  };

  return (
    <div className="p-3">
      <h2>Single File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div class="d-flex justify-content-center pt-5 mt-3">
        <div class="input-group w-auto">
          <form
            onSubmit={handleSubmit((data) => {
              setUrl(JSON.stringify(data));
              getImage(data);
              reset();
            })}
          >
            <input
              type="text"
              className="mb-5"
              placeholder="Search Image"
              aria-label="Example input"
              aria-describedby="button-addon1"
              {...register("id", { required: true })}
            />
            <button
            //   class="btn"
              type="submit"
              id="button-addon1"
              data-mdb-ripple-color="dark"
            >
              Find Image
            </button>
          </form>
        </div>
      </div>
      <div className="d-flex justify-content-center">
       {image ? <img src={'data:image/png;base64,' + image} alt="image" style={{height: '300px',width: '600px' }}/>: <p style={{color: 'red'}}>No image found</p>}
      </div>
    </div>
  );
};
export default SingleFileUpload;
