export default defineAppConfig({
  ui: {
    primary: 'lime',
    gray: 'neutral',
  },
  carousel: {
    slots: {
      root: 'relative focus:outline-none',
      viewport: 'overflow-hidden',
      container: 'flex items-start',
      item: 'min-w-0 shrink-0 basis-full',
      controls: '',
      arrows: '',
      prev: 'absolute rounded-full',
      next: 'absolute rounded-full',
      dots: 'absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3',
      dot: [
        'cursor-pointer size-3 bg-accented rounded-full',
        'transition'
      ]
    },
    variants: {
      orientation: {
        vertical: {
          container: 'flex-col -mt-4',
          item: 'pt-4',
          prev: 'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
          next: 'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90'
        },
        horizontal: {
          container: 'flex-row -ms-4',
          item: 'ps-4',
          prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
          next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2'
        }
      },
      active: {
        true: {
          dot: 'bg-inverted'
        }
      }
    }
  },tooltip: {
    slots: {
      content: 'flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto',
      arrow: 'fill-default',
      text: 'truncate',
      kbds: "hidden lg:inline-flex items-center shrink-0 gap-0.5 before:content-['·'] before:me-0.5",
      kbdsSize: 'sm'
    }
  }
}
)