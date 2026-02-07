import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/newsfeed')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/newsfeed"!</div>
}
