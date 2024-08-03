import { Dispatch } from "react";
import { DocPermission } from "../../types/document";

type Props = {
  permission: DocPermission;
  setPermission: Dispatch<DocPermission>;
};
const PermissionDropdown = ({ permission, setPermission }: Props) => {
  return (
    <select
      id="permission"
      className="border border-gray-600 rounded-lg px-2"
      value={permission}
      onChange={(e) => setPermission(e.target.value as DocPermission)}
    >
      <option value={DocPermission.Editor}>Editor</option>
      <option value={DocPermission.Viewer}>Viewer</option>
    </select>
  );
};

export default PermissionDropdown;
