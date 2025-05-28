import React from "react";
import { getInitial } from "../../utils/validateEmail";

function ProfileInfo({userInfo, onLogout}) {
  return (
    userInfo &&(<div className="flex items-center gap-4">
      <div className="w-12 h-12 flex rounded-full items-center justify-center text-slate-600 bg-slate-100 font-medium">{getInitial(userInfo?.name)}</div>
      <div>
        <p className="text-sm font-medium">{userInfo?.name}</p>
        <button className="text-sm text-slate-700 underline cursor-pointer" onClick={onLogout}>LogOut</button>
      </div>
    </div>)
  );
}

export default ProfileInfo;
