import { createContext, useContext } from 'react';

// False while a page is hidden behind the splash or the transition curtains,
// so scroll reveals wait until there's something to see.
export const PageReadyContext = createContext(true);

// Starts a curtain transition to a route: go(to, label).
export const TransitionContext = createContext(null);

export const usePageReady = () => useContext(PageReadyContext);
