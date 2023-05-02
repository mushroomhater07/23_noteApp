import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import $ from "jquery";
import "./noteid.css"

export default function Noteid({ }) {
  var vairable = "";
  const onEditField = (body) => {
    vairable = body;
    console.log(body);
    localStorage.setItem("noteid", body)
  }

  //     onUpdateNote({
  //       ...activeNote,
  //       [field]: value,
  //       lastModified: Date.now(),
  //     });
  //   };

  //   if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="note-main">
      <div className="note-edit">

        <textarea
          id="body"
          placeholder="Write your note here..."
          onChange={(e) => onEditField(e.target.value)}
        />
      </div>
      <div className="note-preview">
        <ReactMarkdown>
          {{ vairable }}
        </ReactMarkdown>
      </div>

    </div>

  )
}