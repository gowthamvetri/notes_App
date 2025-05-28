import moment from 'moment'
import React from 'react'
import { MdOutlinePushPin } from 'react-icons/md'
import { MdCreate,MdDelete } from 'react-icons/md'

function NotesCard(
    {title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote}
) {
  return (
    <div className='border border-gray-200 rounded bg-white p-5 hover:shadow-2xl transition-all ease-in-out hover:cursor-pointer'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium'>{title}</h6>
                <span className='text-xs text-slate-500'>{moment(date).format("Do MMM YYYY")}</span>
            </div>
            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-blue-500':'text-slate-300'}`} onClick={onPinNote}/>
        </div>
        <p className='text-xs text-slate-600 mt-2'>{content?.slice(0,60)}</p>
        <div className='flex items-center justify-between mt-2'>
            <div className="text-slate-500">
                {tags.map((item)=>` #${item} `)}
            </div>
            <div className="flex item-center gap-3">
                <MdCreate onClick={onEdit} className='icon-btn hover:text-green-500 cursor-pointer'/>
                <MdDelete onClick={onDelete} className='icon-btn hover:text-red-500 cursor-pointer'/>
            </div>
        </div>
    </div>
  )
}

export default NotesCard