import { useState } from "react";
import { useNotesContext } from "../contextapi/notescontext";
import Modal from "@mui/material/Modal";
const NoteCard = (props) => {
  const { id, title, description, tag, image, createdAt } = props;
  const { deleteNotes, updateNotes } = useNotesContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 console.log(image)
  const [update, setUpdate] = useState({
    title: title,
    description: description,
    tag: tag,
  });

  const handlechange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateNotes(id, update);
    handleClose();
  };

  const deleteNotesFun = () => {
    deleteNotes(id);
  };
  
  const date = new Date(createdAt);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex px-6 bg-transparent flex-col items-center pb-16">
          {" "}
          <form
            className="mt-6 w-1/2 max-lg:w-full mb-0 space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8 bg-gray-100"
            onSubmit={handleUpdate}
          >
            <div>
              <label htmlFor="title" className="">
                Title<span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={update.title}
                  onChange={handlechange}
                  className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter notes title"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="description" className="">
                Description <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={update.description}
                  onChange={handlechange}
                  rows={3}
                  cols={100}
                  type="description"
                  className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter notes description"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tag" className="">
                Tag
              </label>
              <div className="relative">
                <input
                  id="tag"
                  name="tag"
                  value={update.tag}
                  onChange={handlechange}
                  type="text"
                  className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                  placeholder="Enter notes tag"
                />
              </div>
            </div>

            <fieldset className="w-full space-y-1 dark:text-gray-800">
              <label htmlFor="files" className="block text-sm font-medium">
                Attachments
              </label>
              <div className="flex">
                <input
                  type="file"
                  name="files"
                  id="files"
                  className="px-3 py-6 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"
                />
              </div>
            </fieldset>

            <div className="flex mt-5 justify-between  gap-5">
              <button
                type="submit"
                className="block max-sm:w-32 rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium cursor-pointer text-white"
                onClick={handleClose}
              >
                Discard
              </button>
              <button
                to="/notes"
                type="submit"
                className="block max-sm:w-32 cursor-pointer rounded-lg bg-rose-900 px-5 py-3 text-sm font-medium text-white"
              >
                Update Notes
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="overflow-hidden transition-shadow relative duration-300 bg-white rounded shadow-sm">
        <div className="flex absolute right-0 top-0 bg-white/75 rounded-bl-sm px-4 py-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 cursor-pointer text-rose-500 mx-2"
            data-modal-target="authentication"
            data-modal-toggle="authentication-modal"
            onClick={handleOpen}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 cursor-pointer text-rose-500 mx-2"
            onClick={deleteNotesFun}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
        <img
          src={image}
          className="object-cover w-full h-64"
          alt=""
        />
        <div className="p-5">
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            <span className="text-gray-600">
              {date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}
            </span>
          </p>
          <h1 className="inline-block mb-3 text-md font-bold leading-5 transition-colors duration-200 hover:text-deep-purple-accent-700">
            {title}
          </h1>
          <p className="mb-2 text-gray-700">{description}</p>
          <p className="mb-2 text-gray-700">Tag: {tag}</p>
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
