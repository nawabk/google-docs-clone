import { Dispatch } from "react";

type Props = {
  doNotifyPeople: boolean;
  setDoNotifyPeople: Dispatch<boolean>;
  notificationMessage: string;
  setNotificationMessage: Dispatch<string>;
};
const NotifyPeople = ({
  doNotifyPeople,
  setDoNotifyPeople,
  notificationMessage,
  setNotificationMessage,
}: Props) => {
  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center ">
        <input
          type="checkbox"
          id="notify-checkbox"
          checked={doNotifyPeople}
          onChange={(e) => setDoNotifyPeople(e.target.checked)}
        />
        <label htmlFor="notify-checkbox">Notify People</label>
      </div>
      {doNotifyPeople && (
        <div className="mt-2">
          <label htmlFor="notify-message" className="text-sm">
            Message
          </label>
          <textarea
            name="notify-message"
            id="notify-message"
            value={notificationMessage}
            onChange={(e) => setNotificationMessage(e.target.value)}
            className="border border-gray-600 w-full p-2"
          />
        </div>
      )}
    </div>
  );
};

export default NotifyPeople;
