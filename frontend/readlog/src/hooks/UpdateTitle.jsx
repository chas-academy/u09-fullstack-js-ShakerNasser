import { useEffect } from 'react';

// Custom hook to update the document title dynamically
function useUpdateTitle(title) {
  useEffect(() => {
    document.title = `ReadLog - ${title}`;
  }, [title]);
}

export default useUpdateTitle;
