import { useState } from "react"
import { Link } from "react-router-dom"
import { useNotesContext } from "../contextapi/notescontext"

const CreateNote = () => {
  const {addNotes} = useNotesContext()
   const [userNotes, setUserNotes] = useState({title:"", description:"", tag:""})
    const [image, setImage] = useState(null)
   const onChangeNotes = (e)=>{
    setUserNotes({...userNotes, [e.target.name]: e.target.value})
   }

   const submitNotesfun = (e)=>{
    e.preventDefault()
   addNotes(userNotes, image)
   setUserNotes({title:"", description:"", tag:""})
   }

    return (
        <div className='flex px-6 flex-col items-center pb-16 bg-gray-100'>
            <div className="mx-auto pt-12 max-w-xl text-center">
                <h1 className="text-3xl capitalize font-bold dark:text-gray-800 sm:text-5xl">
                    Create note with
                    <strong className="font-bold text-red-700 py-3 sm:block"> - safe and secure </strong>
                </h1>
            </div>
            <form className="mt-6 w-1/2 max-lg:w-full mb-0 space-y-4 rounded-lg p-4 shadow-sm sm:p-6 lg:p-8" onSubmit={submitNotesfun}>

                <div>
                    <label htmlFor="title" className="">Title<span className='text-rose-500'>*</span></label>
                    <div className="relative">
                        <input id='title'
                            name='title'
                            type="text"
                            onChange={onChangeNotes}
                            value={userNotes.title}
                            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes title"
                        />
                    </div>
                </div>

                <div className='mt-5'>
                    <label htmlFor="description" className="">Description <span className='text-rose-500'>*</span></label>
                    <div className="relative">
                        <textarea id='description' name='description' rows={5} cols={100}
                        onChange={onChangeNotes}
                        value={userNotes.description}
                            type="description"
                            className="w-full mt-2 border-2 outline-none rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes description"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="tag" className="">Tag</label>
                    <div className="relative">
                        <input id='tag'
                            name='tag'
                            onChange={onChangeNotes}
                            value={userNotes.tag}
                            type="text"
                            className="w-full border-2 rounded-lg outline-none border-gray-200 mt-2 p-4 pe-12 text-sm shadow-xs"
                            placeholder="Enter notes tag"
                        />
                    </div>
                </div>

                <fieldset className="w-full space-y-1 dark:text-gray-800">
                    <label htmlFor="files" className="block text-sm font-medium">Attachments</label>
                    <div className="flex">
                        <input type="file" name="files" onChange={(e)=>setImage(e.target.files[0])} id="files" className="px-3 py-6 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-100"/>
                    </div>
                </fieldset>

                <div className='flex mt-5 justify-between  gap-5'>
                    <button
                        type="submit"
                        className="block max-sm:w-32 rounded-lg bg-rose-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Add Notes
                    </button>
                    <Link to="/notes"
                        type="submit"
                        className="block max-sm:w-32 rounded-lg bg-rose-900 px-5 py-3 text-sm font-medium text-white"
                    >
                        Your Notes
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default CreateNote