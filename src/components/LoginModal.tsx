import { Portal } from "solid-js/web";
import { onMount, Suspense } from "solid-js";
import { initFlowbite } from "flowbite";
import { KeycloakLogin } from "./KeycloakLogin";
export const LoginModal = () => {
   // onMount(() => {
   //    initFlowbite();
   // });

   return (
      <>
         <div class="text-center">
            <button data-modal-target="static-modal" data-modal-toggle="static-modal" class="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">

               Login
            </button>
         </div>
         {/* Modal */}
         <Portal>
            <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    <div class="relative bg-gray-950 border border-red-600 rounded-base shadow-sm p-4 md:p-6">
                        <div class="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                           <div class="max-w-md mx-auto mt-10">
                              <KeycloakLogin />
                           </div>
                     </div>
                  </div>
                </div>
            </div>
      </Portal>
      </>
   );
};
