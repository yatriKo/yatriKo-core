import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_WithLayout/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_withLayout/Dashboard/"!</div>
}
