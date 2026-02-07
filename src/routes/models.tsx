import { Link, Outlet, createFileRoute } from '@tanstack/solid-router'
import { fetchOpenrouterModels } from '~/utils/models'
import type { OpenrouterModelType } from '~/utils/models'
import { useQuery } from '@tanstack/solid-query'


export const Route = createFileRoute('/models')({

  component: ModelsRoute,
})

function ModelsRoute() {
  // const { status, data, error } = useQuery(() => ({ queryKey: ['models'], queryFn: fetchOpenrouterModels }))
  //  if (status === 'pending') {
  //    return <span>Loading...</span>
  //  }

  //  if (status === 'error') {
  //    return <span>Error: {error.message}</span>
  //  }
     return (
       <div>

         <Outlet />
       </div>
     )
   }

//    return (
//       <>
// <h1>YOlo</h1>
//          {JSON.stringify(models)}
//          <Outlet />
//       </>
//    )
// }
