import { useRef, useState } from "react";
import classNames from "classnames";
import { useOutsideClick } from "rooks";
import { NavLink } from "react-router-dom";
import { pagePaths } from "../../constants/pagePaths";
import { icons } from "../../assets/icons";
import { UserDetails } from "../UserDetails";
import placeholderUser from "../../assets/images/user.png";
import type { UserMenuProps } from "./types";

export const UserMenu = ({
  emailAddress,
  fullName,
  imageSource = placeholderUser,
  onSignOutButtonClick,
}: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleButtonClick = () => {
    setIsOpen((previousIsOpen) => !previousIsOpen);
  };

  useOutsideClick(menuRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={handleToggleButtonClick}
        className={classNames({
          "flex items-center justify-between gap-3 w-full p-2 rounded-lg bg-lighter hover:bg-light dark:bg-darker dark:hover:bg-darkest":
            true,
          "opacity-80": isOpen,
        })}
      >
        <UserDetails
          imageSource={imageSource}
          fullName={fullName}
          emailAddress={emailAddress}
        />

        <div className="block opacity-80">{icons.verticalMenu}</div>
      </button>

      {isOpen && (
        <div className="absolute w-full bottom-full left-0 mb-2 rounded-lg bg-lightest dark:bg-darker border-light border dark:border-darkest">
          <div className="p-4">
            <UserDetails
              imageSource={imageSource}
              fullName={fullName}
              emailAddress={emailAddress}
            />
          </div>

          <div className="h-px bg-light dark:bg-darkest" />

          <div className="p-2">
            <NavLink
              to={pagePaths.profile}
              className={({ isActive }) =>
                classNames({
                  "flex items-center gap-2 text-sm opacity-75 p-2 rounded-md hover:bg-light dark:hover:bg-darkest":
                    true,
                  "bg-light": isActive,
                })
              }
              onClick={() => setIsOpen(false)}
            >
              {icons.userProfile} Profile
            </NavLink>
          </div>

          <div className="p-2 pt-0">
            <NavLink
              to={pagePaths.settings}
              className={({ isActive }) =>
                classNames({
                  "flex items-center gap-2 text-sm opacity-75 p-2 rounded-md hover:bg-light dark:hover:bg-darkest":
                    true,
                  "bg-light": isActive,
                })
              }
              onClick={() => setIsOpen(false)}
            >
              {icons.settings} Settings
            </NavLink>
          </div>

          <div className="h-px bg-light dark:bg-darkest" />

          <div className="p-2">
            <button
              type="button"
              onClick={onSignOutButtonClick}
              className="flex items-center gap-2 text-sm opacity-75 w-full text-left p-2 rounded-md hover:bg-light dark:hover:bg-darkest"
            >
              {icons.signOut} Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
