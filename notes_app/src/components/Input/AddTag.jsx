import React, { useState } from "react";
import { DiLaravel } from "react-icons/di";
import { MdAdd, MdClose } from "react-icons/md";

function AddTag({ tags, setTags }) {
  const [inputValue, setinputValue] = useState("");

  const handleChanges = (e) => {
    setinputValue(e.target.value);
  };

  const AddTag = () => {
    if (inputValue.trim !== "") {
      setTags([...tags, inputValue.trim()]);
      setinputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      AddTag();
    }
  };

  const handleRemoveTag = (remtag)=>{
    setTags(tags.filter((tag)=> { return tag!==remtag }))

  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {tags.map((items, index) => (
            <span key={index} className="flex items-center bg-slate-100 text-slate-900 px-2 rounded py-1 gap-2">
              # {items}
              <button onClick={() => {
                handleRemoveTag(items)
              }} className="cursor-pointer">
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 outline-none rounded"
          placeholder="Add Tags"
          onChange={handleChanges}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
        <button
          className="flex items-center justify-center rounded h-9 w-9 bg-white border border-blue-700 hover:bg-blue-700 transition-all ease-in-out "
          onClick={() => {
            AddTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default AddTag;
