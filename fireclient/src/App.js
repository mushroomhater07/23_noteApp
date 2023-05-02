import { initializeApp } from 'firebase/app';
import "firebase/storage";
import { useEffect,useState, React } from "react";

// Create a function to read the Firebase directory.
const readFirebaseDirectory = async (directory) => {
  // Get a reference to the Firebase storage bucket.
  const storage = firebase.storage();

  // Get a list of all the files in the directory.
  const files = await storage.ref(directory).listAll();

  // Return the list of files.
  return files;
};

// Call the function in your React component.
const App = () => {
  const [files, setFiles] = useState([]);

  // Read the Firebase directory.
  const readDirectory = async () => {
    const files = await readFirebaseDirectory("/");
    setFiles(files);
  };

  // Call the readDirectory function when the component mounts.
  useEffect(() => {
    readDirectory();
  }, []);

  // Render the list of files.
  return (
    <ul>
      {files.map((file) => (
        <li key={file.name}>{file.name}</li>
      ))}
    </ul>
  );
};

export default App;