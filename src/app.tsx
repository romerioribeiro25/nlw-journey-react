import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CreateTripPage } from "@/pages/create-trip";
import { TripDetailsPage } from "@/pages/trip-details";
import { LinksProvider } from "@/data/contexts/links-provider";
import { ActivitiesProvider } from "@/data/contexts/activities";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: (
      <ActivitiesProvider>
        <LinksProvider>
          <TripDetailsPage />
        </LinksProvider>
      </ActivitiesProvider>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
