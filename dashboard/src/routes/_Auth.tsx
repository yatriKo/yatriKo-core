import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_Auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_Auth"!</div>;
}
