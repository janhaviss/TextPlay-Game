import { createBrowserRouter } from "react-router-dom";
import Riddle from "./pages/riddle";
import StoryGen from "./pages/StoryGen";
import WordAssoc from "./pages/wordassoc";
import Welcome from "./pages/Welcome";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Welcome /> },
      { path: "storygen", element: <StoryGen /> },
      { path: "riddle", element: <Riddle /> },
      { path: "wordassoc", element: <WordAssoc /> },
    ],
  },
]);

export default router;
