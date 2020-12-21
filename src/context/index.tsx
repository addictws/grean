import React from "react";
import { useImmer } from "use-immer";

import { AuxProps, ContextProps } from "../@types";

export const myContext = React.createContext<Partial<ContextProps>>({});

const Provider = ({ children }: AuxProps) => {
  const [menuVisible, setMenuVisible] = useImmer({
    isVisible: false,
  });
  const [modalVisible, setModalVisible] = useImmer({
    isVisible: false,
  });
  const [darkMode, setDarkMode] = useImmer({
    isDark: false,
  });
  const switchMode = () => {
    setDarkMode((draft) => {
      draft.isDark = !darkMode.isDark;
    });
  };

  const showFullscreenMenu = () => null;

  return (
    <myContext.Provider
      value={{
        menuVisible,
        modalVisible,
        showFullscreenMenu,
        darkMode,
        switchMode,
        handleSelect: () => {
          setMenuVisible((draft) => {
            draft.isVisible = false;
          });
        },
        closeMenu: () => {
          setMenuVisible((draft) => {
            draft.isVisible = false;
          });
        },
        showMenu: () => {
          setMenuVisible((draft) => {
            draft.isVisible = true;
          });
        },
        closeModal: () => {
          setModalVisible((draft) => {
            draft.isVisible = false;
          });
        },
        showModal: () => {
          setModalVisible((draft) => {
            draft.isVisible = true;
          });
        },
      }}
    >
      {children}
    </myContext.Provider>
  );
};

export default ({ element }: { element: React.ReactChildren }): JSX.Element => {
  return <Provider>{element}</Provider>;
};
